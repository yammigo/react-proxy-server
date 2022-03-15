package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
)

type User struct {
	UserName  string `json:"userName"`
	Passworld string `json:"passworld"`
}

type ProxyData struct {
	Host     string                   `json:"host"`
	Dir      string                   `json:"dir"`
	Headers  string                   `json:"headers"`
	Params   []map[string]interface{} `json:"params"`
	HostList []map[string]interface{} `json:"hostList"`
}

type UserBody struct {
	Usera string `params:"usera"`
}

func GetData(Struct interface{}, path string) {
	/**读取数据方法**/
	str := ""
	file, error := os.Open(path)
	if error != nil {
		fmt.Println(error)
		return
	}
	defer file.Close()
	b1 := bufio.NewReader(file)
	p := make([]byte, 1024)
	for {
		s, err := b1.Read(p)
		if err == io.EOF {
			break
		}
		str += string(p[:s])
	}
	str = strings.Replace(str, "\n", "", -1)
	json.Unmarshal([]byte(str), Struct)
}

func WriteData(Struct interface{}, path string) {
	jsonData, _ := json.Marshal(Struct)
	str := string(jsonData)
	fmt.Println(str)
	file, error := os.OpenFile(path, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, os.ModePerm)
	if error != nil {
		fmt.Println(error)
		return
	}
	defer file.Close()
	w := bufio.NewWriter(file)
	w.WriteString(strings.Replace(str, "\n", "", -1))
	w.Flush()
}

func ResultData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	proxyData := &ProxyData{}
	GetData(proxyData, "./db/db.json")
	fmt.Println(proxyData, "执行")
	jsonData, _ := json.Marshal(proxyData)
	io.WriteString(w, string(jsonData))
}

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-Type", "application/json")
	user := &User{}
	GetData(user, "./db/user.json")
	var params map[string]interface{}
	decode := json.NewDecoder(r.Body)
	decode.Decode(&params)
	if user.UserName == params["userName"] && params["passworld"] != nil && user.Passworld == params["passworld"] {
		io.WriteString(w, `{"result":true,"msg":"登录成功"}`)
	} else {
		io.WriteString(w, `{"result":false,"msg":"账号或密码不对"}`)
	}
}

//获取http requerst 参数
func GetFormData(r *http.Request) (string, interface{}) {
	contentType := r.Header["Content-Type"]
	var bodyMap map[string]interface{}
	if strings.Contains(contentType[0], "multipart/form-data") {
		r.ParseMultipartForm(1024)
		fmt.Println(r.Form)
		return contentType[0], r.Form
	} else {
		if strings.Contains(contentType[0], "application/json") {
			body, _ := ioutil.ReadAll(r.Body)
			json.Unmarshal(body, &bodyMap)
			return contentType[0], bodyMap
		} else {
			r.ParseForm()
			return contentType[0], r.Form
		}
	}

}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/proxyData", ResultData)
	mux.HandleFunc("/data", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		r.ParseForm()
		req, _ := ioutil.ReadAll(r.Body)
		writeData := &ProxyData{}
		GetData(writeData, "./db/db.json")
		error := json.Unmarshal(req, writeData)
		if error != nil {
			fmt.Println(error)
			io.WriteString(w, `{"result":"false"}`)
			return
		}
		WriteData(writeData, "./db/db.json")
		io.WriteString(w, `{"result":"ok"}`)
	})
	mux.HandleFunc("/login", Login)
	mux.Handle("/static/", http.StripPrefix("/static", http.FileServer(http.Dir("./static/"))))
	//实现请求转发
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		str := ""
		// fmt.Println("访问代理服务")

		// url, err := url.Parse("https://www.baidu.com")
		// if err != nil {
		// 	log.Println(err)
		// 	return
		// }
		// proxy := httputil.NewSingleHostReverseProxy(url)
		// proxy.ServeHTTP(w, r)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		client := &http.Client{}
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			io.WriteString(w, "error")
			return
		}
		r.ParseForm()
		fmt.Println(string(body), r.URL.Path, r.Form)

		req, error := http.NewRequest(r.Method, "http://www.baidu.com", strings.NewReader(string(body)))
		if error != nil {
			fmt.Println(error)
		}
		resp, error := client.Do(req)
		if error != nil {
			fmt.Println(error)
		}
		defer resp.Body.Close()
		b := bufio.NewReader(resp.Body)
		p := make([]byte, 1024)
		for {
			i, err := b.Read(p)
			if err == io.EOF {
				break
			}
			str += string(p[:i])
		}
		io.WriteString(w, str)
	})

	/**服务配置**/
	server := &http.Server{
		Addr:    ":8081",
		Handler: mux,
	}
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

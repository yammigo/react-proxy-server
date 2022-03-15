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
<<<<<<< HEAD
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
=======
	/**写入数据到文件中**/

>>>>>>> f04ffa2ee332320063a639cadc41a7cc2a2ad774
}

func resultData(w http.ResponseWriter, r *http.Request) {
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

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/proxyData", resultData)
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
	/**服务配置**/
	server := &http.Server{
		Addr:    ":8081",
		Handler: mux,
	}
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

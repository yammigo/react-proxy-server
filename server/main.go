package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
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

func CreateProxy(targetHost string) *httputil.ReverseProxy {
	url, err := url.Parse(targetHost)
	if err != nil {
		fmt.Println(err)
	}
	proxy := httputil.NewSingleHostReverseProxy(url)

	return proxy
}

func singleJoiningSlash(a, b string) string {
	aslash := strings.HasSuffix(a, "/")
	bslash := strings.HasPrefix(b, "/")
	switch {
	case aslash && bslash:
		return a + b[1:]
	case !aslash && !bslash:
		return a + "/" + b
	}
	return a + b
}

func joinURLPath(a, b *url.URL) (path, rawpath string) {
	if a.RawPath == "" && b.RawPath == "" {
		return singleJoiningSlash(a.Path, b.Path), ""
	}
	apath := a.EscapedPath()
	bpath := b.EscapedPath()

	aslash := strings.HasSuffix(apath, "/")
	bslash := strings.HasPrefix(bpath, "/")

	switch {
	case aslash && bslash:
		return a.Path + b.Path[1:], apath + bpath[1:]
	case !aslash && !bslash:
		return a.Path + "/" + b.Path, apath + "/" + bpath
	}
	return a.Path + b.Path, apath + bpath
}

func Proxy(w http.ResponseWriter, r *http.Request) {
	proxy_addr, err := url.Parse("http://127.0.0.1:8082")
	if err != nil {
		return
	}
	proxy := httputil.NewSingleHostReverseProxy(proxy_addr)
	proxy.Director = func(request *http.Request) {
		targetQuery := proxy_addr.RawQuery
		request.URL.Scheme = proxy_addr.Scheme
		request.URL.Host = proxy_addr.Host
		request.Host = proxy_addr.Host // todo 这个是关键
		request.URL.Path, request.URL.RawPath = joinURLPath(proxy_addr, request.URL)
		if targetQuery == "" || request.URL.RawQuery == "" {
			request.URL.RawQuery = targetQuery + request.URL.RawQuery
		} else {
			request.URL.RawQuery = targetQuery + "&" + request.URL.RawQuery
		}
		if _, ok := request.Header["User-Agent"]; !ok {
			request.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36")
		}
		log.Println("request.URL.Path：", request.URL.Path, "request.URL.RawQuery：", request.URL.RawQuery)
	}
	proxy.ServeHTTP(w, r)
	// io.WriteString(w, "asdasd")

}

func main() {
	proxy := CreateProxy("http://www.baidu.com:80")
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
	mux.Handle("/proxy", proxy)
	mux.HandleFunc("/", Proxy)
	/**服务配置**/
	server := &http.Server{
		Addr:    ":8081",
		Handler: mux,
	}
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

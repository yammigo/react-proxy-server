package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
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
	p := make([]byte, 4)
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
	/**写入数据到文件中**/

}

func resultData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	proxyData := &ProxyData{}
	GetData(proxyData, "./db/db.json")
	fmt.Println(proxyData)
	jsonData, _ := json.Marshal(proxyData)
	io.WriteString(w, string(jsonData))
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", resultData)
	mux.Handle("/static/", http.StripPrefix("/static", http.FileServer(http.Dir("./static/"))))
	server := &http.Server{
		Addr:    ":8081",
		Handler: mux,
	}
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

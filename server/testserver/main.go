package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"
)

func GetFormData(r *http.Request) (string, map[string]interface{}, url.Values) {
	contentType := r.Header["Content-Type"]
	var bodyMap map[string]interface{}
	if len(contentType) > 0 {
		if strings.Contains(contentType[0], "multipart/form-data") {
			r.ParseMultipartForm(1024)
			return contentType[0], bodyMap, r.Form
		} else {
			if strings.Contains(contentType[0], "application/json") {
				body, _ := ioutil.ReadAll(r.Body)
				json.Unmarshal(body, &bodyMap)
				return contentType[0], bodyMap, r.Form
			} else {
				r.ParseForm()
				return contentType[0], bodyMap, r.Form
			}
		}
	} else {
		return "", bodyMap, r.URL.Query()
	}
}

func main() {
	mux := http.NewServeMux()
	//实现请求转发
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

		str := "我是第3个服务"
		contentType, jsonMap, values := GetFormData(r)
		fmt.Println(contentType, "contentType")

		if jsonMap != nil {
			fmt.Println(jsonMap, "asdasd")
		} else {
			fmt.Println(values, "values")
		}
		io.WriteString(w, str)
	})
	/**服务配置**/
	server := &http.Server{
		Addr:    ":8082",
		Handler: mux,
	}
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

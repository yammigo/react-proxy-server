package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"reflect"
	"strings"
)

func GetFormData(r *http.Request) (string, interface{}) {
	contentType := r.Header["Content-Type"]
	if len(contentType) > 0 {
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
	} else {
		return "", r.URL.Query()
	}
}

func main() {
	mux := http.NewServeMux()
	//实现请求转发
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		var v url.Values
		str := "我是第3个服务"
		contentType, values := GetFormData(r)
		typ := reflect.TypeOf(values)
		fmt.Println(typ == reflect.TypeOf(v))
		fmt.Println(contentType, "contentType")
		fmt.Println(values, "values")
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

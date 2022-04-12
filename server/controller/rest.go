package controller

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"server/model"
)

type ProxyData struct {
	Host     string                   `json:"host"`
	Dir      string                   `json:"dir"`
	Headers  string                   `json:"headers"`
	Params   []map[string]interface{} `json:"params"`
	HostList []map[string]interface{} `json:"hostList"`
}

func ResultData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	proxyData := &ProxyData{}
	model.GetData(proxyData, "./db/db.json")
	// fmt.Println(proxyData, "执行")
	jsonData, _ := json.Marshal(proxyData)
	io.WriteString(w, string(jsonData))
}

func SaveData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	r.ParseForm()
	req, _ := ioutil.ReadAll(r.Body)
	writeData := &ProxyData{}
	model.GetData(writeData, "./db/db.json")
	error := json.Unmarshal(req, writeData)
	if error != nil {
		fmt.Println(error)
		io.WriteString(w, `{"result":"false"}`)
		return
	}
	model.WriteData(writeData, "./db/db.json")
	io.WriteString(w, `{"result":"ok"}`)
}

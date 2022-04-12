package controller

import (
	"bytes"
	"io/ioutil"
	"log"
	"net/http"
	"server/util"
	"strings"
)

var fileClient = util.FileNewServer(http.Dir("./public"))

func SetStaticPublic(w http.ResponseWriter, r *http.Request) {
	path := strings.Replace(r.URL.Path, "/public/", "", -1)
	res, err := fileClient.Get("file:///" + path)
	if err != nil {
		log.Fatalln(err)
	}
	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)
	body = util.GzipFast(&body)
	w.Header().Set("Content-Type", res.Header.Get("Content-Type"))
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Encoding", "gzip")
	//设置浏览器缓存时间
	w.Header().Set("Cache-Control", "max-age=31536000")
	bytes.NewBuffer(body).WriteTo(w)

}

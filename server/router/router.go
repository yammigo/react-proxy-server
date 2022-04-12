package router

import (
	"log"
	"net/http"
	"server/controller"
	"server/util"
)

func NewServer() {
	proxy := util.CreateProxy("https://www.youku.com")
	mux := http.NewServeMux()
	mux.HandleFunc("/proxyData", controller.ResultData)
	mux.HandleFunc("/setData", controller.SaveData)
	mux.HandleFunc("/login", controller.Login)
	mux.HandleFunc("/public/", controller.SetStaticPublic)
	//实现请求转发
	mux.HandleFunc("/", util.Proxy(proxy))
	/**服务配置**/
	server := &http.Server{
		Addr:    ":8081",
		Handler: mux,
	}
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}

}

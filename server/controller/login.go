package controller

import (
	"encoding/json"
	"io"
	"net/http"
	"server/model"
)

type User struct {
	UserName  string `json:"userName"`
	Passworld string `json:"passworld"`
}

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-Type", "application/json")
	user := &User{}
	model.GetData(user, "./db/user.json")
	var params map[string]interface{}
	decode := json.NewDecoder(r.Body)
	decode.Decode(&params)
	if user.UserName == params["userName"] && params["passworld"] != nil && user.Passworld == params["passworld"] {
		io.WriteString(w, `{"result":true,"msg":"登录成功"}`)
	} else {
		io.WriteString(w, `{"result":false,"msg":"账号或密码不对"}`)
	}
}

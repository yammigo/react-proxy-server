package util

import (
	"bytes"
	"compress/flate"
	"compress/gzip"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strconv"
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

func SetFormParams() {

	// contentType := r.Header["Content-Type"]
	// fmt.Println(bodyMap)
	// if len(contentType) > 0 {
	// 	if strings.Contains(contentType[0], "multipart/form-data") {
	// 		r.ParseMultipartForm(1024)
	// 		// return contentType[0], bodyMap, r.Form
	// 	} else {
	// 		if strings.Contains(contentType[0], "application/json") {
	// 			body, _ := ioutil.ReadAll(r.Body)
	// 			json.Unmarshal(body, &bodyMap)
	// 			// return contentType[0], bodyMap, r.Form
	// 		} else {
	// 			r.ParseForm()
	// 			// return contentType[0], bodyMap, r.Form
	// 		}
	// 	}
	// } else {
	// 	// return "", bodyMap, r.URL.Query()
	// }
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

//检查是否启用gzip
func switchContentEncoding(res *http.Response) (bodyReader io.Reader, err error) {
	switch res.Header.Get("Content-Encoding") {
	case "gzip":
		bodyReader, err = gzip.NewReader(res.Body)
	case "deflate":
		bodyReader = flate.NewReader(res.Body)
	default:
		bodyReader = res.Body
	}
	return
}

func GzipFast(a *[]byte) []byte {
	var b bytes.Buffer
	gz := gzip.NewWriter(&b)
	defer gz.Close()
	if _, err := gz.Write(*a); err != nil {
		fmt.Println("压缩失败")
		panic(err)
	}
	gz.Flush()
	return b.Bytes()
}

//创建代理

func CreateProxy(target string) *httputil.ReverseProxy {

	proxy_addr, err := url.Parse(target)
	if err != nil {
		fmt.Println(err)
	}

	proxy := httputil.NewSingleHostReverseProxy(proxy_addr)
	proxy.Director = func(request *http.Request) {
		targetQuery := proxy_addr.RawQuery
		//这里只选择两种压缩方式 方便兼容
		request.Header.Set("Accept-Encoding", "gzip, deflate")
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
		path, _ := url.PathUnescape(request.URL.RequestURI())
		fmt.Printf(`{Scheme:%s,Host:%s,Method:%s}%s`, request.URL.Scheme, request.URL.Host, request.Method, "\n")
		if request.Method == "POST" {
			fmt.Println(GetFormData(request))
		}
		fmt.Println(request.Host)
		fmt.Println(path + "\n\n")
	}
	// http.Get(url string)
	proxy.ModifyResponse = func(response *http.Response) error {
		// fmt.Println(path.Ext(response.Request.RequestURI), "后缀")
		ioReader, err := switchContentEncoding(response)
		if err != nil {
			return err
		}
		body, err := ioutil.ReadAll(ioReader)
		if err != nil {
			return err
		}
		err = response.Body.Close()
		if err != nil {
			return err
		}
		if strings.Contains(response.Header.Get("Content-Type"), "text/html") {
			b := []byte(string(`<script>console.log("注入脚本")</script>`))
			before := []byte(string(`<script>
			function checkA(e) {
				var parent = e.target;
				while (parent.tagName != "A" && parent != document.body) {
					parent = parent.parentNode
				}
				parent.href = "javascript:void();";
				parent.target="";
				parent.scene= "";
				parent.setAttribute("target","");
				parent.setAttribute("scene","");
				return parent
			}
			setTimeout(()=>{document.body.addEventListener("mousedown", checkA)},500)
		</script>`))
			body = bytes.Join([][]byte{before, body, b}, []byte(""))
		}
		// fmt.Println(*(*string)(unsafe.Pointer(&body)), "解析数据")
		body = GzipFast(&body)
		response.Header.Set("Cache-Control", "max-age=31536000")
		response.Header["Content-Encoding"] = []string{"gzip"}
		response.Body = ioutil.NopCloser(bytes.NewReader(body))
		response.ContentLength = int64(len(body))
		response.Header.Set("Content-Length", strconv.Itoa(len(body)))
		return nil
	}
	return proxy
}

//生成代理
func Proxy(proxy *httputil.ReverseProxy) http.HandlerFunc {
	fmt.Println("执行代理函数")
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println(r.RemoteAddr)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		proxy.ServeHTTP(w, r)
		// bytes.NewBufferString("test").WriteTo(w)
	}
}

//生成静态目录
func FileNewServer(dir http.Dir) *http.Client {
	t := &http.Transport{}
	//**注册file协议
	t.RegisterProtocol("file", http.NewFileTransport(dir))
	c := &http.Client{Transport: t}

	// res, err := c.Get("file:///edit/app.js")
	// if err != nil {
	// 	return nil
	// }
	// r, _ := ioutil.ReadAll(res.Body)
	// fmt.Println(string(r))
	return c
}

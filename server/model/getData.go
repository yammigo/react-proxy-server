package model

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"strings"
)

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

package model

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

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

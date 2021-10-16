package main

import (
	"html/template"
	"log"
	"net/http"
	"os"

	"github.com/hiroya232/gbs/multi"
)

func main() {
	dir, _ := os.Getwd()
	http.HandleFunc("/", multiHandler)
	http.HandleFunc("/stream", multi.GetMultiList)
	http.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir(dir+"/public/"))))
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func multiHandler(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("src/html/multiList.html")
	t.Execute(w, nil)
}

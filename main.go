package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"strings"

	"database/sql"

	"github.com/dghubble/go-twitter/twitter"
	"github.com/dghubble/oauth1"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"golang.org/x/net/websocket"
)

func main() {
	dir, _ := os.Getwd()
	http.HandleFunc("/", multiHandler)
	http.HandleFunc("/stream", getMultiList)
	http.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir(dir+"/public/"))))
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func multiHandler(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("public/multiList.html")
	t.Execute(w, nil)
}

func getMultiList(w http.ResponseWriter, r *http.Request) {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalln(err.Error())
	}

	dbconf := "root:@tcp(127.0.0.1:3306)/gbs_go?charset=utf8mb4"
	db, err := sql.Open("mysql", dbconf)
	if err != nil {
		log.Fatalln(err.Error())
	}
	defer db.Close()

	config := oauth1.NewConfig(os.Getenv("TWITTER_COMSUMER_KEY"), os.Getenv("TWITTER_COMSUMER_SECRET_KEY"))
	token := oauth1.NewToken(os.Getenv("TWITTER_ACCESS_TOKEN"), os.Getenv("TWITTER_ACCESS_TOKEN_SECRET"))
	httpClient := config.Client(oauth1.NoContext, token)
	client := twitter.NewClient(httpClient)

	params := &twitter.StreamFilterParams{
		Track:         []string{"参加者募集！"},
		StallWarnings: twitter.Bool(true),
	}
	stream, err := client.Streams.Filter(params)
	if err != nil {
		fmt.Println("ツイートの取得に失敗しました。")
	}

	websocket.Handler(func(ws *websocket.Conn) {
		defer ws.Close()
		for {
			ch := <-stream.Messages
			switch tweet := ch.(type) {
			case *twitter.Tweet:
				fmt.Println("\n------------------------------------------------------------------------\n ")

				splitTweet := strings.Split(tweet.Text, "\n")
				splitMultiId := strings.Split(splitTweet[0], " ")

				fmt.Println(splitMultiId[len(splitMultiId)-2] + "\n" + splitTweet[2])

				err := websocket.Message.Send(ws, splitMultiId[len(splitMultiId)-2]+splitTweet[2])
				if err != nil {
					log.Fatalln(err)
				}
			default:
				break
			}
		}
	}).ServeHTTP(w, r)
}

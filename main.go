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
)

func main() {
	http.HandleFunc("/stream", multiHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func multiHandler(w http.ResponseWriter, r *http.Request) {
	getMultiList()
	t, _ := template.ParseFiles("multiList.html")
	t.Execute(w, "multiList")
}

func getMultiList() {

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

	for {
		ch := <-stream.Messages
		switch tweet := ch.(type) {
		case *twitter.Tweet:
			fmt.Println("\n------------------------------------------------------------------------\n ")

			splitTweet := strings.Split(tweet.Text, "\n")
			splitMultiId := strings.Split(splitTweet[0], " ")

			fmt.Println(splitMultiId[len(splitMultiId)-2] + "\n" + splitTweet[2])

			_, err := db.Exec("INSERT INTO MULTI_INFO (id, multi_id, enemy) VALUES ( NULL, ?, ?)", splitMultiId[len(splitMultiId)-2], splitTweet[2])
			if err != nil {
				fmt.Println("\n[ERROR]：", err)
			}
		default:
			break
		}
	}
}

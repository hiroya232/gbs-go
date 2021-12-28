package multi

import (
	"fmt"
	"log"
	"net/http"

	"github.com/dghubble/go-twitter/twitter"
	"github.com/joho/godotenv"
	"golang.org/x/net/websocket"
)

func GetMultiList(w http.ResponseWriter, r *http.Request) {
	loadEnv()
	client := createNewClient()

	websocket.Handler(func(ws *websocket.Conn) {
		fmt.Println("Connection start!!")
		defer ws.Close()

		streamingMulti(ws, client)
	}).ServeHTTP(w, r)
}

func loadEnv() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalln(err.Error())
	}
}

func streamingMulti(ws *websocket.Conn, client *twitter.Client) {
	stream, err := client.Streams.Filter(getFilterCondition(ws))
	if err != nil {
		fmt.Println("マルチ情報の取得に失敗しました。")
	}

	closeChan := make(chan interface{})
	go recvCloseSignal(ws, closeChan)

Streaming:
	for {
		select {
		case multiInfo := <-stream.Messages:
			multiInfoJson := formatMultiInfo(multiInfo.(*twitter.Tweet))
			fmt.Println("stream.Messages：", string(multiInfoJson))
			err := websocket.Message.Send(ws, string(multiInfoJson))
			if err != nil {
				log.Println(err)
			}
		case closeSignal := <-closeChan:
			fmt.Println(closeSignal)
			break Streaming
		}
	}
}

func getFilterCondition(ws *websocket.Conn) (filterCondition *twitter.StreamFilterParams) {
	var enemy string
	websocket.Message.Receive(ws, &enemy)
	filterCondition = &twitter.StreamFilterParams{
		Track:         []string{enemy},
		StallWarnings: twitter.Bool(true),
	}
	return filterCondition
}

func recvCloseSignal(ws *websocket.Conn, ch chan interface{}) {
	for {
		websocket.Message.Receive(ws, nil)
		ch <- "Connection stop!!"
	}
}

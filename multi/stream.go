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

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalln(err.Error())
	}

	websocket.Handler(func(ws *websocket.Conn) {
		fmt.Println("Connection start!!")
		defer ws.Close()

		client := createNewClient()

		var enemy string
		websocket.Message.Receive(ws, &enemy)
		params := &twitter.StreamFilterParams{
			Track:         []string{enemy},
			StallWarnings: twitter.Bool(true),
		}

		stream, err := client.Streams.Filter(params)
		if err != nil {
			fmt.Println("ツイートの取得に失敗しました。")
		}

		closeChan := make(chan interface{})
		go recvCloseSignal(ws, closeChan)

	Streaming:
		for {
			fmt.Println("・")
			select {
			case multiInfo := <-stream.Messages:
				multiInfoJson := formatMultiInfo(multiInfo.(*twitter.Tweet))
				fmt.Println("stream.Messages：", string(multiInfoJson))
				err = websocket.Message.Send(ws, string(multiInfoJson))
				if err != nil {
					log.Println(err)
				}
			case closeSignal := <-closeChan:
				fmt.Println(closeSignal)
				break Streaming
			}
		}
	}).ServeHTTP(w, r)
}

func recvCloseSignal(ws *websocket.Conn, ch chan interface{}) {
	for {
		websocket.Message.Receive(ws, nil)
		ch <- "Connection stop!!"
	}
}

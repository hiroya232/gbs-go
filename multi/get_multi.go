package multi

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/dghubble/go-twitter/twitter"
	"github.com/dghubble/oauth1"
	"github.com/joho/godotenv"
	"golang.org/x/net/websocket"
)

type MultiInfo struct {
	MultiId string `json:"multi_id"`
	Enemy   string `json:"enemy"`
}

func newMultiInfo(multiId string, enemy string) *MultiInfo {
	multiInfo := new(MultiInfo)
	multiInfo.MultiId = multiId
	multiInfo.Enemy = enemy
	return multiInfo
}

func GetMultiList(w http.ResponseWriter, r *http.Request) {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalln(err.Error())
	}

	client := createNewClient()
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
				multiInfoJson := formatMultiInfo(tweet)
				err = websocket.Message.Send(ws, string(multiInfoJson))
				if err != nil {
					log.Fatalln(err)
				}
			default:
				break
			}
		}
	}).ServeHTTP(w, r)
}

func createNewClient() *twitter.Client {
	config := oauth1.NewConfig(os.Getenv("TWITTER_COMSUMER_KEY"), os.Getenv("TWITTER_COMSUMER_SECRET_KEY"))
	token := oauth1.NewToken(os.Getenv("TWITTER_ACCESS_TOKEN"), os.Getenv("TWITTER_ACCESS_TOKEN_SECRET"))
	httpClient := config.Client(oauth1.NoContext, token)
	return twitter.NewClient(httpClient)
}

func formatMultiInfo(tweet *twitter.Tweet) []byte {
	splitTweet := strings.Split(tweet.Text, "\n")
	splitMultiId := strings.Split(splitTweet[0], " ")

	multiInfo := newMultiInfo(splitMultiId[len(splitMultiId)-2], splitTweet[2])
	fmt.Println(multiInfo)
	multiInfoJson, err := json.Marshal(multiInfo)
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println(string(multiInfoJson))
	return multiInfoJson
}

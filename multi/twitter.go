package multi

import (
	"encoding/json"
	"log"
	"os"
	"strings"

	"github.com/dghubble/go-twitter/twitter"
	"github.com/dghubble/oauth1"
)

type MultiInfo struct {
	MultiId string `json:"multi_id"`
	Enemy   string `json:"enemy"`
}

func NewMultiInfo(multiId string, enemy string) *MultiInfo {
	multiInfo := new(MultiInfo)
	multiInfo.MultiId = multiId
	multiInfo.Enemy = enemy
	return multiInfo
}

func createNewClient() *twitter.Client {
	config := oauth1.NewConfig(os.Getenv("TWITTER_COMSUMER_KEY"), os.Getenv("TWITTER_COMSUMER_SECRET_KEY"))
	token := oauth1.NewToken(os.Getenv("TWITTER_ACCESS_TOKEN"), os.Getenv("TWITTER_ACCESS_TOKEN_SECRET"))
	httpClient := config.Client(oauth1.NoContext, token)
	return twitter.NewClient(httpClient)
}

func formatMultiInfo(tweet *twitter.Tweet) []byte {
	splitMultiInfo := strings.Split(tweet.Text, "\n")
	splitMultiId := strings.Split(splitMultiInfo[0], " ")

	formattedMultiInfo := NewMultiInfo(splitMultiId[len(splitMultiId)-2], splitMultiInfo[2])
	formattedmultiInfoJson, err := json.Marshal(formattedMultiInfo)
	if err != nil {
		log.Fatalln(err)
	}
	return formattedmultiInfoJson
}

package main

import (
	"fmt"
	"os"

	"github.com/dghubble/go-twitter/twitter"
	"github.com/dghubble/oauth1"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	router := gin.Default()
	router.GET("/stream", getMultiList)

	router.Run("localhost:8080")
}

func getMultiList(c *gin.Context) {

	err := godotenv.Load(".env")
	if err != nil {
		fmt.Printf(".envの読み込みに失敗しました: %v", err)
	}

	config := oauth1.NewConfig(os.Getenv("TWITTER_COMSUMER_KEY"), os.Getenv("TWITTER_COMSUMER_SECRET_KEY"))
	token := oauth1.NewToken(os.Getenv("TWITTER_ACCESS_TOKEN"), os.Getenv("TWITTER_ACCESS_TOKEN_SECRET"))
	httpClient := config.Client(oauth1.NoContext, token)
	client := twitter.NewClient(httpClient)

	params := &twitter.StreamFilterParams{
		Track:         []string{"あ"},
		StallWarnings: twitter.Bool(true),
	}

	stream, err := client.Streams.Filter(params)
	if err != nil {
		fmt.Println("ツイートの取得に失敗しました。")
	}

	for message := range stream.Messages {
		fmt.Println(message)
	}

}

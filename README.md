# Hacker News: the backend

This repo is the backend part of a project developed by me, Carolina, for Good Tape. For the frontend, please check [here](https://github.com/carolinaviero/hacker-news-fe).

The project uses the Hacker News API provided by Ycombinator. It accesses three different endpoints:
1. the [Top Stories endpoint](hacker-news.firebaseio.com/v0/topstories.json) to fetch the stories;
2. the [Story info endpoint](hacker-news.firebaseio.com/v0/item/[id].json) which is used to get the details of 10 random top stories that are then sorted in descending order;
3. the [Author info endpoint](hacker-news.firebaseio.com/v0/user/[id].json), used to get the id and score of the user that created the story.

The frontend is responsible for displaying the 10 stories. Each story shows you the title, the author (and their karma score), the date and how many points it has received so far.

## Running the app

Clone this repo and run:

### `npm install`

to make sure you install all the dependencies and then:

### `node index.js`

You should be able to access the app by going to [http://localhost:3001](http://localhost:3001). For a full experience, make sure you have [the frontend](https://github.com/carolinaviero/hacker-news-fe) running.
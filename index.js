const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());

const fetchData = async (url) =>  {
	const response = await fetch(url);

	if (!response.ok) {
	  throw new Error('Failed to fetch');
	}

	return response.json();
}
  
app.get('/', async (req, res) => {
	try {
		// Fetch top stories ids
		const topStoriesIds = await fetchData('https://hacker-news.firebaseio.com/v0/topstories.json');

		let storiesIds = [];
		while (storiesIds.length < 10) {
			// Get 10 random indexes
			const index = Math.floor(Math.random() * topStoriesIds.length);

			if (!storiesIds.includes(topStoriesIds[index])) {
				storiesIds.push(topStoriesIds[index]);
			}
		}

		// Fetch details for the 10 random stories
		const stories = await Promise.all(
			storiesIds.map(async (id) => {
				const story = await fetchData(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
				
				// Fetch author details
				const authorDetails = await fetchData(`https://hacker-news.firebaseio.com/v0/user/${story.by}.json`);

				// Add author details (id and karma only) to the story object
				story.authorDetails = { id: authorDetails.id, karmaScore: authorDetails.karma };

				return story;
			})
		);

		// Sort stories by descending score
		stories.sort((a, b) => b.score - a.score);

		res.json(stories);
	} catch (error) {
		console.error('Error', error);
		res.status(500).json({ error: 'Unable to fetch' });
	}
});


app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});



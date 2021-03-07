
const PORT = "" || 12938; // Add ur custom port here


const fs = require('fs');
const ytdl = require('ytdl-core');
const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const app = express();

app.get('/', (req, res) => {
	let video = req.query.v || '1';
	if (!video) return res.status(400).send('Invalid Request');
	if (video.split("v=")[1]) video = video.split("v=")[1];
	if (!ytdl.validateID(video)) return res.sendFile(__dirname + '/index.html');
	let stream = ytdl(`http://www.youtube.com/watch?v=${video}`);
	if (req.query.a) {
		try {
			let proc = new ffmpeg({source:stream});
			proc.toFormat('mp3');
			res.attachment(`${video}.mp3`);
			proc.pipe(res);
		} catch(e) {
			return res.status(500).send('Internal Server Error, try again.');
		}
	} else {
		res.attachment(`${video}.mp4`);
		stream.pipe(res);
	}
});

app.listen(12938, () => {
  console.log(`Example app listening at http://localhost:${12938}`);
});

const PORT = "" || 12938; // Add ur custom port here

let fullDir = process.argv[0].split("\\");
fullDir.pop();
__dirname = fullDir.join("\\");

const fs = require('fs');
const ytdl = require('ytdl-core');
const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const app = express();

app.get('/', (req, res) => {
let video = req.query.v || '12789';
	if (!video) return res.status(400).send('U Wrong :)');
	if (video.split("v=")[1]) video = video.split("v=")[1];
	if (!ytdl.validateID(video)) return res.sendFile(__dirname + '/index.html');
	let astream = ytdl(`http://www.youtube.com/watch?v=${video}`, { quality:"highestaudio" });
	let vstream = ytdl(`http://www.youtube.com/watch?v=${video}`, { quality:"highestvideo" });
	if (req.query.a) {
		try {
			let proc = new ffmpeg({source:astream});
			proc.toFormat('mp3');
			res.attachment(`${video}.mp3`);
			proc.pipe(res);
		} catch(e) {
			return res.status(500).send('Internal Server Error, try again.');
		}
	} else {
		res.attachment(`${video}.mp4`);
		vstream.pipe(res);
	}
});

app.listen(PORT, () => {
  console.log(`ytdl listening at http://localhost:${PORT}`);
});
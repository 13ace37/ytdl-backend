# ytdl-backend
selfhosted, webbased YouTube mp3/4 downloader and converter.

## Setup 

1. clone the repo
1. npm i
1. change `PORT` in index.js

## How it works

The website works without a real frontend:

| Request | Description |
| ------------- | ------------- |
| `ip:PORT?v=[videoID or videoURL]` | provides the mp4 of the video |
| `ip:PORT?v=[videoID or videoURL]?a=true` | provides the mp3 of the video |

**If the ID is invalid the server provides the `index.html` file in the root folder of the script.
This can be used as a frontend.** 

### Example Frontend:

![Example Frontend](https://cdn.xace.ch/H_BJqmCBHr.png)

*My Example simply redirects to the backend with the given url/id.*

<details>
<summary>Example Code</summary>

```html

<body class="inverted" style="background: #2E3440;">
	<main style="align-content: center;">
	<div class="ui grey labeled input">
	  <div class="ui grey label">
	    YouTube Video ID
	  </div>
	  <input id="yt" type="text" placeholder="dQw4w9WgXcQ">
	</div><br /><br />
	<div class="ui buttons" style="align: center; align-content: center;">
	  <button onclick="redirect()" class="ui green button">MP4</button>
	  <div class="or"></div>
	  <button onclick="redirect(true)" class="ui yellow button">MP3*</button>
	</div>
	<br/>
	<div class="ui">
		<p class="ui red">*mp3 converting might take some time for longer videos</p>
	</div>
	<script>
		var input = document.getElementById("yt");
		function redirect(arg = false) {
			if (arg) window.location.replace(`http://ip:PORT?v=${input.value}&a=true`);
			else window.location.replace(`http://ip:PORT?v=${input.value}`);
		}
	</script>
	</main>
</body>

```

</details>

## Disclaimer

The mp3 converting is a CPU-heavy load, especially for longer videos! So I wouldn't recommend hosting this open to the public unless you don't care about the server performance being abused.
var player;
let videoId;

fetch("https://api.allorigins.win/get?url=https://open.spotify.com/playlist/4nArcNkW2LDOuStImVlwzq").then(res => {
    return res.text();
}).then(data => {
    let accessToken = data.match(/\\"accessToken\\":\\"(.+?(?=\\",))/)[1];
    console.log(accessToken)
    fetch('https://api.spotify.com/v1/playlists/4nArcNkW2LDOuStImVlwzq/tracks?offset=0&limit=100&additional_types=track%2Cepisode&market=BR', {
        headers: {
            Accept: "application/json",
            "App-Platform": "WebPlayer",
            "Authorization": `Bearer ${accessToken}`,
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": '"Windows\\"',
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "Spotify-App-Version": "1.1.84.5.gdde8d7f1"
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        console.log(data)
        let spotifyMusics = data.items;
        let randomMusicName = spotifyMusics[Math.floor(Math.random()*spotifyMusics.length)].track;
        console.log(spotifyMusics)
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${randomMusicName.artists[0].name}%20${randomMusicName.name}%20Áudio&type=video&key=AIzaSyBev7TD0hCnjXfDZeRUaiYWdgCFIcxaczw`).then(res => {
            return res.json();
        }).then(data => {
            console.log(data)
            videoId = data.items[0].id.videoId;
            player.loadVideoById(videoId, "small");
            player.playVideo();
        });
    })
})

function onYouTubeIframeAPIReady() {
    player = new YT.Player('playerRef', {
        height: '360',
        width: '640',
        suggestedQuality: "small",
        // events: {
        //     'onReady': onPlayerReady,
        // }
    });
}

function onPlayerReady(event) {
    player.loadVideoById(videoId, "small")
    event.target.playVideo();
}
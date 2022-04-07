$.getJSON("../json/spotifyPlaylist.json", function (data) {
    console.log(data)
});

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('playerRef', {
        height: '360',
        width: '640',
        videoId: 'i8jcP-aphPk',
        suggestedQuality: "small",
        events: {
            'onReady': onPlayerReady,
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}
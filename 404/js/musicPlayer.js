function initCDplayer() {

    //Setting global variables
    let selectDOM = document.getElementById("musicsList");
    let playlistDoc;
    var ytMusicsList;
    var musicThumbDOM = document.getElementById("musicThumb");

    //Fetching playlist using CORS PROXY to get Playlist music Data like Thumbnail and Music Name.
    //THIS STEP IS NEEDED BECAUSE YOUTUBE IFRAME API CAN'T PROVIDE A LIST OF DATA FOR EACH MUSIC ON PLAYLIST.
    fetch(`https://api.codetabs.com/v1/proxy?quest=${"https://www.youtube.com/playlist?list=PLoUZf4ebZrEOdhnEXJ5y_stqurY3zjGZf"}`)
        .then(async response => {
            //Returning document HTML from playlist page.
            if (response.ok) return response.text()
            //if err.
            throw new Error('Network response was not ok.')
        }).then(async (data) => {
            //Parsing response of text to HTML document.
            playlistDoc = new DOMParser().parseFromString(data, "text/html");
            //Getting page object that contains informations about each music on playlist(a list with information for each music in playlist) and converting to JSON Object.
            let ytInitialData = JSON.parse(playlistDoc.scripts[34].text.replace("var ytInitialData = ", "").slice(0, -1));
            //Tracking specific data(Thumbnail, title, channel and others) on JSON object.
            ytMusicsList = await ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;

            //For each element on Array, add in selectDOM as a option.
            ytMusicsList.forEach(function (music, index) {
                //Creating option DOM element.
                let option = document.createElement("OPTION");
                option.text = music.playlistVideoRenderer.title.runs[0].text;
                //Defining index based on JSON object to use on user select a option on Select menu.
                option.setAttribute("data-index", index);
                //Appending option DOM element do selectDOM element.
                selectDOM.appendChild(option);
            });
            //Defining selected option the same item that IFRAME is playing.
            document.getElementById("musicsList").selectedIndex = player.getPlaylistIndex();
        });

    //On change option in select menu, change music index of YOUTUBE IFRAME
    selectDOM.addEventListener('change', function (event) {
        player.playVideoAt(parseInt(event.target[event.target.selectedIndex].getAttribute("data-index")))
    });

    //Creating and defining IFRAME Player playlist.
    player = new YT.Player('playerRef', {
        height: '360',
        width: '640',
        playerVars: {
            listType: "playlist",
            list: "PLoUZf4ebZrEOdhnEXJ5y_stqurY3zjGZf",
            loop: 1
        },
        suggestedQuality: "small",
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
        }
    });

    //VVVVV-----------LOGIC TO GET IFRAME VIDEO CURRENT DURATION ON CHANGE-----------VVVVV
    // This is the source "window" that will emit the events.
    var iframeWindow = player.getIframe().contentWindow;

    // So we can compare against new updates.
    var lastTimeUpdate = 0;

    // Listen to events triggered by postMessage.
    window.addEventListener("message", function (event) {
        // Check that the event was sent from the YouTube IFrame.
        if (event.source === iframeWindow) {
            var data = JSON.parse(event.data);

            // The "infoDelivery" event is used by YT to transmit any
            // kind of information change in the player,
            // such as the current time or a playback quality change.
            if (
                data.event === "infoDelivery" &&
                data.info &&
                data.info.currentTime
            ) {
                // currentTime is emitted very frequently,
                // but we only care about whole second changes.
                var time = Math.floor(data.info.currentTime);

                if (time !== lastTimeUpdate) {
                    lastTimeUpdate = parseInt(time);
                    var minutes = Math.floor(time / 60);
                    var seconds = time - minutes * 60;
                    console.log(minutes, ("0" + seconds).slice(-2));
                }
            }
        }
    });
    //^^^^^-----------LOGIC TO GET IFRAME VIDEO CURRENT DURATION ON CHANGE----------^^^^^

    //On player ready event
    function onPlayerReady(event) {
        //Defining playlist default music index
        event.target.playVideoAt(33);
    }

    //On player state change Event
    async function onPlayerStateChange(event) {
        //-1 Event is on video playlist change.
        if (event.data == -1) {
            //On playlist music change without a user interaction, due music end, change select option on select Element.
            document.getElementById("musicsList").selectedIndex = event.target.getPlaylistIndex();
            //defining thumbnail of music on imgDOM
            musicThumbDOM.src = `https://img.youtube.com/vi/${event.target.getVideoData().video_id}/3.jpg`;
        }
    }
}
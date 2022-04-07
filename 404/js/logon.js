// checking if is first time of client on the page
let isUserFirstLogin = localStorage.getItem("isUserFirstLogin");
if (isUserFirstLogin === "false" && isUserFirstLogin != null) {
    init(false);
}


var isLoading = false;

const audioMouseDown = new Audio('audios/mousedown.mp3');

audioMouseDown.volume = 0.6;

document.addEventListener("mousedown", (e) => {
    audioMouseDown.play();
})

for (item of document.getElementsByClassName("button")) {
    console.log(item, item.classList)
    item.addEventListener("mousedown", (e) => {
        e.currentTarget.classList.add("pressedButton")
    })

    item.addEventListener("mouseup", (e) => {
        e.currentTarget.classList.remove("pressedButton")
    })
}

function init(isUserFirstLogin) {
    localStorage.setItem("isUserFirstLogin", "false")
    console.log("[logon.js] START");
    isLoading = true;
    loadingCursor();
    let logonScreen = document.getElementsByClassName("logonScreen")[0];
    logonScreen.style = "display: none;";
    if (isUserFirstLogin == false) {
        document.getElementsByClassName("desktop")[0].style.opacity = "1";
    } else {
        let audio = new Audio('audios/welcome.mp3');
        audio.volume = 0.2;
        audio.play();
        audio.onended = (e) => {
            stopLoading();
            document.getElementsByClassName("desktop")[0].style.opacity = "1";
        };
    }
}
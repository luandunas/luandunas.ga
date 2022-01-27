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

function init() {
    console.log("[logon.js] START");
    isLoading = true;
    loadingCursor();
    let audio = new Audio('audios/welcome.mp3');
    let logonScreen = document.getElementsByClassName("logonScreen")[0];
    audio.volume = 0.2;
    audio.play()
    logonScreen.style = "display: none;";
    audio.onended = (e) => {
        stopLoading();
        document.getElementsByClassName("desktop")[0].style.opacity = "1";
    };
}

function loadingCursor() {
    let main = document.getElementsByTagName("main")[0];
    var min = 0,
        max = 2;
    main.style = `cursor: url("cursor/loading.cur"), auto;`;
    if (isLoading) {
        setTimeout(function () {
            setTimeout(function () {
                main.style = `cursor: url("cursor/Cursor79.cur"), auto;`;
            }, Math.floor(Math.random() * (max - min + 1) + min) * 200);
            loadingCursor();
        }, Math.floor(Math.random() * (max - min + 1) + min) * 200);
    } else {
        main.style = `cursor: url("cursor/Cursor79.cur"), auto;`;
    }
}

function stopLoading() {
    isLoading = false;
}

var div = document.getElementById('selectBox'), x1 = 0, y1 = 0, x2 = 0, y2 = 0;
function reCalc() { //This will restyle the div
    var x3 = Math.min(x1,x2); //Smaller X
    var x4 = Math.max(x1,x2); //Larger X
    var y3 = Math.min(y1,y2); //Smaller Y
    var y4 = Math.max(y1,y2); //Larger Y
    div.style.left = x3 + 'px';
    div.style.top = y3 + 'px';
    div.style.width = x4 - x3 + 'px';
    div.style.height = y4 - y3 + 'px';
}

document.getElementsByClassName("desktopPrograms")[0].addEventListener("mousedown", (e) => {
    if (!e.target.classList.contains("desktopPrograms")) return;
    div.hidden = 0; //Unhide the div
    x1 = e.clientX; //Set the initial X
    y1 = e.clientY; //Set the initial Y
    reCalc();
});

document.getElementsByClassName("desktopPrograms")[0].addEventListener("mousemove", (e) => {
    x2 = e.clientX; //Update the current position X
    y2 = e.clientY; //Update the current position Y
    reCalc();
});

document.getElementsByClassName("desktopPrograms")[0].addEventListener("mouseup", (e) => {
    div.hidden = 1; //Hide the div
});

$( ".program" ).draggable({containment: $('.desktopPrograms')});
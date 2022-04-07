var div = document.getElementById('selectBox'), x1 = 0, y1 = 0, x2 = 0, y2 = 0;
function reCalc() { //This will restyle the div
    var x3 = Math.min(x1, x2); //Smaller X
    var x4 = Math.max(x1, x2); //Larger X
    var y3 = Math.min(y1, y2); //Smaller Y
    var y4 = Math.max(y1, y2); //Larger Y
    div.style.left = x3 + 'px';
    div.style.top = y3 + 'px';
    div.style.width = x4 - x3 + 'px';
    div.style.height = y4 - y3 + 'px';
}

//Prevent rightclick box
document.addEventListener('contextmenu', event => event.preventDefault());

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

$(".program").draggable({ containment: $('.desktopPrograms') });

//taskbar clock
let clockElement = document.getElementById("taskbarClockTime");
function setClockTime() {
    let date = new Date();
    clockElement.innerText = `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
}
setClockTime();

setInterval(() => {
    setClockTime();
}, 1000)

//<----------------WINDOW DESKTOP GENERATORS---------------->

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}


const errAudio = new Audio('audios/error.mp3');
function createError(programName, err, errDetails) {
    errAudio.play();
    let desktop = document.getElementsByClassName("desktopPrograms")[0];
    let errWindow = desktop.appendChild(createElementFromHTML(
        `
        <div class="window programWindow errorWindow">
            <div class="windowHeader">
                <p class="windowTitle text">${programName} ${err}</p>
                <div class="rightButtons">
                    <button class="closeButton button headerButtons">X</button>
                </div>
            </div>

            <div class="errorContent">
                <img src="img/insidePrograms/error.png" alt="" srcset="">
                <p style="padding-left: 10px;">${programName} ${errDetails}</p>
            </div>
        </div>
        `
    ));

    $(errWindow).on("mousedown", function () {
        this.parentNode.appendChild(this);
    })

    $(errWindow).draggable({ containment: $(".desktopPrograms"), cancel: '.errorContent' });
    for (item of document.getElementsByClassName("button")) {
        console.log(item, item.classList)
        item.addEventListener("mousedown", (e) => {
            e.currentTarget.classList.add("pressedButton")
        })

        item.addEventListener("mouseup", (e) => {
            e.currentTarget.classList.remove("pressedButton")
        })
    }
}

//Adding listener onClick in all desktop programs.
for (item of document.querySelectorAll(".program")) {
    item.addEventListener("dblclick", (e) => {
        let programname = e.currentTarget.dataset.programname.toLowerCase();
        switch (programname) {
            case 'valorant': createError(programname.toUpperCase(), "COULDN'T START", "is not available on your operating system");
        }
    })
}

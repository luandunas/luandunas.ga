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


//Essentials Functions

//Create HTML based on String
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}

//Destoy window element
function destroyWindow(e) {
    e.remove()
}


const errAudio = new Audio('audios/error.mp3');
async function createError(programName, err, errDetails) {
    errAudio.play();
    let desktop = document.getElementsByClassName("desktopPrograms")[0];
    let errWindow = await desktop.appendChild(createElementFromHTML(
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

    $(errWindow).css({"top": `calc((100% - ${$(errWindow).outerHeight()}px)/2)`, "left": `calc((100% - ${$(errWindow).outerWidth()}px)/2)`});

    $(errWindow).on('mouseup', '.closeButton', function (event) {
        errWindow.remove()
    });

    //Bring front clicked window. Reposition children element to be the first of his parent.
    $(errWindow).on("mousedown", function () {
        this.parentNode.appendChild(this);
    })

    $(errWindow).draggable({ containment: $(".desktopPrograms"), cancel: '.errorContent, .closeButton' });
    for (item of document.getElementsByClassName("button")) {
        item.addEventListener("mousedown", (e) => {
            e.currentTarget.classList.add("pressedButton")
        })

        item.addEventListener("mouseup", (e) => {
            e.currentTarget.classList.remove("pressedButton")
        })
    }
}

function passEnter(){
    alert("e")
}

async function filePass(programName) {
    errAudio.play();
    let desktop = document.getElementsByClassName("desktopPrograms")[0];
    let prompt = await desktop.appendChild(createElementFromHTML(
        `
        <div class="window programWindow errorWindow">
            <div class="windowHeader">
                <p class="windowTitle text">${programName}</p>
                <div class="rightButtons">
                    <button class="closeButton button headerButtons">X</button>
                </div>
            </div>

            <div class="errorContent" style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                
                <div class="passwordField">
                    <p class="labelAboveWindow">Password:</p>
                    <input id="password" class="passwordInput inputField" type="password">
                </div>
                <button id="passSubmit" class="button buttonSelected px-80 pl-5">OK</button>
            </div>
            
        </div>
        `
    ));

    $(prompt).css({"top": `calc((100% - ${$(prompt).outerHeight()}px)/2)`, "left": `calc((100% - ${$(prompt).outerWidth()}px)/2)`});

    $(prompt).on('mouseup', '.closeButton', function (event) {
        prompt.remove()
    });

    $(prompt).on("mousedown", function () {
        this.parentNode.appendChild(this);
    })

    $(prompt).find('#passSubmit').on('mouseup', function(event) {
        if($(prompt).find("#password")[0].value == "clea"){
            alert("Show terms and conditions")
        }else{
            alert("Wrong password")
        }
    })

    $(prompt).draggable({ containment: $(".desktopPrograms"), cancel: '.errorContent, .closeButton' });
    for (item of document.getElementsByClassName("button")) {
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
            case 'valorant':
                createError(programname.toUpperCase(), "COULDN'T START", "is not available on your operating system");
                break;
            case 'diario':
                filePass("Diário");
                break;
        }
    })
}

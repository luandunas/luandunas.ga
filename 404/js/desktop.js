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

$( ".program" ).draggable({containment: $('.desktopPrograms')});
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
};
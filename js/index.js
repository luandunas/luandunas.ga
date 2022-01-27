$(window).scroll(function () {
    //You've scrolled this much:
    if ($(window).scrollTop() < 300) {
        $('b').css('opacity', '1'); $('b').css('font-size', '3vh');
    } else {
        $('b').css('opacity', '0'); $('b').css('font-size', '0');
    }
});

//onclick SVG GITHUB
$('#githubsvg').click(function () {
    window.open('https://github.com/dunaas', '_blank');
});

$('#globoutsvg').click(function () {
    window.open('https://top.gg/bot/595118307493806130', '_blank');
});

$('#multimidiasvg').click(function () {
    window.open('https://github.com/luandunasetec/interSite', '_blank');
});

$('#gutosvg').click(function () {
    window.open('https://github.com/Dunaas/sanud', '_blank');
});

$(window).on('resize', function(){
    var win = $(this); //this = window
    if (win.width() < 975) { 
        $('a.nav-link[href="#projetos"]').attr('href', '#projetomobile');
        $('a.nav-link[href="#formacao"]').attr('href', '#formacaomobile');
    }else{
        $('a.nav-link[href="#projetos"]').attr('href', '#projeto');
        $('a.nav-link[href="#formacao"]').attr('href', '#formacao');
    }
});

$( document ).ready(function() {
    console.log( "ready!" );
    var win = $(this); //this = window
    if (win.width() < 975) { 
        $('a.nav-link[href="#projetos"]').attr('href', '#projetomobile');
        $('a.nav-link[href="#formacao"]').attr('href', '#formacaomobile');
    }
});
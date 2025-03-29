// Opens the home tab upon loading the page
window.onload = function () {
    openTab(null, "homeTab"); 
}

document.getElementById("home").addEventListener("click", function(e){
	openTab(e,"homeTab");
});
document.getElementById("game1").addEventListener("click", function(e){
	openTab(e,"snakeGame");
});
document.getElementById("game2").addEventListener("click", function(e){
	openTab(e,"puzzleGame");
});
document.getElementById("game3").addEventListener("click", function(e){
	openTab(e,"platformerGame");
});
// Redirects the browser tab to the readme text file
document.getElementById("readme").addEventListener("click", function(e){
    window.location.href = "readme.txt";
});

 function openTab(e,tab){
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    document.getElementById(tab).style.display = "block";
    e.currentTarget.className += " active";
}
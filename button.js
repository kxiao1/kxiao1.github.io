const links = document.querySelectorAll(".btn:not(.teaser)");
var oColor = new Array(links.length);
var oText = oColor 
for (let i = 0; i < links.length; i++) {
  oColor[i] = links[i].style.backgroundColor;
  oText[i] = links[i].style.color
}
for (let i = 0; i < links.length; i++) {
  links[i].onmouseover = function(e) {
    e.target.style.backgroundColor = "#000000";
    e.target.style.color = "#f3f3f4";
  }
  links[i].onmouseout = function(e) {
    e.target.style.backgroundColor = oColor[i];
    e.target.style.color = oText[i];
  }
}
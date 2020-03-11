const travels = document.querySelectorAll(".btn-outline-dark");
let txt = new Array(travels.length);
txt[0] = "Solo trip to Panama + Habitat for Humanity trip to West Palm Beach, FL";
txt[1] = "Family trip!";
txt[2] = "Solo Europe trip to UK and Denmark";
function showText(i) {
  var myP = document.createElement('P');
  var t = document.createTextNode(txt[i]);
  myP.appendChild(t);
  var mydiv = document.getElementById("id" + i);
  mydiv.insertBefore(myP,mydiv.childNodes[3]);
  travels[i].onclick = "";
}
for (let i = 0; i < travels.length; i++) {
  console.log(i);
  travels[i].onclick = function() {showText(i);};
}
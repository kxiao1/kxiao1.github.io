const travels = document.querySelectorAll(".btn-outline-dark");
let txt = new Array(travels.length);
txt[0] = "- Solo trip to Panama (Boquete is highly recommended!)\n" + 
          "- Habitat for Humanity trip to West Palm Beach, FL\n";
txt[1] = "Family trip to the lovely city of Penang! " + 
          "Too much sumptuous food to post here so check this out...\n";
txt[2] = "Solo trip to Britain (London, Fountains Abbey, " +
          "Cambridge, Edinburgh) " +
          "and Denmark (Copenhagen, Helsingør).\n" +
          "Check out the Harry Potter Studios just outside London!\n";
let link = new Array(travels.length);
link[0] = "https://www.boqueteoutdooradventures.com/";
link[1] = "https://girleatworld.net/penang-food-guide/";
link[2] = "https://www.wbstudiotour.co.uk/";
let desc = new Array(travels.length);
desc[0] = "Boquete Outdoor Adventures";
desc[1] = "Penang Food Guide"
desc[2] = "Warner Bros Studio Tour"
let clicked = new Array(travels.length);
clicked[0] = false;
clicked[1] = false;
clicked[2] = false;
let wrapper = new Array(travels.length);

function showText(i) {
  var myP = document.createElement('P');
  var t = document.createTextNode(txt[i]);
  var a = document.createElement('a');
  a.href = link[i];
  a.target = "_blank";
  a.innerHTML = desc[i];
  myP.appendChild(t);
  myP.appendChild(a);
  myP.style = "white-space:pre-wrap";
  myP.style.fontSize = "70%";
  // myP.style.height = "10%";
  myP.style.border = "1.5px solid #888888";
  myP.style.borderRadius = "5%";
  myP.style.padding = "6px"
  myP.style.marginBottom = "20px";
  var mydiv = document.getElementById("id" + i);
  mydiv.insertBefore(myP,mydiv.childNodes[3]);
  travels[i].removeEventListener("click", wrapper[i]);
  clicked[i] = true;
  myP.addEventListener("mouseleave",function() {mydiv.removeChild(myP);
                                                clicked[i] = false;
                                                travels[i].addEventListener("click",wrapper[i],false);
                                              },false);
}
function hideText(i) {
  var mydiv = document.getElementById("id" + i);

}
for (let i = 0; i < travels.length; i++) {
  if (!clicked[i]) {
  travels[i].addEventListener("click",wrapper[i] = function() {showText(i);},false);
  }
}
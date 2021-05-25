const links = document.querySelectorAll(".btn:not(.teaser, .home)");
const headers = document.querySelectorAll(".btn-outline-dark");
const llen = links.length;
const hlen = headers.length;
const active = new Array(hlen);

const oColor = new Array(llen);
const oText = new Array(llen);

for (let i = 0; i < llen; i++) {
  oColor[i] = links[i].style.backgroundColor;
  oText[i] = links[i].style.color;
}

var coloring = new Array(llen);
var uncoloring = new Array(llen);

function color(b) {
  b.style.backgroundColor = "#000000";
  b.style.color = "#f3f3f4";
}

function uncolor(b, i) {
  b.style.backgroundColor = oColor[i];
  b.style.color = oText[i];
}

for (let i = 0; i < llen; i++) {
  coloring[i] = () => color(links[i]);
  uncoloring[i] = () => uncolor(links[i], i);
  links[i].addEventListener("mouseover", coloring[i], false);
  links[i].addEventListener("mouseout", uncoloring[i], false);
}

function bigFunction(k) {
  currButton = headers[k];
  console.log(active[k]);
  if (active[k]) {
    currButton.addEventListener("mouseover", coloring[k], false);
    currButton.addEventListener("mouseout", uncoloring[k], false);
    uncolor(headers[k], k);
  } else {
    currButton.removeEventListener("mouseover", coloring[k], false);
    currButton.removeEventListener("mouseout", uncoloring[k], false);
    color(headers[k]);
  }
  active[k] = !active[k];
  for (let i = 0; i < hlen; i++) {
    if (i != k && active[i]) {
      headers[i].addEventListener("mouseover", coloring[i], false);
      headers[i].addEventListener("mouseout", uncoloring[i], false);
      uncolor(headers[i], i);
      active[i] = false;
    }
  }
}

for (let i = 0; i < hlen; i++) {
  active[i] = false; // initially all unactive
  headers[i].addEventListener("click", () => bigFunction(i), false);
}

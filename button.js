const links = document.querySelectorAll('.btn:not(.teaser, .home)');
const headers = document.querySelectorAll('.btn-outline-dark');
const llen = links.length;
const hlen = headers.length;
const active = new Array(hlen);

var oColor = new Array(llen);
var oText = oColor;
for (let i = 0; i < llen; i++) {
  oColor[i] = links[i].style.backgroundColor;
  oText[i] = links[i].style.color;
}

var coloring = new Array(llen);
var uncoloring = new Array(llen);

function color(b) {
  b.style.backgroundColor = '#000000';
  b.style.color = '#f3f3f4';
}

function uncolor(b, i) {
  b.style.backgroundColor = oColor[i];
  b.style.color = oText[i];
}

for (let i = 0; i < llen; i++) {
  links[i].addEventListener(
      'mouseover', coloring[i] = function() { color(links[i]); }, false);
  links[i].addEventListener(
      'mouseout', uncoloring[i] = function() { uncolor(links[i], i); }, false);
}

function bigFunction(k) {
  currButton = headers[k];
  console.log(active[k]);
  if (active[k]) {
    currButton.addEventListener('mouseover', coloring[k]);
    currButton.addEventListener('mouseout', uncoloring[k]);
    uncolor(headers[k], k);
    active[k] = false;
  } else {
    currButton.removeEventListener('mouseover', coloring[k]);
    currButton.removeEventListener('mouseout', uncoloring[k]);
    color(headers[k]);
    active[k] = true;
  }
  for (let i = 0; i < hlen; i++) {
    if (i != k) {
      if (active[i]) {
        headers[i].addEventListener('mouseover', coloring[i]);
        headers[i].addEventListener('mouseout', uncoloring[i]);
        uncolor(headers[i], i);
        active[i] = false;
      }
    }
  }
}

for (let i = 0; i < hlen; i++) {
  active[i] = false; // initially all unactive
  headers[i].addEventListener('click', function() { bigFunction(i); }, false);
}

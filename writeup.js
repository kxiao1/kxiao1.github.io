const travels = document.querySelectorAll('.btn-outline-dark');
var len = travels.length;
let txt = new Array(len);
txt[0] = String.fromCharCode(8226) + "\t" +
         '  Habitat for Humanity trip to West Palm Beach, FL, with ' + 
         'complementary city sight-seeing\n' +
         String.fromCharCode(8226) +
         '  Solo trip to Panama (Panama City and Boquete - I recommend the ' +
         'following tour agency!)\n' +
         String.fromCharCode(8627);
txt[1] =
    String.fromCharCode(8226) +
    '  Family trip to the lovely coastal city of Penang \n' +
    String.fromCharCode(8226) +
    " Couldn't decide which food pics to post " + 
    "so you can check them out here:\n" +
    String.fromCharCode(8627);
txt[2] =
    String.fromCharCode(8226) + '  Solo trip to Britain (London, Cambridge, ' +
    'Fountains Abbey, Edinburgh, Watford) ' +
    'and Denmark (Copenhagen, Helsingør)\n' + String.fromCharCode(8226) +
    '  If you love Harry Potter, visit its studios just outside London!\n' +
    String.fromCharCode(8627);
let link = new Array(len);
link[0] = 'https://www.boqueteoutdooradventures.com/';
link[1] = 'https://girleatworld.net/penang-food-guide/';
link[2] = 'https://www.wbstudiotour.co.uk/';
let desc = new Array(len);
desc[0] = 'Boquete Outdoor Adventures';
desc[1] = 'Penang Food Guide'
desc[2] = 'Warner Bros Studio Tour'
let clicked = new Array(travels.length);
clicked[0] = false;
clicked[1] = false;
clicked[2] = false;
let show = new Array(len);
let hide = new Array(len);

function showText(i) {
  var myP = document.createElement('P');
  var t = document.createTextNode(txt[i]);
  var a = document.createElement('a');
  a.href = link[i];
  a.target = '_blank';
  a.innerHTML = desc[i];
  myP.appendChild(t);
  myP.appendChild(a);
  myP.style = 'white-space:pre-line';
  myP.style.width = '100%';
  myP.style.fontSize = '20px';
  myP.style.fontSize = '1.3vw';
  // myP.style.height = "10%";
  myP.style.border = '1.5px solid #888888';
  myP.style.borderRadius = '2%';
  myP.style.padding = '0.375rem 0.75rem';
  var newdiv = document.createElement('div');
  newdiv.id = 'newdiv' + i;
  newdiv.style.width = '100%';
  newdiv.style.padding = '15px';
  newdiv.appendChild(myP);
  var mydiv = document.getElementById('desc');
  for (var k = 0; k < len; k++) {
    if (clicked[k]) {
      hideText(k);
    }
  }
  mydiv.insertBefore(newdiv, mydiv.childNodes[1]);
  travels[i].removeEventListener('click', show[i]);
  clicked[i] = true;
  travels[i].addEventListener('click', hide[i], false);
}

function hideText(i) {
  var mydiv = document.getElementById('desc');
  var newdiv = document.getElementById('newdiv' + i);
  mydiv.removeChild(newdiv);
  clicked[i] = false;
  travels[i].addEventListener('click', show[i], false);
  travels[i].removeEventListener('click', hide[i], false);
}

for (let i = 0; i < len; i++) {
  show[i] = function() { showText(i) };
  hide[i] = function() { hideText(i) }
}

for (let i = 0; i < len; i++) {
  travels[i].addEventListener('click', show[i], false);
}
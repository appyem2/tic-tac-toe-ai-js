//Enabling required options when page reloads.
document.addEventListener("DOMContentLoaded", event => {
  document.querySelector(".player").style.display = "block";
  document.querySelector(".add").style.display = "block";
  document.querySelector(".helpbtn").style.display = "none";
  document.querySelector(".singleplayer").style.display = "none";
  document.querySelector(".algorithm").style.display = "none";
  document.querySelector(".endgame").style.display = "none";
  document.querySelector(".new").style.display = "block";
});
/*Function to add extra rows/columns for broader grid.*/
function addtbl() {
  document.querySelector(".helpbtn").style.display = "none";
  document.querySelector(".singleplayer").style.display = "none";
  document.querySelector(".algorithm").style.display = "none";
  document.querySelector(".endgame").style.display = "none";
  var s = document.getElementById("player");
  s.selectedIndex = 0;
  var y = document.getElementById("add");
  y = y.options[y.selectedIndex].value;
  y = parseInt(y);
  var table = document.getElementById("my-table");
  var row = document.getElementById("my-table").rows;
  while (row.length > 0) {
    table.deleteRow(0);
  }
  document.querySelector("#board").style.display = "none";
  document.querySelector(".endgame").style.display = "none";
  for (var j = 1; j <= y; j++) {
    var k = table.insertRow(-1);
  }
  var row = document.getElementById("my-table").rows;
  for (var j = 1; j <= y; j++) {
    for (var i = 0; i < y; i++) {
      var x = row[i].insertCell(-1);
      x.innerHTML = "";
      x.setAttribute("class", "cell");
    }
  }
  cells = document.querySelectorAll(".cell");
  for (var i = 0; i < cells.length; i++) {
    cells[i].setAttribute("id", i);
  }
  document.querySelector("#board").style.display = "block";
}
/*Function to enable choosing correct option from drop down list. */
function func() {
  document.querySelector(".endgame .text").innerText = "";
  document.querySelector(".endgame .text1").innerText = "";
  document.querySelector(".new").style.display = "none";
  var y = document.getElementById("add");
  y = y.options[y.selectedIndex].value;
  y = parseInt(y);
  algo = document.getElementById("algo");
  algo = algo.options[algo.selectedIndex].value;
  var x = document.getElementById("player");
  x = x.options[x.selectedIndex].value;
  if (x == "mp") {
    document.querySelector(".algorithm").style.display = "none";
    document.querySelector(".add").style.display = "none";
    document.querySelector(".player").style.display = "none";
    document.querySelector(".singleplayer").style.display = "none";
    document.querySelector(".helpbtn").style.display = "block";
    document.querySelector(".endgame").style.display = "none";
    cells = document.querySelectorAll(".cell");
    for (var i = 0; i < cells.length; i++) {
      cells[i].innerText = "";
      cells[i].style.removeProperty("background-color");
    }
    var s = new Array(y * y);
    s.fill("", 0);
    var ob = new Multiplayer(s, y);
    ob.multi();
  }
  if (x == "sp") {
    document.querySelector(".add").style.display = "block";
    document.querySelector(".player").style.display = "block";
    document.querySelector(".helpbtn").style.display = "none";
    document.querySelector(".singleplayer").style.display = "block";
    document.querySelector(".endgame").style.display = "none";
    if (y === 3) document.querySelector(".algorithm").style.display = "block";
  }
}
/*Activating the New Game button to start a new game */
document.getElementById("newgame").addEventListener("click", function() {
  var y = document.getElementById("add");
  y = y.options[y.selectedIndex].value;
  document.querySelector(".add").style.display = "none";
  document.querySelector(".player").style.display = "none";
  var starting, depth, algo, a;
  a = document.getElementById("algo");
  algo = a.options[a.selectedIndex].value;
  var t = a.options[a.selectedIndex].text;
  starting = document.getElementById("starting");
  starting = starting.options[starting.selectedIndex].value;
  depth = document.getElementById("depth");
  depth = depth.options[depth.selectedIndex].value;
  var x = document.querySelectorAll(".cell");
  for (var i = 0; i < x.length; i++) {
    x[i].innerText = "";
    x[i].style.removeProperty("background-color");
  }
  document.querySelector(".singleplayer").style.display = "none";
  document.querySelector(".algorithm").style.display = "none";
  y = parseInt(y);
  document.querySelector(".endgame").style.display = "block";

  if (y !== 3 && depth == 100) {
    document.querySelector(".endgame .text").innerText =
      "NegaMax with Iterative Deepening!";
  } else if (y === 3 && depth == 100) {
    document.querySelector(".endgame .text").innerText = t;
  } else {
    document.querySelector(".endgame .text").style.display = "none";
  }
  if (starting != "X") {
    document.querySelector(".endgame .text1").style.display = "block";
    document.querySelector(".endgame .text1").innerText = "Your Turn!";
  } else {
    document.querySelector(".endgame .text1").style.display = "none";
  }
  var state = new Array(y * y);
  state.fill("", 0);
  if (y === 3) {
    var obj = new State(state, depth, starting, algo, y);
  } else {
    var obj = new State(state, depth, starting, "negamax", y);
  }
  obj.start();
});

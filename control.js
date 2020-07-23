document.addEventListener("DOMContentLoaded", event => {
  document.querySelector(".player").style.display = "block";
  document.querySelector(".add").style.display = "block";
  document.querySelector(".helpbtn").style.display = "none";
  document.querySelector(".singleplayer").style.display = "none";
  document.querySelector(".algorithm").style.display = "none";
  document.querySelector(".endgame").style.display = "none";
});
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
function func() {
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
    /* if (y !== 3) {
      document.querySelector(".viewal .txt").innerText =
        "NegaMax with Iterative Deepening!";
    } else {
      (document.querySelector(".viewal .txt").innerText = document),
        getElementById(algo).innerText;
    }*/
    document.querySelector(".add").style.display = "block";
    document.querySelector(".player").style.display = "block";
    document.querySelector(".helpbtn").style.display = "none";
    document.querySelector(".singleplayer").style.display = "block";
    if (y === 3) document.querySelector(".algorithm").style.display = "block";
  }
}
document.getElementById("newgame").addEventListener("click", function() {
  var y = document.getElementById("add");
  y = y.options[y.selectedIndex].value;
  document.querySelector(".add").style.display = "none";
  document.querySelector(".player").style.display = "none";
  var starting, depth, algo;
  algo = document.getElementById("algo");
  algo = algo.options[algo.selectedIndex].value;
  starting = document.getElementById("starting");
  starting = starting.options[starting.selectedIndex].value;
  depth = document.getElementById("depth");
  depth = depth.options[depth.selectedIndex].value;
  var x = document.querySelectorAll(".cell");
  document.querySelector(".endgame").style.display = "none";
  for (var i = 0; i < x.length; i++) {
    x[i].innerText = "";
    x[i].style.removeProperty("background-color");
  }
  document.querySelector(".singleplayer").style.display = "none";
  document.querySelector(".algorithm").style.display = "none";
  y = parseInt(y);

  var state = new Array(y * y);
  state.fill("", 0);
  if (y === 3) {
    var obj = new State(state, depth, starting, algo, 3);
  } else {
    var obj = new State(state, depth, starting, "negamax", y);
  }
  obj.start();
});

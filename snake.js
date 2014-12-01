//these are intended to act as constants for readability of code
var GRID_SIZE = 40;

var EMPTY = " ";
var HEAD = "O";
var BODY = "o";

var RIGHT = "r";
var LEFT = "l";
var UP = "u";
var DOWN = "d";




function initializeGrid() {
	// grid will be object in format of coordinate pair as key, item in that space as value denoted by character: {x,y: char}  ie {1,1: " "}
  
  var grid = {};

  //fill empty grid
  for (x = 0; x < GRID_SIZE; x++) {
  	for (y = 0; y < GRID_SIZE; y++) {
  		grid[x + "," + y] = EMPTY;
  	}
  }

  return grid;
}



function initializeSnake() {
	var snake = {
	  headPosition: [20,20],
	  direction: RIGHT,
	  body: [[20,20]],
  };
  
  return snake;
}



function render(grid) {
	for (x = 0; x < GRID_SIZE; x++) {
  	for (y = 0; y < GRID_SIZE; y++) {
  		var currentCell = grid[x + "," + y];
      $("#grid-container").append("<div class='cell'>" + currentCell + "</div>");
    }
  }
}












$(document).ready(function() {
  

  var grid = initializeGrid();
  var snake = initializeSnake();
 
  
  grid[snake.headPosition.join()] = HEAD;
  render(grid);


});
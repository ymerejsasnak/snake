//these are intended to act as constants for readability of code

var GRID_SIZE = 40;

//possible cell states
var EMPTY = " ";
var HEAD = "O";
var BODY = "o";

//direction values
var RIGHT = "r";
var LEFT = "l";
var UP = "u";
var DOWN = "d";

//arrow key keycodes
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;




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



function keyHandler(keyEvent) {
  var direction;

  switch (keyEvent.which) {
    case LEFT_ARROW:
      direction = LEFT;
      break;
    case UP_ARROW:
      direction = UP;
      break;
    case RIGHT_ARROW:
      direction = RIGHT;
      break;
    case DOWN_ARROW:
      direction = DOWN;
      break;
  }

  //temp
  
  return direction;

}



function move() {

}



function gameLoop {
	grid[snake.headPosition.join()] = HEAD;

  render(grid);


  $(document).on("keydown", snake.direction = keyHandler);
}









$(document).ready(function() {
  

  var grid = initializeGrid();
  var snake = initializeSnake();
 
  
  gameLoop();

  
  


});
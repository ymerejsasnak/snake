//these are intended to act as constants for readability of code

var GRID_SIZE = 40;

var X = 0;
var Y = 1;

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

  //fill empty grid and create associated divs
  for (y = 0; y < GRID_SIZE; y++) {
  	for (x = 0; x < GRID_SIZE; x++) {
  		grid[x + "," + y] = EMPTY;
  		$("#grid-container").append("<div class='cell' id='position-" + x + "-" + y + "'> </div>");
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
  
  return direction;

}



function move(direction, position) {
  var x = position[X];
  var y = position[Y];

  switch (direction) {
  	case LEFT:
        x -= 1;
  	  break;
  	case UP:
        y -= 1;
  	  break;
    case RIGHT:
        x += 1;
      break;
  	case DOWN:
        y += 1;
  	  break;
  }

  return [x, y];
}



function draw(snake) {
	var headX = snake.headPosition[X];
	var headY = snake.headPosition[Y];

  $( "#position-" + headX + "-" + headY).text(HEAD);

}



function gameLoop(grid, snake) {
	
}








$(document).ready(function() {
  

  var grid = initializeGrid();
  var snake = initializeSnake();
 
  


   	$(document).on("keydown", function(event) {
   		snake.direction = keyHandler(event);
   		snake.headPosition = move(snake.direction, snake.headPosition);
   		draw(snake);
   	});

    
 
  //grid[snake.headPosition.join()] = HEAD;
 
  

  

  


});
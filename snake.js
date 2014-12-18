"use strict";

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

var FPS = 30;



function initializeGrid() {
	// grid will be object in format of coordinate pair as key, item in that space as value denoted by character: {x,y: char}  ie {1,1: " "}
  var grid = {};

  for ( var y = 0; y < GRID_SIZE; y++ ) {
  	for ( var x = 0; x < GRID_SIZE; x++ ) {
      
      grid[x + "," + y] = EMPTY;

   	}
  }
  grid["20,20"] = HEAD;
  
  return grid;
 }



function render(grid) {

  var container = $( "#grid-container" );
  container.empty();

  for (var pos in grid) {
    container.append( "<div class='cell'>" + grid[pos] + "</div>" );    //need to id the cells by position?
  }

}



function run(grid, snake) {
  grid[snake.headPosition.join(",")] = EMPTY;

  snake.headPosition = move(snake.headPosition, snake.direction);
  
  grid[snake.headPosition.join(",")] = HEAD;

  snake.bodySegments.shift(snake.headPosition);
  

  snake.bodySegments.pop(); //temp...only when has 1 segment(head)

  

  render(grid);
}


function Snake(head) {
	this.headPosition = head;
	this.direction = "r";
  this.bodySegments = [ head ];
};






function keyHandler( keyEvent ) {
  var direction;

  switch ( keyEvent.which ) {
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



function move( position, direction ) {
  var x = position[X];
  var y = position[Y];

  switch ( direction ) {
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

  if ( x === 40 ) {
    x = 0;
  }
  if ( x === -1 ) {
    x = 39;
  }
  if ( y === 40 ) {
    y = 0;
  }
  if ( y === -1 ) { 
    y = 39;
  }

  return [x, y];
}







$( document ).ready( function() {
  

  var grid = initializeGrid();
  var snake = new Snake([20,20]);
  

  render(grid);




  


 

  $( document ).on( "keydown", function( event ) {

    event.preventDefault();
    snake.direction = keyHandler( event );
     
  });

 
  
// Start the game loop
var intervalID = setInterval(function() { run(grid, snake )}, 1000 / FPS);

 // To stop the game, use the following:
  //clearInterval(intervalId);

});
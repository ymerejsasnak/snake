"use strict";

//these are intended to act as constants for readability of code

var GRID_SIZE = 40;

var X = 0;
var Y = 1;

//possible cell states
var EMPTY = " ";
var HEAD = "O";
var BODY = "o";
var FOOD = "*";

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

  for ( var y = 0; y < GRID_SIZE; y++ ) {
  	for ( var x = 0; x < GRID_SIZE; x++ ) {
      
      grid[x + "," + y] = EMPTY;

   	}
  }
  grid["20,20"] = HEAD;

  return grid;
}



function Game() {
  this.score = 0;
  this.speed = 10; //temp?
  this.grid = initializeGrid();
  this.snake = new Snake();
}

Game.prototype.displayScore = function() {
  $("#level").text(this.snake.level);
  $("#size").text(this.snake.bodySegments.length);
  $("#experience").text(this.snake.experience);
  $("#health").text(this.snake.health);
  $("#speed").text(this.speed);
  $("#score").text(this.score);
}



function Snake() {
  this.level = 1;
  this.experience = 0;
  this.health = this.level * 2;
  this.direction = "r";
  this.bodySegments = [ [20,20] ];
  this.alive = true;
}


function Food() {
  this.position = [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)]  
  //right now food will overlap and snake may start on food....
}


function render(grid) {

  var container = $( "#grid-container" );
  container.empty();

  for (var pos in grid) {
    var cellClass = "";

    switch (grid[pos]) {
      case HEAD:
        cellClass = "head";
        break;
      case BODY:
        cellClass = "segment";
        break;
      case FOOD:
        cellClass = "food";
        break;
    }
    
    container.append( "<div class='cell " + cellClass + "'></div>" );   
  }
}






function run(grid, snake) {
  
  var tailIndex = snake.bodySegments.length - 1;
  var lastHeadPosition = snake.bodySegments[0];

  //clear last tail from grid
  grid[ snake.bodySegments[tailIndex].join(",") ] = EMPTY; 

  //add new head position to front of segments array
  snake.bodySegments.unshift( move(lastHeadPosition, snake.direction) );

  //erase last tail from segments array
  snake.bodySegments.pop();
  

  if ( grid[snake.bodySegments[0].join(",")] === BODY) { 
    snake.alive = false; 
  }
  
  if ( grid[snake.bodySegments[0].join(",")] === FOOD ) {
    eatFood(grid, snake, tailIndex);
  }

  snake.bodySegments.forEach( function(element, index, array) {
    grid[array[index].join(",")] = BODY;
  });
  
  grid[ snake.bodySegments[0].join(",") ] = HEAD;
  
  render(grid);
  
 
}




function eatFood(grid, snake, tailIndex) {
  


  snake.bodySegments.push( snake.bodySegments[tailIndex] );
  
  var food = new Food();
  grid[food.position.join(",")] = FOOD;
}




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
  
  
  var game = new Game();

  for (var i = 0; i < 5; i++) {
    var food = new Food();
    game.grid[food.position.join(",")] = FOOD;
  }


  render(game.grid);


  $( document ).on( "keydown", function( event ) {

    event.preventDefault();
    game.snake.direction = keyHandler( event );
     
  });

 
  //game loop
  var intervalID = setInterval(function() { 
      run(game.grid, game.snake);
      if (!game.snake.alive) {
        clearInterval(intervalID);
      }
      game.displayScore();
    }, 1000 / game.speed);  //temporary until i adjust speed
  
  

});
"use strict";

/////////////////////////////////////////////////////
//these are intended to act as constants for readability of code

var GRID_SIZE = 25;

var X = 0;
var Y = 1;


//possible cell states
var EMPTY = " ";
var HEAD = "O";
var BODY = "o";
var FOOD = "+"; //eat to level up and grow (and get some points)
var SPIKE = "^"; //lose paw
var STAR1 = "*"; //score length * level

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


//////////////////////////////////////////////////////////////





function initializeGrid() {
	// grid will be object in format of coordinate pair as key, item in that space as value denoted by character: {x,y: char}  ie {1,1: " "}
  var grid = {};

  for ( var y = 0; y < GRID_SIZE; y++ ) {
  	for ( var x = 0; x < GRID_SIZE; x++ ) {
      
      grid[x + "," + y] = EMPTY;

   	}
  }
  return grid;
}



function Game() {
  this.score = 0;
  this.speed = 4; 
  this.grid = initializeGrid();
  this.snake = new Snake();
}

Game.prototype.displayScore = function() {
  $("#level").text(this.snake.level);
  $("#size").text(this.snake.bodySegments.length);
  $("#experience").text(this.snake.level - this.snake.experience);
  $("#speed").text(this.speed);
  $("#score").text(this.score);
};

Game.prototype.render = function() {
  var container = $( "#grid-container" );
  container.empty();

  for (var pos in this.grid) {
    var cellClass = "";

    switch (this.grid[pos]) {
      case HEAD:
        cellClass = "head";
        break;
      case BODY:
        cellClass = "segment";
        break;
      case FOOD:
        cellClass = "food";
        break;
      case SPIKE:
        cellClass = "spike";
        break;
      case STAR1:
        cellClass = "star1";
        break;

    }
    container.append( "<div class='cell " + cellClass + "'></div>" );   
  }
};

Game.prototype.run = function() {
  
  var tailIndex = this.snake.bodySegments.length - 1;
  var lastHeadPosition = this.snake.bodySegments[0];

  //clear last tail from grid
  this.grid[ this.snake.bodySegments[tailIndex].join(",") ] = EMPTY; 

  //add new head position to front of segments array
  this.snake.bodySegments.unshift( move(lastHeadPosition, this.snake.direction) );

  //remove last tail from segments array
  this.snake.bodySegments.pop();
  


  //collision detection should have its own function, can run it by element type?

  //hits spike, loses a segment
  if ( this.grid[ this.snake.bodySegments[0].join(",") ] === SPIKE) { 
    this.grid[ this.snake.bodySegments[tailIndex].join(",") ] = EMPTY; 
    this.snake.bodySegments.pop(); 
  }
  //eats food
  else if ( this.grid[ this.snake.bodySegments[0].join(",") ] === FOOD ) {
    this.ateFood();
  }
  //gets star (scores length * level)
  else if ( this.grid[ this.snake.bodySegments[0].join(",") ] === STAR1 ) {
    this.score += this.snake.level * this.snake.bodySegments.length;
  }

  if (this.snake.bodySegments.length <= 0) {
      this.snake.alive = false;
  }

  //red glow if almost dead (but not if it's the first 2 levels)
  else if (this.snake.level > 2 && this.snake.bodySegments.length < 3) {
    $("#grid-container").addClass("danger");
  }
  else {
    $("#grid-container").removeClass("danger");
  }


  //build body and head in new position if still alive after collisions
  if (this.snake.alive) {
    this.snake.bodySegments.forEach( function(element, index, array) {
      this.grid[array[index].join(",")] = BODY;
    }, this);
  
    this.grid[ this.snake.bodySegments[0].join(",") ] = HEAD;
  }

};

Game.prototype.ateFood = function() {
  //replace eaten food
  var food = new Element(this.grid);
  this.grid[food.position.join(",")] = FOOD;

  //get experience
  this.snake.experience += 1;
  this.score += this.snake.bodySegments.length; //food gives 1 point per snake length

  //level up
  if (this.snake.experience === this.snake.level) {
    this.levelUp();
    if ((this.snake.level + 1) % 3 === 0) { //adds one speed every 3 levels starting at level 2
      this.speed += 1; 
    }
  }
};

Game.prototype.levelUp = function() {
  this.snake.level += 1;
  this.snake.leveledUp = true;
  this.snake.experience = 0;
  this.snake.bodySegments.push( this.snake.bodySegments[this.snake.bodySegments.length - 1] );
    

  //add fire starting at level 2, # added increases by half of current level, rounded down
  for (var i = 0; i < Math.floor(this.snake.level / 2); i++) {
    var fire = new Element(this.grid);
    this.grid[fire.position.join(",")] = SPIKE;
  }
  
  //add star starting at level 2, one every 2 levels
  if (this.snake.level % 2 === 0) {
    var star1 = new Element(this.grid);
    this.grid[star1.position.join(",")] = STAR1;
  }
};



function Snake() {
  this.level = 1;
  this.experience = 0;
  this.direction = "r";
  this.bodySegments = [ [Math.floor(GRID_SIZE / 2), Math.floor(GRID_SIZE / 2)] ];
  this.leveledUp = false; //to trigger time interval change in game loop
  this.alive = true;
}



function Element(grid) {
  do {
    this.position = [Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)]; 
  } while (grid[this.position.join(",")] !== EMPTY); //make sure elements spawn on empty space
}







//keep refactoring...make these part of objects (both game object? or should move go in snake?)


function keyHandler( keyEvent, currentDirection ) {
  var direction = currentDirection;

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

  if ( x === GRID_SIZE ) {
    x = 0;
  }
  if ( x === -1 ) {
    x = GRID_SIZE - 1;
  }
  if ( y === GRID_SIZE ) {
    y = 0;
  }
  if ( y === -1 ) { 
    y = GRID_SIZE - 1;
  }

  return [x, y];
}






function mainLoop(game) {
  var intervalID = setInterval(function() { 
    game.run();
    
    //speed up if leveled up
    if (game.snake.leveledUp) {
      clearInterval(intervalID);
      game.snake.leveledUp = false;
      mainLoop(game);
    }

    //end game code here
    if (!game.snake.alive) {
      clearInterval(intervalID);
            
      //set high score
      if (!localStorage.snakeHighScore) {
        localStorage.snakeHighScore = 0;
      }
      if (game.score > localStorage.snakeHighScore) {
        localStorage.snakeHighScore = game.score;
      }

      //display scores
      $("#end-score").text(game.score);
      $("#high-score").text(localStorage.snakeHighScore);
      $("#endgame").fadeIn();

      //click to restart (right now just does dirty yucky full reload)
      $("body").on("click", function() {
        location.reload();
      })




    }

    game.render();
    game.displayScore();

  }, 1000 / game.speed);
}






$( document ).ready( function() {
  
  var game = new Game();

  //create 5 food
  for (var i = 0; i < 5; i++) {
    var food = new Element(game.grid);
    game.grid[food.position.join(",")] = FOOD;
  }

  game.render(); //initial rendering



  $( document ).on( "keydown", function( event ) {
    event.preventDefault();
    game.snake.direction = keyHandler( event, game.snake.direction );
  });



  mainLoop(game);
    
  
  

});
var score = 0;
// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get starte
    this.x = x;
    this.y = y;
    this.speed = getRandomInt(50, 300);
    this.sprite = 'images/enemy-bug.png';
};

function gameOver(){
  console.log("collision");
  oldScore = score
  alert("GAMEOVER, your score is "+ oldScore);
  score = 0;
  document.getElementById("score").innerHTML  = "Score: 0";
  player.reset();

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    if (this.x < 505) {
    this.x += (this.speed * dt);
    } else{
    this.x = -50;
    }

//Enemy-player collision GAMEOVER :
// In refrence to MDN - Mozilla found on  https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection.
  allEnemies.forEach(function(enemy){
    if  (player.x < enemy.x + 50 &&
 player.x + 50 > enemy.x &&
 player.y < enemy.y + 50 &&
 50 + player.y > enemy.y)
      {
         gameOver();
      }

    });

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-pink-girl.png';

}

Player.prototype.update = function(dt) {

  if (this.y < -5){
    score++;
    document.getElementById("score").innerHTML  = "Score:"+ score;
    this.reset();

  }
    // to prevent going off the screen:
  if (this.x > 506){
    this.x = 430;
  } else if (this.x < -15){
    this.x = -10;
  } else if (this.y>606){
    this.y = 530;
  }

}

Player.prototype.reset = function() {

  this.x = 200;
  this.y = 450;


}

Player.prototype.render = function() {

  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


}

Player.prototype.handleInput = function(key) {

  switch (key){
    case 'right':
        this.x +=50;
        break;
    case 'left':
      this.x -=50;
      break;
    case 'down':
      this.y +=50;
      break;
    case 'up':
        this.y -=50;
       break;
  }

}
// getRandomInt(min, max) function retrieved from a Stackoverflow question:
//From the Mozilla Developer Network documentation:
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//var enemy = new Enemy(200,200); allEnemies.push(enemy);
var allEnemies = []
for (i=1;i<=5;i++){
  var yValue = getRandomInt(50, 140)
  enemy = new Enemy(-10,yValue);
  allEnemies.push(enemy);
}

var player = new Player(200,450);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

player.handleInput(allowedKeys[e.keyCode]);

});

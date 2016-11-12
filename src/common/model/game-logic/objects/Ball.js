const {NORTH, EAST, WEST, SOUTH} = require('../game-const.js') // ES6 deconstruction

module.exports = PongBall
/*
* Ball object
*/
function PongBall({coordinatesBoundary, direction}){
    // this ball needs to know the game it's part of
    this.game

    // ball coordinates, begins at the center
    this.x = coordinatesBoundary/2
    this.y = this.x // this is a nonsense, semantically speaking

    // the ball has a width
    this.width = 10

    // max for coordinates
    // should equal the game field width minus ball width
    this.coordinatesBoundary = coordinatesBoundary

    // speed of the ball in pixels
    this.speed = 10
    this.maxSpeed = 70
    // strategy for how we increment speed (defaults to linear-medium)
    this.incrementSpeedFunction = this.linearMediumIncrementSpeed

    // direction of the ball
    // represented by an angle in radians
    // defaults to a random angle
    this.beginningDirection = direction ? direction : Math.random() * Math.PI * 2
    this.direction = beginningDirection
}

PongBall.prototype.move = function(){
    // move the ball from (x,y) to (x',y')
    // to compute x' and y' it uses:
    // this.angle as direction,
    // this.speed as distance
    // if you don't know math, it's magic, don't bother
    this.x += this.speed * (Math.cos(this.angle))
    this.y += this.speed * (Math.sin(this.angle))

    if(this.x < 0){
        this.x = 0 // enforcing boundaries
        this.bounceFromWest()
    }else if(this.y < 0){
        this.y = 0 // enforcing boundaries
        this.bounceFromNorth()
    }else if(this.x > this.coordinatesBoundary){
        this.x = coordinatesBoundary // enforcing boundaries
        this.bounceFromEast()
    }else if(this.y > this.coordinatesBoundary-this.){
        this.y = coordinatesBoundary // enforcing boundaries
        this.bounceFromSouth()
    }
}

// strategy function
PongBall.prototype.incrementSpeed = function(){
    this.speed = incrementSpeedFunction(this.speed);
}

// "proxies" to read bounce easily
PongBall.prototype.bounceFromEast = function(){
    // this is the angle to bounce to the opponent facing the hit paddle
    const EAST_CENTER = 0 // 0°
    this.bounce(EAST, EAST_CENTER, this.y)
}

PongBall.prototype.bounceFromNorth = function(){
    const NORTH_CENTER = Math.PI/2 // 90°
    this.bounce(NORTH, NORTH_CENTER, this.x)
}

PongBall.prototype.bounceFromWest = function(){
    const WEST_CENTER = Math.PI // 180°
    this.bounce(WEST, WEST_CENTER, this.y)
}

PongBall.prototype.bounceFromSouth = function(){
    const SOUTH_CENTER = 3*Math.PI/2 // 270°
    this.bounce(SOUTH, SOUTH_CENTER, this.x)
}

PongBall.prototype.bounce = function(side, straightAngle, position){
    // if the offset is a positive or negative int
    // we bounce of the paddle
    // else it's equal to 'no', meaning there was no collision (meaning a score)
    var offset = this.game.getCollisionOffset(side, position)
    if(offset !== 'no') this.direction = straightAngle + offset
    else this.resetAfterScore()
}

PongBall.prototype.resetAfterScore = function(){
    // we rotate the beginning direction to ninety degrees
    this.beginningDirection += Math.PI/2
    // we make it the new direction
    this.direction = this.beginningDirection
    // and start from center again
    this.x = this.coordinatesBoundary/2
    this.y = this.x
    // with the beginning speed
    this.speed = 10
}

PongBall.prototype.toJSON = function(){
    return {x: this.x, y: this.y}
}


// incrementSpeed strategy implementation

PongBall.prototype.linearMediumIncrementSpeed = function(speed){
    this.speed++
}
PongBall.prototype.linearMediumIncrementSpeed = function(speed){
    this.speed+=2
}
PongBall.prototype.linearFastIncrementSpeed = function(speed){
    this.speed+=4
}
PongBall.prototype.exponentialIncrementSpeed = function(speed){
    this.speed+=this.speed/4
}

// practical functions for the ball (useless for now)

function getXAxisSymmetry(angle){
    return (angle-(angle*2))+(Math.PI*2)
}
function getYAxisSymmetry(angle){
    return getXAxisSymmetry(angle) + Math.PI
}

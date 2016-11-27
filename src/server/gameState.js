let eventsEnum = require('../common/events.js');

let Game = function (roomId,fps) {
    this.fps = fps;
    this.delay = 1000 / this.fps;
    this.roomId = roomId;
    this.players = {};
    this.loopFunction;
    this.onUpdate = function () {

    };
};

Game.prototype.update = function () {
    this.onUpdate();
};


Game.prototype.loop = function () {
    loopFunction = setTimeout(this.loop.bind(this), this.delay);
    this.update();
};

Game.prototype.start = function () {
    this.loop();
};

Game.prototype.stop = function () {
    clearTimeout(loopFunction);
};

Game.prototype.addPlayer = function(player){
    this.players[player.id] = [];
};

Game.prototype.removePlayer = function(player){
    delete this.players[player.id];
};

Game.prototype.updatePlayers = function({players}){
    for(id in players){
        this.players[id].push(players[id]);
    }
};

Game.prototype.getPlayerState = function(){
    var playerState = {};
    playerState.roomId = this.roomId;
    playerState.players = {};
    for(id in this.players){
        playerState.players[id] = this.players[id].shift();
    }
    return playerState;

};

module.exports = Game;

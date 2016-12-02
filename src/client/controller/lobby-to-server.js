var props = require('../../properties-loader.js')
var eventsEnum = require(props.eventsEnumPath())
var socket = require(props.socketPath())
// loading the modules because it has to be done somewhere
require(props.serverToLobbyPath())
require(props.serverToGamePath())

module.exports.createRoom = function({id, roomName}){
    socket.emit(eventsEnum.createRoom, {'id': id, 'roomName': roomName})
}

module.exports.getAvailableRooms = function(){
    socket.emit(eventsEnum.getAvailableRooms)
}

module.exports.joinRoom = function({id, roomId}){
    if(roomId && id)
    socket.emit(eventsEnum.joinRoom, {'id': id, 'roomId': roomId})
}

module.exports.leaveRoom = function({id, roomId}){
    if(roomId && id)
    socket.emit(eventsEnum.leaveRoom, {'id': id, 'roomId': roomId})
}

module.exports.startGame = function({id, roomId, angle}){
    if(roomId && id && angle !== undefined && angle !== null)
    socket.emit(eventsEnum.startGame, {'id': id, 'roomId': roomId, 'angle': angle})
}

module.exports.newPlayer = function({name}){
    if(name){
        socket.emit(eventsEnum.newPlayer, {'name': name})
        console.log('lobbyToServer - new player')
    }
}

module.exports.listEnrolledPlayers = function(){
    socket.emit(eventsEnum.listEnrolledPlayers)
    console.log('lobbyToServer - list enrolled players')
}
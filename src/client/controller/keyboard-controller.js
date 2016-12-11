let moveCallback

/**
* a device in this case is essentially a set of keys
**/

//map of the 'emuilated' devices
let devices = {
    'kbPrimary': {
        'ArrowLeft': -1,
        'ArrowRight': 1,
        assigned: false
    },
    'kbSecondary': { //supports QWERTY and AZERTY keyboard layouts
        'a': -1,
        'A': -1,
        'q': -1,
        'Q': -1,
        'd': 1,
        'D': 1,
        assigned: false
    },
    'kbTertiary': { // ?
        'v': -1,
        'V': -1,
        'n': 1,
        'N': 1,
        assigned: false
    },
    'kbQuadriary': { // ?
        'i': -1,
        'I': -1,
        'p': 1,
        'P': 1,
        assigned: false
    }
}

let controlKeys = {} //maps each key to its corresponding deviceId
for (var i in devices) {
    for (var j in devices[i]) {
        if (j != 'assigned') {
            controlKeys[j] = {deviceId: i, pressed: false}
        }
    }
}

function init(callback) {
    moveCallback = callback
    document.addEventListener('keydown', function(e){
        if (controlKeys[e.key] !== undefined && !controlKeys[e.key].pressed && devices[controlKeys[e.key].deviceId].assigned) {
            controlKeys[e.key].pressed = true
            if (devices[controlKeys[e.key].deviceId][e.key] == -1) { //left, (should import the directional constants)
                callback({deviceId: controlKeys[e.key].deviceId, value: -1})
            } else { //right, hopefully
                callback({deviceId: controlKeys[e.key].deviceId, value: 1})
            }
        }
    })
    document.addEventListener('keyup', function(e){
        if (controlKeys[e.key] !== undefined && controlKeys[e.key].pressed && devices[controlKeys[e.key].deviceId].assigned) {
            controlKeys[e.key].pressed = false
            callback({deviceId: controlKeys[e.key].deviceId, value: 0})
        }
    })
}

/**
* assigns a device for the given player
**/
function assignControls(playerSide, callback) {
    var deviceId = null
    for (var i in devices) {
        if (devices[i].assigned == false) {
            devices[i].assigned = true
            var deviceId = i
            break;
        }
    }
    var error = null
    if (deviceId === null) { //couldn't assign a device
        error = {message: 'All defined keysets are already assigned'}
    }
    callback(error, {deviceId: deviceId, side: playerSide})
}

/**
* marks the device as unassigned
**/
function deassignControls(deviceId, callback) {
    var device = devices[deviceId]
    if (device !== undefined) {
        device.assigned = false
    }
    if (callback !== undefined) callback(null, null)
}

module.exports = {
    init: init,
    assignControls: assignControls,
    deassignControls: deassignControls
}
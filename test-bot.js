'use strict';
// let actions = [window.triggerJump, window.triggerDuck, window.triggerReleaseDuck]
let actions = [window.triggerJump];

function randomAction() {
    return actions[Math.floor(Math.random() * actions.length)];
}

var action;

function aiAction() {
    // proprietary time based pseudoranom algorithm
    // to determine whether to jump or not
    if (Math.floor(Math.random() * 100) < 35) {
        action = randomAction();
        action();
    }
}

// high speed ai
var aiLoop = setInterval(() => {
    aiAction();
}, 100);
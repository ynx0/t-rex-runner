'use strict';

let minJumpDist = () => 140;

function shouldJump() {
    return getNearestObstaclePos() <= minJumpDist();
}

function aiAction() {
    if (shouldJump()) {
        console.log("Jumping");
        window.triggerJump();
    }
}

var aiLoop = setInterval(() => {
    aiAction();
}, 100);
'use strict';

class Score {
    constructor(score, timestamp) {
        this.score = score;
        this.timestamp = timestamp || Date.now();
    }
}


let scores;

if (localStorage.scores !== undefined) {
    scores = JSON.parse(localStorage.scores);
} else {
    scores = [];
}
// MARK - wrappers
// todo check if state values (ducking etc) are updated
function triggerJump() {
    Runner.instance_.triggerJump();
}

function triggerDuck() {
    Runner.instance_.triggerDuck();
}

function triggerReleaseDuck() {
    Runner.instance_.triggerReleaseDuck();
}

function getDistance() {
    return Runner.instance_.distanceRan;
}

function isGameOver() {
    return Runner.instance_.crashed;
}

function isJumping() {
    return Runner.instance_.jumping;
}

function isDucking() {
    return Runner.instance_.ducking;
}

function restart() {
    Runner.instance_.restart();
}

function startGameInit() {
    if (!Runner.instance_.playing) {
        Runner.instance_.loadSounds();
        Runner.instance_.playing = true;
        Runner.instance_.update();
    }
    //  Play sound effect and jump on starting the game for the first time.
    if (!Runner.instance_.tRex.jumping && !Runner.instance_.tRex.ducking) {
        Runner.instance_.playSound(Runner.instance_.soundFx.BUTTON_PRESS);
        Runner.instance_.tRex.startJump(Runner.instance_.currentSpeed);
    }
}

// MARK - behavoiur
function addScore(score) {
    scores.push(score);
    localStorage.setItem('scores', JSON.stringify(scores));
}

function getObstacles() {
    return Runner.instance_.horizon.obstacles;
}

function getNearestObstaclePos() {
    if (Runner.instance_.horizon.obstacles[0] == null || undefined) {
        return null;
    }
    var smallestDistance = Runner.instance_.horizon.obstacles[0].xPos;

    Runner.instance_.horizon.obstacles.forEach((o) => {
        if (o.xPos < smallestDistance) {
            smallestDistance = o.xPos
        }
    });
    return smallestDistance;
}

window.lossCheck = setInterval(() => {
    if (isGameOver()) {
        console.log("Last score:", getDistance());
        addScore(new Score(getDistance()));
        restart();
    }
});


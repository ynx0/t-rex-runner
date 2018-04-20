'use strict';

let distMax = 300; // absolute
let distMin = 140; // absolute (in actual equation b/c of sigmoid, this val is + 1)
let offset = 5;
let rate = 1 / 5;
let timeRegularizationFactor = 1000;
let aiCycleTime = 100;

// tensorflow
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});


function getAdjRunningTime() {
    return getRunningTime() / timeRegularizationFactor;
}

// sigmoid function
let minJumpDist = (t) => {
    var relMax = distMax - distMin;
    // sigmoidal function
    return (relMax / (1 + Math.pow(Math.E, (-rate * t + offset)))) + distMin;
};

function shouldJump() {
    let minD = minJumpDist(getAdjRunningTime());
    if (!isPaused()) {
        console.log("Current Minimum Jumping Dist:", minD);
    }
    return getNearestObstaclePos() <= minJumpDist(getAdjRunningTime());
}

function aiAction() {
    if (shouldJump()) {
        console.log("Jumping");
        window.triggerJump();
    }
}

var aiLoop = setInterval(() => {
    aiAction();
}, aiCycleTime);
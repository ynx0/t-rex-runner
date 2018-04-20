// 'use strict';
//
// // adapted from
//
// var states, actions, rewards = [];
//
// var alpha = 1e-4;
// var gamma = 0.99;
//
// // r in this case is a not tensorflow tensor
// // todo figure out shape
// function discount(r, gamma, normal) {
//     var disc = nj.zeroesLike(r);
//     var G = 0.0;
//
//     // https://stackoverflow.com/a/23131317/3807967
//     // todo is r.size correct or maybe r.shape or r.rank
//     for (var i in _.range(0, r.size)) {
//         // really fkn sketch my dude
//         G = G * gamma + r.gather(tf.tensor1d([i]));
//
//     }
// }

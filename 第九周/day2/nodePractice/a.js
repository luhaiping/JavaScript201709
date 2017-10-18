let plus = (a,b)=>a+b;

let minus = (a,b)=>a-b;

let sum = (...args)=>eval(args.join("+"));

// module.exports = {
//     plus:plus,
//     minus:minus,
//     sum:sum
// }
exports.sum = sum;
exports.plus = plus;
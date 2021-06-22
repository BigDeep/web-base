const printB = require('./b')

module.exports = function printB(){
    console.log("module a!")
    printB();
}
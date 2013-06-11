"use strict";

//   [operation, motion, next state], []
var program = [[[], []]];
var memory = [];
var blank = 0;
var state = 0;
var head = 0;
var outputBuffer = '';

// ------ COPY
memory = [0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0];
program = [
    [[], []],
    [['N', 'N', 0], ['E', 'R', 2]],
    [['E', 'R', 3], ['P', 'R', 2]],
    [['P', 'L', 4], ['P', 'R', 3]],
    [['E', 'L', 5], ['P', 'L', 4]],
    [['P', 'R', 1], ['P', 'L', 5]]
];
head = Math.floor(memory.length-4);
state = 1;

// ------ DETECT NUMBERS
// memory = [0,0,0,0,0,0,0,0,0, 1,1,1,1,1,1, 0,0,1, 0,1,0, 0,1,1, 1,0,0, 1,0,1, 1,1,0, 1,1,1, 0,0,0,0,0,0,0];
// head = 0;
// state = 1;

// function addEnd() {
//     program.push([['N','L', 0], ['N', 'N', 0]]);
// }

// function addRewind() {
//     var start = program.length;

//     for (var i = 0; i < 30; ++i) {
//         start++;
//         program.push([['N','R', start], ['N', 'R', start]]);
//     }
// }

// function addNumberDetect() {
//     var start = program.length;
//     start++;
//     program.push([['O','L', start], ['O', 'L', start]]);
//     start++;
//     program.push([['O','L', start], ['O', 'L', start]]);
//     start++;
//     program.push([['O','L', start], ['O', 'L', start]]);
//     start++;
//     program.push([['N','N', start], ['N', 'N', start]]);
// }

// function addSectionDetect() {
//     var start = program.length;
//     // find first 1
//     program.push([['N','L', start], ['N', 'L', start+1]]);

//     var seek = start+2;
//     program.push([['N','L', start], ['N', 'L', seek++]]);
//     program.push([['N','L', start], ['N', 'L', seek++]]);
//     program.push([['N','L', start], ['N', 'L', seek++]]);
//     program.push([['N','L', start], ['N', 'L', seek++]]);

//     // if last 1 go to end
//     program.push([['N','L', start], ['N', 'L', seek++]]);
// }

// addSectionDetect();
// addNumberDetect();
// addRewind();
// addSectionDetect();
// addNumberDetect();
// addNumberDetect();
// addEnd();


// -----------------------------------------------------
function right() {
    if (head === 0) {
        memory.unshift(blank);
    } else {
        --head;
    }
}

function left() {
    if (head === memory.length-1) {
        memory.push(blank);
    }

    ++head;
}

function read() {
    return memory[head];
}

function write(symbol) {
    memory[head] = symbol;
}

function erase() {
    memory[head] = blank;
}

function dumpProgram() {
    console.log(program.join('\n'));
}

function dump() {
    var tmp = "State: " + state + " - " + program[state][0] + " | " + program[state][1] + "  -> ";
    var tmp2 = '';


    for (var i = 0; i < head + tmp.length; ++i)
        tmp2 += ' ';
    tmp2 += "^";

    tmp += memory.join('');

    console.log(tmp);
    console.log(tmp2);
}

function compute() {
    var s;

    if (state === 0) {
        console.log(" END");
        console.log("Output: " + outputBuffer);
        return;
    }

    dump();

    if (read() === 0) {
        s = program[state][0];
    } else {
        s = program[state][1];
    }

    if (s[0] === 'E') {
        erase();
    } else if (s[0] === 'P') {
        write(1);
    } else if (s[0] === 'O') {
        outputBuffer += read();
    }

    if (s[1] === 'R') {
        right();
    } else if (s[1] === 'L') {
        left();
    }

    state = s[2];

    setTimeout(compute, 100);
}

dumpProgram();
compute();

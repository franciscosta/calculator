/*

Takes in two numbers
and one operator
and performs the calculation

*/ 

import {add, subtract, multiply, divide, modulo} from './math.js'


export function operate(a, b, o) {

    a = Number(a);
    b = Number(b);
    o = String(o);

    const operations = {
        '+': add,
        '-': subtract,
        '*': multiply,
        '/': divide,
        '%': modulo
    };

    return operations[o](a, b);

}



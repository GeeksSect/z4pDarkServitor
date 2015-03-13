var mem = new Array(100);
var A=0, BS=0, T=99, I=0;

var VMState = 0; // 0,1,2: before,during,after

function run() {
    if (VMState == 0) {
        for (i = mem.length; i < 100; i++) {
            mem[i] = 0;
        }
        VMState = 1;
        step();
    } else if (VMState == 1) {
        step();
    }
}

function step() {
    var cmd = Math.abs(Math.floor(parseInt(mem[I]) / 100));
    var op = parseInt(mem[I]) % 100;
    A = parseInt(A);
    switch(cmd) {
        case 10:
            var d = parseInt(prompt("Number For Input:","0"));
            mem[BS+op] = d;
            break;
        case 11:
            alert(mem[BS+op]);
            break;
        case 20:
            A = mem[BS+op];
            break;
        case 21:
            mem[BS+op] = A;
            break;
        case 22:
            A = T;
            break;
        case 23:
            T = A;
            break;
        case 24:
            A = BS;
            break;
        case 25:
            BS = A;
            break;
        case 26:
            PUSH(A);
            break;
        case 27:
            A = POP();
            break;
        case 30:
            A += parseInt(mem[BS+op]);
            break;
        case 31:
            A -= mem[BS+op];
            break;
        case 32:
            A *= mem[BS+op];
            break;
        case 33:
            A /= mem[BS+op];
            break;
        case 34:
            A %= mem[BS+op];
            break;
        case 35:    // LITERAL
            A *= 100;
            A %= 10000;
            A += op;
            break;
        case 40:
            I = op;
            break;
        case 41:
            if (A < 0) { I = op; }
            break;
        case 42:
            if (A == 0) { I = op; }
            break;
        case 43:
            redraw();
            VMState = 2;
            $("#btnStep").addClass("disabled");
            alert('program has finished succesfully');
            return;
            break;
        case 44:    // CALL
            PUSH(I);
            I = op;
            I--;
            break;
        case 45:    // RET
            I = POP();
            for(i = 0; i < op; i++) {
                POP();
            }
            break;
    }
    I++;
    redraw();
}

function redraw() {
    var tb = "<thead><th>&nbsp;</th>";
    for (i = 0; i < 10; i++) {
        tb += '<th>'+i+'</th>';
    }
    tb += "</thead>";
    for (i = 0; i < 100; i++) {
        if (i % 10 == 0) {
            tb += '<tr><td><b>'+ Math.floor(i/10)*10 +'</b></td>';
        }
        if (i != I) {
            tb += '<td>'+mem[i]+'</td>';
        } else {
            tb += '<td bgcolor="#aaa">'+mem[i]+'</td>';
        }
        if (i % 10 == 9) {
            tb += '</tr>';
        }
    }
    
    document.getElementById('memory').innerHTML = tb;
    document.getElementById('regA').innerHTML   = A;
    document.getElementById('regBS').innerHTML  = BS;
    document.getElementById('regT').innerHTML   = T;
    document.getElementById('regI').innerHTML   = I;
}

function PUSH(val) {
    if (mem[T] == 0) {
        mem[T] = val;
        T--;
    } else {
        alert("stack overflow");
    }
}

function POP() {
    if (T < 99) {
        var res = mem[T+1];
        T++;
        mem[T] = 0;
        return res;
    } else {
        alert("stack is empty");
    }
}

$(document).ready(function(){
    $('#codes').text(mem.join("\n"));
    mem = [
        +3550,
        +2106,
        +3006,
        +2106,
        +4300,
    ];
    for (i = mem.length; i < 100; i++) {
        mem[i] = 0;
    }
    redraw();
});

function reload() {
    var codes = ($('#codes').val()).split("\n");
    for (i = 0; i < 100; i++) {
        mem[i] = 0;
    }
    for (i = 0; i < codes.length; i++) {
        mem[i] = parseInt(codes[i]);
    }
    
    VMState = 0;
    A = 0;
    BS = 0;
    T = 99;
    I = 0;
    $("#btnStep").removeClass("disabled");
    redraw();
}

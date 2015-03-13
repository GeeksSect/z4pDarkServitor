function compile() {
    var mem = [];
    var memAddr = [];
    var symb = {};
    var I = 0;
    var V = 99;
    
    var src = $('#source').val();
    var lines = src.split("\n");
    
    for(i = 0; i < lines.length; i++) {
        var l = lines[i].split(' ');
        console.log(l);
        var lnum = l[0];
        
        switch(l[1]) {
            case 'rem':
                symb[lnum] = {val: lnum, type:'label', addr: I};
                break;
                
            case 'input':
                mem[I] = 1000;
                symb[lnum] = {val: lnum, type:'label', addr: I};
                var v = l[2];
                if (symb[v] === undefined) {
                    symb[v] = {val: l[v], type:'var', addr: V};
                    V--;
                }
                memAddr[I] = v;
                I++;
                break;
                
            case 'print':
                mem[I] = 1100;
                symb[lnum] = {val: lnum, type:'label', addr: I};
                var v = l[2];
                if (symb[v] === undefined) {
                    symb[v] = {val: v, type:'var', addr: V};
                    V--;
                }
                memAddr[I] = v;
                I++;
                break;
                
            case 'goto':
                
                
            case 'end':
                mem[I] = 4300;
                break;
        }
        
    }
    
    for(i = 0; i < mem.length; i++) {
        var v = memAddr[i];
        if (v !== undefined) {
            mem[i] = mem[i] + symb[ v ].addr;
        }
    }
    
    for(var s in symb) {
        
    }
    
    var cd = '';
    for(i = 0; i < mem.length; i++) {
        cd += mem[i] + "\n";
    }
    $('#codes').val(cd);
    
    alert(JSON.stringify(symb));
}
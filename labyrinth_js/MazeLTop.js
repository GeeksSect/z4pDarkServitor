function Generate(rows, cols) {
	var a = new Array(rows);
	
	const c1 = 4; // less -> more holes in horizontal walls
	const c2 = 6; // more -> more vertical walls
	
	// dfs	
	var path = function(r1, cl1, r2, cl2) {
		var res = false;
		var search = function(x, y) {
			if (res) { return; }
			if (Math.sqrt((x-cl2)*(x-cl2) + (y-r2)*(y-r2)) <= 1) {
				res = true;
				return;
			}
			if (a[y][x-1] == 0) { a[y][x] = 8; search(x-1, y); a[y][x] = 0; } // left
			if (a[y-1][x] == 0) { a[y][x] = 8; search(x, y-1); a[y][x] = 0; } // up
			if (a[y][x+1] == 0) { a[y][x] = 8; search(x+1, y); a[y][x] = 0; } // right
			if (a[y+1][x] == 0) { a[y][x] = 8; search(x, y+1); a[y][x] = 0; } // down
		}
		var x = cl1;
		var y = r1;
		search(x,y);
		return res;
	}
	
	for(var i = 0; i < rows; i++) {
		a[i] = new Array(cols);
		for(var j = 0; j < cols; j++) {
			a[i][j] = 0;
		}
	}
	
	// borders
	for(var i = 0; i < rows; i++) {
		a[i][0] = 1;
		a[i][cols-1] = 1;
	}
	for(var i = 0; i < cols; i++) {
		a[0][i] = 1;
		a[rows-1][i] = 1;
	}
	
	for(var i = 2; i < rows-1; i+=2) {
		var c = 0;
		for(var j = 1; j < cols-1; j++) {
			if (a[i][j-1] == 1 && rand(c1) == 0) {
				a[i][j] = 0;
				c++;
			} else {
				a[i][j] = 1;
			}
		}
		
		if (c == 0) {
			a[i][rand(cols-2)+1] = 0;
		}
	}
	
	for(var i = 1; i < rows-1; i+=2) {
		for(var k = 0; k < c2; k++) {
			var j = rand(cols-4)+2;
			if (a[i][j] != 0) {
				continue;
			}
			
			a[i][j] = 1;
			if ( !path(i, j-1, i, j+1) ) {
				a[i][j] = 0;
			}
			if (a[i-1][j] == 0 && !path(i, j-1, i-1, j)) {
				a[i][j] = 0;
			}
			if (a[i+1][j] == 0 && !path(i, j-1, i+1, j)) {
				a[i][j] = 0;
			}	
		}
	}
	
	return a;
}

// returns integer 0..n-1
function rand(n) {
	return Math.floor( Math.random() * n );
}
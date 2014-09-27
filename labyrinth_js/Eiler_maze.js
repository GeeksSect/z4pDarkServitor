/*
	�������� ������ (��������� ���������)
	hex-��� ������ ������: LTRB
	��������, 1010 - ������� ����� � ������
*/

function Generate(rows, cols) {
	var unite = function (a, i, j) {
		var t = a[j];
		for(var k = 0; k < cols; k++) {
			if (a[k] == t) {
				a[k] = a[i];
			}
		}
	}
	
	var lab = new Array(rows);
	var borders = new Array(rows);
				
	for(var i = 0; i < rows; i++) {
		lab[i] = new Array(cols);
		borders[i] = new Array(cols);
	}
	
	// ������� 1-� ������
	for(var i = 0; i < cols; i++) {
		lab[0][i] = 0;
		borders[0][i] = 0;
	}
	
	var c = 1; // ������� ��������
	
	for(var i = 0; i < rows; i++) {
		// ������� ������� �����
		borders[i][0] |= 0x1000;
		borders[i][cols-1] |= 0x0010;
		
		// ��������� ������ ������ �����������
		for(var j = 0; j < cols; j++) {
			if (lab[i][j] < 1) {
				lab[i][j] = c++;
			}
		}
	
		// ��������� ������ ������
		for(var j = 0; j < cols-1; j++) {
			var f = rand();
			if (f) {
				borders[i][j] |= 0x0010;
			} else {
				if (lab[i][j+1] == lab[i][j]) { // ���� �������� ������ - �� 1 ��-��
					borders[i][j] |= 0x0010;	// ������ ������� ����� ����
				} else { 						
					var t = lab[i][j+1];	// ����� - ���������� ���������
					unite(lab[i], j, j+1);
				}
			}
		}
		
		// ��������� ������ �����
		for(var j = 0; j < cols; j++) {
			var f = rand();
			if (f)
				for (var k = 0; k < cols; k++) {
					if (lab[i][k] == lab[i][j] && j!=k) {
						if (borders[i][k] == 0) {
							borders[i][j] |= 0x0001;
							////console.log('_',lab[i],borders[i],j,k,borders[i][j],borders[i][k]);
							break;
						}
					}
				}
		}
		
		// ����� ������
		lab[i+1] = lab[i].slice(0);
		borders[i+1] = borders[i].slice(0);

		//console.log(i,borders[i]);
		//console.log(i,lab[i]);		
		// ���� ������ �� ���������
		if (i+1 < rows) {
			// ������� ������ ������� � �������� (���������) � ������� � ���� +������ �������
			for(var j = 0; j < cols; j++) {
				if (borders[i+1][j] % 2 == 1) {
					borders[i+1][j] &= 0x1110;
					lab[i+1][j] = 0;
				}
				borders[i+1][j] &= 0x1101;
			}
		} else {
			for(var j = 0; j < cols; j++) {
				borders[i][j] |= 0x0001; // ������ ������� ����!
			}
			
			for(var j = 0; j < cols; j++) {
				if (borders[i][j] % 2 == 1) {
					//lab[i+1][j] = c++;
				}
			}
			// ������� ������ ������� ����� �������� ������ �������� � ���������� ��
			for(var j = 0; j < cols-1; j++) {
				if (lab[i][j] != lab[i][j+1]) {
					borders[i][j] &= 0x1101;
					unite(lab[i], j, j+1);
					//console.log('unite ',j,j+1);
				}
			}
			
			// � ������� �� ����� ���������
			//console.log(i,borders[i]);
			//console.log(i,lab[i]);
			//console.log('finish, last i='+i);
			break;
		}
	}
		
	return borders;
}

function lab2text(borders, rows, cols) {
	cell2txt = function(c) {
		var txt = "";
		if (c & 0x0001) {
			txt += '__';
		} else {
			txt += '  ';
		}
		
		if (c & 0x0010) {
			txt += '|';
		} else {	
			txt += ' ';
		}
		////console.log(c+':'+txt);
		return txt;
	}

	var txt = " __";
	for(var i = 0; i < cols-2; i++) {
		txt += '___';
	}
	txt += "___\n";
	
	for(var i = 0; i < rows; i++) {
		txt += '|';
		for(var j = 0; j < cols; j++) {
			txt += cell2txt(borders[i][j]);
		}
		txt += '\n';
	}
	return txt;
}

function min(a,b) {
	if (a < b) return a;
	else return b;
}

function max(a,b) {
	if (a > b) return a;
	else return b;
}

function rand() {
	return Math.round(Math.random());
}
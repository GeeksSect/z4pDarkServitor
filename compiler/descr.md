# ����������

2 ���������� ����������������� �����������

����:
1 ��� (�), �� 1 �������� �����
������� ���������� (I), 1/2 �����

������:
����� �����, �� 1 ����� � ������, 100 �����

�������:
10 ���� ������ � ��������� ������
11 ����� �������� ��������� ������ �� �����
20 ��������� ������ ������ � � (load)
21 ��������� � � ������ (store)
22 A = T
23 T = A
24 A = BS
25 BS = A
26 PUSH (A)
27 POP (A)
30 ���������� � � �������, ��������� � �
31 -
32 *
33 /
34 MOD
35 LITERAL
40 JUMP
41 BRANCHNE (�������, ���� � < 0)
42 BRANCHZERO (�������, ���� � = 0)
43 HALT
44 CALL ������� �������� �������� ���������� ���������� � ����, ���������� ��������� �� ���������� ������
45 RET ���������� ���������� �� ������ � �����, �� ����� ������������� ���-�� ���� 4 ��� 4504

����� �������:
    1) ���� ���� ������������ ��������, �� ��������� PUSH
    2) ��������� ������� �������� � �������� �������
    3) ����� ���� � ����� �������
    4) �������� BS
    5) � BS ���������� ������� �

���������� ������ �������:
    1) ������� ��� ��������� ����������
    2) ������� �� ����� �������� BS
    3) RET c ����������� ����������
    4) ��������� ������� �� ������� �����, ����� ������������ ��� �� ������ ����������

00 +1007
01 +1008
02 +2007
03 +3008
04 +2109
05 +1109
06 +4300


�������� ������� (�) 1/2 ����� (��������� �� ������� �����)
������� �������� (BS) 1/2 ����� (A+=mem[addr+BS])


��������: "��������" ������ (�� ���������): ���������� �������� ����� (2 ������) � ������������� � ��� ��������, ��������, AND 010 - �������� ���������� ��������� ������ ������ ����� �� 010 (�������� ���������) ��� ANDR 010 - ��������� �������� 010 �� ��� ������ ����� � ��������� ��������� � ������������. �����: ������ ����������� ������� ������ ������. ������: �������������� �������� ��� ������� � ������.

����� ���������:
10 rem determine and print the larger of two ints
20 input s
30 input t
40 if s >= t goto 70
50 print t
60 goto 99
70 print s
99 end


���������� �� ������:
������� ���������� (I = 0), ���������� (V = 99)
������ ���� ��������� ����
��������� ��� ��������� � ��������� ������� �������� �������� (����� ������/��� ����������, label/var, ��������������� ����� ������)
    ��� ������� ���������� label � ����������� ����������� ���������� ��� I
    ���� ����������, ��������� �� ����� V, ��������� V �� 1
    ����
    ���� ����� �������� ����������, ������ -01
����� �� ������� ��������

LITERAL: A = (|A|*100 + |val|) * sign(val)
GOSUB(s,1) 300
300 arg0, arg1
return arg0+1

���:
00 +1099
01 +1098
02 +2099
03 +3198
04 +4106
05 +4008
06 +1198
07 +4009
08 +1110
09 +4300

������� ��������:
"10" label 00
"20" label 00
"s" var 99
"30" label 01
"t" var 98
"40" label 02
"70" label 08
"50" label 06
"99" label 09
"70" label 08
"99" label 09
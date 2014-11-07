module vector;

import std.stdio, std.conv, std.string, std.traits;


T gcd(T)(T a, T b)
    if (__traits(compiles, {
        T a,b,c;
        c = a % b;
        bool d = to!bool(a);
    } ))
{
    if (!b) return a;
    while (a % b) {
        T c = a % b;
        a = b;
        b = c;
    }
    return b;
}


struct Vector2d {
private:
    long x, y;
public:
/*
    this(long x, long y) {
        this.x = x;
        this.y = y;
    }
*/

    Vector2d opBinary(string op)(Vector2d v)
    if (op == "%") {
        assert( isCollinear(v) );
        return Vector2d(this.x % v.x, this.y % v.y);
    }

    bool opCast(T)()
        if ( is(T == bool) )
    {
        return !(this.x == 0 && this.y == 0);
    }
    
    bool isCollinear(Vector2d v)
    {
        return (this.x * v.y - this.y * v.x) == 0;
    }

    string toString() {
        return "(" ~ to!string(this.x) ~ "," ~ to!string(this.y) ~ ")";
    }
}

void main() {
    Vector2d v1 = Vector2d(60, 12);
    Vector2d v2 = Vector2d(45, 9);

    writefln("GCD of %s and %s is %s", v1, v2, gcd(v1, v2));
}

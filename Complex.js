class Complex {
  constructor(aPrime, bPrime) {
    this.a = aPrime;
    this.b = bPrime;
  }
  
  Add(j) {
    this.a += j.a;
    this.b += j.b;
  }
  Sub(j) {
    a -= j.a;
    b -= j.b;
  }
  Mult(j) {
    let c = j.a;
    let d = j.b;
    let aPrime = this.a*c-this.b*d;
    let bPrime = this.a*d+c*this.b;
    this.a = aPrime;
    this.b = bPrime;
  }
  Square() {
    this.Mult(this);
  }
  Cube() {
    prime = new Complex(a,b);
    this.Mult(this);
    this.Mult(prime);
  }
  Magnitude() {
    c = sqrt((a*a)+(b*b));
    return c;
  }
  MagnitudeSqr() {
    return (this.a*this.a)+(this.b*this.b);
  }
}
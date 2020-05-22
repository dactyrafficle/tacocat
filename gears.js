var canvas;
var gearArray = [];
var x, y;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

var gear = function(x, y, r, n, b, d, w, s, red, green, blue, alpha) {
  this.x = x;
  this.xrelative = this.x/windowWidth;
  this.y = y;
  this.r = r;
  this.n = n;
  this.spoketheta = 360/(3*this.n);
  this.spokeHeight = s;
  this.b = b; // initial shift
  this.phi = 0; // angular position
  this.w = w;  // angular velocity
  this.direction = d; // clockwise or counterclockwise
  this.red = red;
  this.green = green
  this.blue = blue;
  this.alpha = alpha;
  this.speedMultiplier = 1;
}
gear.prototype.update = function() {
  this.x = this.xrelative*windowWidth;
};
gear.prototype.spin = function() {
    this.speedMultiplier = map(mouseX, 0, width, 0.25, 2);
    this.phi += this.w*this.speedMultiplier*this.direction;
};

gear.prototype.display = function() {
    noStroke();

    fill(this.red, this.green, this.blue, this.alpha);

    ellipse(this.x, this.y, this.r*2, this.r*2);
  
    for (var i = 0; i < this.n; i++) {
      var phi = (360/this.n*i+this.b+this.phi)*PI/180; // perfect!
      var phi1 = phi - this.spoketheta*PI/180;
      var phi2 = phi + this.spoketheta*PI/180;
      var phi3 = phi - this.spoketheta*0.5*PI/180;
      var phi4 = phi + this.spoketheta*0.5*PI/180;
      beginShape();
        vertex(this.x+this.r*cos(phi1), this.y+this.r*sin(phi1));
        vertex(this.x+(this.r+this.spokeHeight)*cos(phi3), this.y+(this.r+this.spokeHeight)*sin(phi3));
        vertex(this.x+(this.r+this.spokeHeight)*cos(phi4), this.y+(this.r+this.spokeHeight)*sin(phi4));
        vertex(this.x+this.r*cos(phi2), this.y+this.r*sin(phi2));
      endShape();
    }
  
};


function mouseClicked() {
  for (var i = 0; i < gearArray.length; i++) {
    gearArray[i].direction *= -1;
  }
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  
  x = width/2;
  y = height/2;
  
  gearArray.push(new gear(x, y, 100, 20, 0, 1, 1, 10, 255, 180, 0, 120));
  gearArray.push(new gear(x+150, y+150, 100, 20, 9, -1, 1, 10, 255, 180, 0, 120)); // dist 2.12*(avg_of_radii)
  gearArray.push(new gear(x+150, y-150, 100, 20, 9, -1, 1, 10, 255, 180, 0, 120)); // dist 2.12*(avg_of_radii)
  gearArray.push(new gear(x, y-300, 100, 20, 0, 1, 1, 10, 255, 180, 0, 120)); // dist 2.12*(avg_of_radii)
  gearArray.push(new gear(x, y, 40, 30, 0, 1, 1, 5, 56, 118, 140, 120));
  gearArray.push(new gear(x-(100+23)*2, y, 200, 150, 8, -1, 0.2, 5, 100, 200, 100, 120));
}

function draw() {
  background(255);
  
  gearArray[0].update();
  gearArray[1].x = gearArray[0].x + 150;
  gearArray[2].x = gearArray[0].x + 150;
  gearArray[3].update();
  gearArray[4].update();
  gearArray[5].x = gearArray[0].x -(100+23)*2;
  
  for (var i = 0; i < gearArray.length; i++) {
      gearArray[i].spin();
      gearArray[i].display();
  }
  
}
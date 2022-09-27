// A simple Particle class
let Branch = function (x, height, speed, color, p) {
  this.posX = x;
  this.height = height;
  this.canvasHeight = p.height;
  this.canvasWidth = p.width;
  this.speed = speed;
  this.color = color;
};

Branch.prototype.run = function (p) {
  this.update();
  this.display(p);
};

// Method to update position
Branch.prototype.update = function () {
  this.posX -= 1 * this.speed;
};

// Method to display
Branch.prototype.display = function (p) {
  p.stroke(this.color);
  p.line(this.posX, this.canvasHeight / 2, this.posX, this.height);
};

// Is the Branch still useful?
Branch.prototype.isDead = function () {
  return this.posX < 0;
};

export class BranchSystem {
  constructor(p) {
    this.branches = [];
  }
  addBranch(x, height, speed, color, p) {
    let branch = new Branch(x, height, speed, color, p);
    this.branches.push(branch);
    return branch;
  }
  setSpeed(speed) {
    this.branches.forEach((branch) => (branch.speed = speed));
  }
  run(p) {
    for (let i = this.branches.length - 1; i >= 0; i--) {
      let b = this.branches[i];
      b.run(p);
      if (b.isDead()) {
        this.branches.splice(i, 1);
      }
    }
  }
}

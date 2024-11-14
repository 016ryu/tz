class Bridge {
  constructor(num, radius, length) {
    this.bodies = []; 
    this.num = num; 
    this.radius = radius; 
    this.length = length;
    
    this.initialize();
  }
  
  initialize() {
    for (let i=0; i<this.num; i++) {
      this.bodies[i] = Bodies.circle(0, 0, this.radius);
    }

    this.chains = Composite.create();
    Composite.add(this.chains, this.bodies);
    let options = {
      stiffness: 1,
      length: this.length
    }
    Composites.chain(this.chains, 0, 0, 0, 0, options);
    Composite.add(engine.world, [this.chains]);
  }
  
  display() {
   //去处描线
    noStroke();
    
    for (let i=0; i<this.bodies.length; i++) {
      let x1 = this.bodies[i].position.x;
      let y1 = this.bodies[i].position.y;
      // 绘制白色圆
      fill(255);
      ellipse(x1, y1, this.radius * 2, this.radius * 2);

      // 每隔一个绘制红色圆
      if (i % 2 === 0) {// 只在偶数索引处绘制红色圆
        fill(255, 0, 0); // 红色
        ellipse(x1, y1, this.radius * 0.5, this.radius*0.5); // 比白色圆小一些的红色
      }

      let x2, y2;
      if (i < this.bodies.length - 1) {
        x2 = this.bodies[i + 1].position.x;
        y2 = this.bodies[i + 1].position.y;
        line(x1, y1, x2, y2);
      }    
    }
  }
}
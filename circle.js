;

function preload() {
  // 加载图片文件
  png = loadImage('144.png');
  
  // 加载 handPose 模型
  handPose = ml5.handPose({ maxHands: 2, flipped: true });
}

// Circle 类，使用自定义图片代替圆形
class Circle {
  constructor() {
    let x = width / 2;
    let y = 40;
    this.r = 40; // 设置半径，用于图片的大小
    this.done = false;

    // 创建一个 Matter.js 圆形物理体
    this.body = Bodies.circle(x, y, this.r, { restitution: 0.6, frictionAir: 0.04,  // 较小的空气摩擦力，减慢掉落速度
      density: 0.001       // 较低的密度，使物体轻一些 });
                                            });                                          

    // 设置初始速度
    let velocity = Vector.create(random(-1, 1), random(-1, 1));
    Body.setVelocity(this.body, velocity);

    // 将物理体添加到物理引擎的世界中
    Composite.add(engine.world, this.body);
  }
  
  display() {
    let pos = this.body.position;
    let angle = this.body.angle;

    // 在指定位置绘制旋转的图片
    push();
    translate(pos.x, pos.y);
    rotate(angle);  // 应用旋转角度
    imageMode(CENTER); // 让图片居中绘制
    image(png, 0, 0, this.r * 2, this.r * 2); // 使用图片绘制，大小设置为直径
    pop();
  }
  
  checkDone() {
    // 检查是否已超出屏幕底部
    if (this.body.position.y > height + this.r * 2) {
      this.done = true;
    } else {
      this.done = false;
    }
  }
  
  removeCircle() {
    // 从物理引擎的世界中移除此物理体
    Composite.remove(engine.world, this.body);
  }
}
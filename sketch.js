/*
----- Coding Tutorial by Patt Vira ----- 
Name: Interactive Bridge w Bouncing Balls (matter.js + ml5.js)
Video Tutorial: https://youtu.be/K7b5MEhPCuo

Connect with Patt: @pattvira
https://www.pattvira.com/
----------------------------------------
*/
var img;
var png;

function preload(){
  png=loadImage('144.png');
}

// ml5.js 
let handPose;
let video;
let hands = [];

const THUMB_MCP= 2;
const INDEX_FINGER_TIP= 8;

// Matter.js 
const {Engine, Body, Bodies, Composite, Composites, Constraint, Vector} = Matter;
let engine;
let bridge; let num = 11; let radius = 15; let length = 20;
let circles = [];

let colorPalette = ["#abcd5e", "#14976b", "#2b67af", "#62b6de", "#f589a3", "#ef562f", "#fc8405", "#f9d531"]; 

function preload() {
  // Load the handPose model
  handPose = ml5.handPose({maxHands: 2, flipped: true});
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the webcam video and hide it
  video = createCapture(VIDEO, {flipped: true});
  video.size(windowWidth, windowHeight);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
  
  engine = Engine.create();

  // 减小重力加速度，使物体掉落更慢
  engine.gravity.y = 5;
  
  engine = Engine.create();
 // 初始化两个桥对象
  bridgeLeft = new Bridge(num, radius, length);
  bridgeRight = new Bridge(num, radius, length)
}

function draw() {
  background(220);
  Engine.update(engine);
  strokeWeight(2);
  stroke(0);
  
  // Draw the webcam video
  image(video, 0, 0,video.width,video.height);
  
  if (random() < 0.04) {
    circles.push(new Circle());
  }
  
  for (let i=circles.length-1; i>=0; i--) {
    circles[i].checkDone();
    circles[i].display();
    
    if (circles[i].done) {
      circles[i].removeCircle();
      circles.splice(i, 1);
    }
    
  }
  // 检查是否检测到手，并为每只手分配一个桥
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let thumb = hand.keypoints[THUMB_MCP];
    let index = hand.keypoints[INDEX_FINGER_TIP];
    
    fill(0, 255, 0);
    noStroke();
    circle(thumb.x, thumb.y, 10);
    circle(index.x, index.y, 10);
    
    // 根据检测到的手的索引，选择对应的桥
    if (i === 0) { // 第一只手控制第一个桥
      bridgeLeft.bodies[0].position.x = thumb.x;
      bridgeLeft.bodies[0].position.y = thumb.y;
      bridgeLeft.bodies[bridgeLeft.bodies.length - 1].position.x = index.x;
      bridgeLeft.bodies[bridgeLeft.bodies.length - 1].position.y = index.y;
      bridgeLeft.display();
    } else if (i === 1) { // 第二只手控制第二个桥
      bridgeRight.bodies[0].position.x = thumb.x;
      bridgeRight.bodies[0].position.y = thumb.y;
      bridgeRight.bodies[bridgeRight.bodies.length - 1].position.x = index.x;
      bridgeRight.bodies[bridgeRight.bodies.length - 1].position.y = index.y;
      bridgeRight.display();
  }
  }
  
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;

}

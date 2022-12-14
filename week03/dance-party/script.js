// loading music tutorial from https://nishanc.medium.com/audio-visualization-in-javascript-with-p5-js-cf3bc7f1be07
// easing tutorial from https://p5js.org/examples/input-easing.html

let song, amp;
let circlingBall, ampBall, lines, mybox;
let bouncingBalls = [];

let myFont;

function preload() {
  // preload audio
  song = loadSound("audio/giorgui-cut.mp3");
  // preload font
  myFont = loadFont("fonts/PoiretOne-Regular.ttf");
}

function setup() {
  createCanvas(325, 325, WEBGL);

  // loop audio
  song.loop();
  amp = new p5.Amplitude();

  //Create objects
  for (let i = 0; i < 10; i++) {
    bouncingBalls.push(new Ball());
  }
  circlingBall = new Ball();
  ampBall = new Ball();
  myBox = new Box();
  lines = new LineGroup(40, 200);
}

function draw() {
  background(0);
  
  //display text if the music is not playing
  if(getAudioContext().state=='suspended'){
    push();
    textFont(myFont);
    textSize(20);
    fill('white');
    textAlign(CENTER, BOTTOM);
    text('click anywhere to play music', -width/2, height*0.4, width);
    pop();
  }

  
  let vol = amp.getLevel();

  // operate object methods
  bouncingBalls.forEach((ball) => {
    ball.bounce();
    ball.display();
  });
  circlingBall.circle(vol);
  circlingBall.display();
  ampBall.amplify(vol);
  ampBall.display();
  myBox.display();
  lines.amplify(vol);
  lines.display();
}

// Chrome 70 will require user gestures to enable web audio api > https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
// Click on the web page to start audio 
function touchStarted() {
  getAudioContext().resume();   
}

// loading music tutorial from https://nishanc.medium.com/audio-visualization-in-javascript-with-p5-js-cf3bc7f1be07
// easing tutorial from https://p5js.org/examples/input-easing.html
// sound tracks from artist Helios, aquired from http://unseen-music.com/yume/loops/trimmed/

let ambient, drums, tune, passage, ambientAmp, drumsAmp, tuneAmp, passageAmp;
let circlingBall, ampBall, lines, mybox;
let bouncingBallUI, lineUI, circlingBallUI, boxUI;
let bouncingBalls = [];
let isPlaying;

let myFont;

function preload() {
  // preload audio
  ambient = loadSound("audio/ambient01.mp3");
  drums = loadSound("audio/drums01.mp3");
  tune = loadSound("audio/tune01.mp3");
  passage = loadSound("audio/passage01.mp3");

  // preload font
  myFont = loadFont("fonts/PoiretOne-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // setup audio
  isPlaying = false;
  ambientAmp = new p5.Amplitude(0.9); // smoothing = 0.9
  ambientAmp.setInput(ambient);
  drumsAmp = new p5.Amplitude(0.9);
  drumsAmp.setInput(drums);
  tuneAmp = new p5.Amplitude(0.9);
  tuneAmp.setInput(tune);
  passageAmp = new p5.Amplitude(0.9);
  passageAmp.setInput(passage);

  // Create objects
  for (let i = 0; i < 10; i++) {
    bouncingBalls.push(new Ball());
  }
  circlingBall = new Ball();
  ampBall = new Ball();
  myBox = new Box();
  lines = new LineGroup(40, 50);

  // Create UI
  bouncingBallUI = new BouncingBallUI(width / 6, height / 3, 15, height / 8);
  lineUI = new LineUI(width / 6, (height * 2) / 3, 15, height / 8);
  circlingBallUI = new CirclingBallUI(
    (width * 5) / 6,
    height / 3,
    height / 16, // track radius
    7 // ellipse radius
  );
  boxUI = new BoxUI(
    (width * 5) / 6,
    (height * 2) / 3,
    height / 10, // box width
    7 // indicator size (length)
  );
}

function draw() {
  background(0);

  //display text if the music is not playing
  push();
  textFont(myFont);
  textSize(20);
  fill("white");
  textAlign(CENTER, BOTTOM);
  if (!isPlaying) {
    text("click anywhere to open music box", -width / 2, height * 0.4, width);
  } else {
    text("click anywhere to close music box", -width / 2, height * 0.4, width);
  }
  pop();

  // control volumn through GUIs
  ambient.amp(map(lineUI.lineY, 473, 620, 1.5, 0));
  drums.amp(map(circlingBallUI.ellipseY, 216, 331, 1, 0));
  tune.amp(map(bouncingBallUI.ellipseY, 239, 328, 1, 0));
  passage.amp(
    map(boxUI.movement, -boxUI.h / 2 + boxUI.r, boxUI.h / 2 - boxUI.r, 1, 0)
  );

  // get indivisual sound track volumn
  let ambientVol = ambientAmp.getLevel();
  let drumsVol = drumsAmp.getLevel();
  let tuneVol = tuneAmp.getLevel();
  let passageVol = passageAmp.getLevel();

  // operate UI methods
  bouncingBallUI.interact(); // controls tune
  bouncingBallUI.display();
  lineUI.interact(); // controls ambient
  lineUI.display();
  circlingBallUI.interact(); // controls drums
  circlingBallUI.display();
  boxUI.interact(); // controls passage
  boxUI.display();

  // operate object methods
  lines.amplify(ambientVol, lineUI.lineY); // visualizes ambient
  lines.display();
  bouncingBalls.forEach((ball) => {
    ball.bounce(tuneVol, bouncingBallUI.ellipseY); // tune
    ball.display();
  });
  circlingBall.circle(drumsVol, circlingBallUI.ellipseY); // drums
  circlingBall.display();
  ampBall.amplify(drumsVol, circlingBallUI.ellipseY); // drums
  ampBall.display();
  myBox.display(boxUI.movement); // passage
}

// Chrome 70 will require user gestures to enable web audio api > https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
// Click on the web page to start audio
function touchStarted() {
  isPlaying = !isPlaying;
  if (!isPlaying) {
    pauseSoundTracks();
  } else {
    loopSoundTracks();
  }
  console.log(isPlaying);
}

function loopSoundTracks() {
  ambient.loop();
  drums.loop();
  tune.loop();
  passage.loop();
}

function pauseSoundTracks() {
  ambient.pause();
  drums.pause();
  tune.pause();
  passage.pause();
}

song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
song1status = "";
song2status = "";

function preload() {
    song1 = loadSound("lefthand.mp3");
    song2 = loadSound("righthand.mp3");
}

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  posenet = ml5.poseNet(video, modelLoaded);
  posenet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1status = song1.isPlaying();
    song2status = song2.isPlaying();
  fill("red");
  stroke("red");
  if (scoreLeftWrist > 0.2) {
      circle(leftWristX, leftWristY, 20);
      song2.stop();
      if (song1status==false) {
          song1.play();
          document.getElementById("song").innerHTML =
            "Playing: The Spectre - Alan Walker";
      }
    }
  if (scoreRightWrist > 0.2) {
      circle(rightWristX, rightWristY, 20);
      song1.stop();
      if (song2status == false) {
        song2.play();
        document.getElementById("song").innerHTML =
          "Playing: Santa tells me - Ariana Grande";
      }
  }
}

function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}

function modelLoaded() {
  console.log("Posenet is Initialized!");
}

function gotPoses(Results) {
  if (Results.length > 0) {
    console.log(Results);
    leftWristX = Results[0].pose.leftWrist.x;
    leftWristY = Results[0].pose.leftWrist.y;
    console.log("leftWristX=" + leftWristX + "leftWristY=" + leftWristY);
    rightWristX = Results[0].pose.rightWrist.x;
    rightWristY = Results[0].pose.rightWrist.y;
    console.log("rightWristX=" + rightWristX + "rightWristY=" + rightWristY);
    scoreRightWrist = Results[0].pose.keypoints[10].score;
    scoreLeftWrist = Results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist=" + scoreRightWrist);
    console.log("scoreLeftWrist=" + scoreLeftWrist);
  }
}

function stop() {
  song.pause();
}


songstatus = "";
song2 = "";
song1 = "";
leftwristx = 0;
leftwristy = 0;

rightwristx = 0;
rightwristy = 0;

scorerightwrist = 0;
scoreleftwrist = 0;
function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video,modelloaded);
    posenet.on("pose",gotposes);
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("left wrist score = "+ scoreleftwrist);

        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("right wrist score = "+ scorerightwrist);

        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        console.log("leftwristx = " + leftwristx + "leftwristy = " + leftwristy);

        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("rightwristx = " + rightwristx + "rightwristy = " + rightwristy);
    }
}

function modelloaded(){
    console.log("model is initialized");
}

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("FF0000");
    songstatus = song1.isPlaying() ;
    if(scoreleftwrist > 0.2){
        circle(leftwristx,leftwristy, 20);
        song2.stop();
        if(songstatus == true){
            song1.play();
            document.getElementById("songname").innerHTML = "song1isplaying";
        }
    }

    if(scorerightwrist > 0.2){
        circle(rightwristx, rightwristy, 20);
        song1.stop();
        if(songstatus == false){
            song2.play();
            document.getElementById("songname").innerHTML = "song2isplaying";
        }
    }

}

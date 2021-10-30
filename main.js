status = "";
object = [];

audio = "";

function preload() {
    audio = loadSound("yeet.mp3");
}

function setup() {
    canvas = createCanvas(380, 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objDetect = ml5.objectDetector('cocossd', loaded);
}

function draw()  {
    image(video, 0, 0, 380, 300);
    
    if (status != "") {
        objDetect.detect(video, gotResult);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "STATUS: OBJECT DETECTED";

            r = random(255);
            g = random(255);
            b = random(255);

            fill(r, g, b);
            stroke(r, g, b);
            strokeWeight(1);
            percent = floor(object[i].confidence * 100);
            text("NAME = " + object[i].label + ", CONFIDENCE = " + percent, object[i].x, object[i].y - 10);
            noFill();
            strokeWeight(2);
            rect(object[i].x, object[i].y, object[i].width, object[i].height, 10);
        }

        if (object.length > 0) {
            audio.setVolume(1);
            audio.rate(0.9);
            audio.play();

            document.getElementById("statusB").innerHTML = "BABY DETECTED";
        } else {
            audio.stop();
            document.getElementById("statusB").innerHTML = "BABY NOT DETECTED";
        }
    }
}

function loaded() {
    console.log("model loaded");
    status = true;
    objDetect.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        object = results;
    }
}
// Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/90SoxnKhs/';

  // Video
  let capture;
  let flippedVideo;
  // To store the classification
  let label = "";

  let ratio;

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
    createCanvas(windowWidth, windowHeight);
    // Create the video
    video = createCapture({
     video: {
         facingMode: {
          exact: "environment"
        }
     }
   });
    video.size(windowWidth, windowHeight);
    video.elt.setAttribute('playsinline',true);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(150);
    // Draw the video
    image(video, 0, 0, width, width * video.height / video.width);

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    console.log("classify ????")

    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }

    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();

  }

$(document).ready(function(){

/*
var video = document.querySelector("#video");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}
*/

$(".usage-gps-role").hide();

$(".apu-image-1").hide();
$(".apu-image-2").hide();
$(".apu-image-3").hide();

$(".accelerometre").on('click', function(){
  $(".usage-gps-role").toggle();
  $(".accelerometre").toggleClass("usage-composants-selected");
  $(".accelerometre span").toggleClass("usage-composants-selected");
})

$("#slider").slider({
  orientation: "vertical",
  range: "min",
  min: 0,
  max: 100,
  value: 100,
  step: 100/3,
  change: function(event, ui) {
        console.log(ui.value);
        if(ui.value>67){
          $(".apu-image-1").hide();
          $(".apu-image-2").hide();
          $(".apu-image-3").hide();
        }
        if(ui.value<67 && ui.value>66){
          $(".apu-image-1").show();
          $(".apu-image-2").hide();
          $(".apu-image-3").hide();
        }
        if(ui.value<34 && ui.value>33){
          $(".apu-image-1").hide();
          $(".apu-image-2").show();
          $(".apu-image-3").hide();
        }
        if(ui.value<33){
          $(".apu-image-1").hide();
          $(".apu-image-2").hide();
          $(".apu-image-3").show();
        }
    }
})
})

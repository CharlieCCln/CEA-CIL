// Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/90SoxnKhs/';

  // Video
  let capture;
  let flippedVideo;
  // To store the classification
  let label = "";
  let labels = {};
  let listenCount = 0;
  let listenCountMax = 60;

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
    //video.elt.setAttribute('playsinline');
    //video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(0);
    // Draw the video
    image(video, 0, 0, width, width * video.height / video.width);

    if(label == "Vide"){
      $(".composant").hide();
      $(".usage").hide();
    }
    if(label == "Apu"){
      $(".usage").hide();
      $(".composant").show();
    }
    if(label == "Gps"){
      $(".composant").hide();
      $(".usage").show();
    }
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
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
    if (labels[results[0].label] == undefined) {
    labels[results[0].label] = 0;
  }

  labels[results[0].label]++;
  listenCount++;

  if (listenCount >= listenCountMax) {
    let most = 0;
    Object.keys(labels).forEach(l => {
      if (labels[l] >= most) {
        label = l;
      }
    });

    listenCount = 0;
    labels = {};
  }
    console.log(label);
    console.log("bonjour");
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

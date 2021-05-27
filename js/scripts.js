/* ----- P5JS TEACHABLE MACHINE ----- */

// Classifier Variable
  let classifier;
  // Teachable Machine Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/lIAiQGGPl/';

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

    // Flip the video (not necessary for tablet)
    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(0);
    // Draw the video
    image(video, 0, 0, width, width * video.height / video.width);

    // Show the interface according to which card is detected
    if(label == "vide"){
      $(".composant").hide();
      $(".usage").hide();
    }
    if(label == "apu"){
      $(".usage").hide();
      $(".composant").show();
    }
    if(label == "gps"){
      $(".composant").hide();
      $(".usage").show();
    }
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    classifier.classify(video, gotResult);
    flippedVideo.remove();

  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }

    console.log(results);

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

    console.log(labels);

    listenCount = 0;
    labels = {};
  }
    console.log(label);
    console.log("bonjour");
    // Classifiy again!
    classifyVideo();

  }

  /* ----- JQUERY & JQUERY UI INTERFACES ----- */

$(document).ready(function(){

$(".role-apu").hide();
$(".fonctionnement-apu").hide();
$(".innovations-apu").hide();
$(".usage-gps-role").hide();
$(".apu-image-1").hide();
$(".apu-image-2").hide();
$(".apu-image-3").hide();

// Mode "Composant" : click to open
$(".role").on('click', function(){
  $(".role-apu").toggle();
  $(".role").toggleClass("info-open");
})
$(".fonctionnement").on('click', function(){
  $(".fonctionnement-apu").toggle();
  $(".fonctionnement").toggleClass("info-open");
})
$(".innovations").on('click', function(){
  $(".innovations-apu").toggle();
  $(".innovations").toggleClass("info-open");
})

// Mode "Composant" : click to open (images)
$(".apu-image-1").on('click', function(){
  $(".apu-image-1").toggleClass("apu-image-1-open");
})

$(".apu-image-2").on('click', function(){
  $(".apu-image-2").toggleClass("apu-image-2-open");
})

$(".apu-image-3").on('click', function(){
  $(".apu-image-3").toggleClass("apu-image-3-open");
})

// Mode "Usage" : click to open
$(".accelerometre").on('click', function(){
  $(".usage-gps-role").toggle();
  $(".accelerometre").toggleClass("usage-composants-selected");
  $(".accelerometre span").toggleClass("usage-composants-selected");
})

// Mode "Composant" : slider
$("#slider").slider({
  orientation: "vertical",
  range: "min",
  min: 0,
  max: 100,
  value: 100,
  stop: function(event, ui) {
        console.log(ui.value);
        if(ui.value>75){
          // slider on top : show nothing
          $(".apu-image-1").hide();
          $(".apu-image-2").hide();
          $(".apu-image-3").hide();
          $("#slider").slider("value", 100);
        }
        if(ui.value<75 && ui.value>50){
          // slider at 1/3 : show image 1
          $(".apu-image-1").show();
          $(".apu-image-2").hide();
          $(".apu-image-3").hide();
          $("#slider").slider("value", 2*(100/3));
        }
        if(ui.value<50 && ui.value>25){
          // slider at 2/3 : show image 2
          $(".apu-image-1").hide();
          $(".apu-image-2").show();
          $(".apu-image-3").hide();
          $("#slider").slider("value", 100/3);
        }
        if(ui.value<25){
          // slider on bottom : show image 3
          $(".apu-image-1").hide();
          $(".apu-image-2").hide();
          $(".apu-image-3").show();
          $("#slider").slider("value", 0);
        }
    }
})
})

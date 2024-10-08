prediction_1 = "" ;
prediction_2 = "" ;

Webcam.set({
  width: 350, 
  height: 300,
  image_format: 'png',
  png_quality: 100
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="image" src="'+ data_uri +'">';
    });
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/SEXL_chHv/model.json', modelLoaded);

function modelLoaded(){
    console.log('model is loaded');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_1_data = "The first prediction is " + prediction_1;
    speak_2_data = "The second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_1_data + speak_2_data);
    synth.speak(utterThis);
}

function predictemotion(){
    img = document.getElementById('image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name_1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if (results[0].label == "Happy"){
            document.getElementById("emoji1").innerHTML = "&#128512;";
        }
        if (results[0].label == "Angry"){
            document.getElementById("emoji1").innerHTML = "&#128545;";
        }
        if (results[0].label == "Sad"){
            document.getElementById("emoji1").innerHTML = "&#128532;";
        }
        if (results[1].label == "Happy"){
            document.getElementById("emoji2").innerHTML = "&#128512;";
        }
        if (results[1].label == "Angry"){
            document.getElementById("emoji2").innerHTML = "&#128545;";
        }
        if (results[1].label == "Sad"){
            document.getElementById("emoji2").innerHTML = "&#128532;";
        }
    }
}

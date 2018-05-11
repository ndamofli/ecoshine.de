//VARIOUS CORDOVA CONTROLS
function updateApp(){
  if(window.android){
    window.open("market://details?id=app.streammm.io","_system");//change url
  }else{
    window.open('itms-apps://itunes.apple.com/app/id1078634352');
  }
}
window.updateApp = updateApp;

function onConfirm(buttonIndex) {
  if(buttonIndex == 1){ 
    StreammmAnalytics('event','Rate',languageObj.globalLng);
    if (globalObj.hasPlugins){
	  window.localStorage.setItem('isRated', true);
	  window.isRated = true;
      if(window.android){
        window.open("market://details?id=app.streammm.io","_system");//change url
      }else{
        window.open('itms-apps://itunes.apple.com/app/id1078634352');
      }
    }
  }
}

function rateAiwn() {
  if(navigator.notification && navigator.notification.confirm) {
    navigator.notification.confirm(
      languageObj.rateMessage,
      onConfirm,
      languageObj.rateTitle,
      [languageObj.rateBtn,languageObj.rateLater]
    );
  }
}

function showMessage(title, message, callback) {
  title = title || "You are offline";
  message = message || "Trying to connect again";	
  callback = callback || null;	
  var buttonName = 'Ok';
  if(navigator.notification && navigator.notification.alert) {
    navigator.notification.alert(
      message,
      callback,
      title,
      buttonName
    );
  } else {
    alert(title);
  }
}

window["speechRecognition"] = {
    hasPermission: function(){
        return new Promise(function(resolve, reject){
            window.plugins.speechRecognition.hasPermission(function (isGranted){
                resolve(isGranted);
            }, function(err){
                reject(err);
            });
        });
    },
    requestPermission: function(){
        return new Promise(function(resolve, reject){
            window.plugins.speechRecognition.requestPermission(function (){
                resolve();
            }, function (err){
                reject();
            });
        });
    },
    startRecognition: function(settings){
        return new Promise(function(resolve, reject){
            window.plugins.speechRecognition.startListening(function(result){
                resolve(result);
            }, function(err){
                reject(err);
            }, settings);
        });
    },
    getSupportedLanguages: function(){
        return new Promise(function(resolve, reject){
            window.plugins.speechRecognition.getSupportedLanguages(function(result){
                resolve(result);
            }, function(err){
                reject(err);
            });
        });
    },
    isRecognitionAvailable: function(){
        return new Promise(function(resolve, reject){
            window.plugins.speechRecognition.isRecognitionAvailable(function(available){
                resolve(available);
            }, function(err){
                reject(err);
            });
        });
    },
    stopListening: function(){
        return new Promise(function(resolve, reject){
            window.plugins.speechRecognition.stopListening(function(){
                resolve();
            }, function(err){
                reject(err);
            });
        });
    }
};

function terminateRec(){
  if (window.voiceTimer) {
    clearTimeout( window.voiceTimer);
  }
  window.plugins.NativeAudio.play( 'closeAi' );
  botObj.aiMic.classList.remove('recording');
  window.speechRecognition.stopListening();
}
function voiceRec(){
  if(!globalObj.hasPlugins){
    return;
  }
  if(botObj.voiceRecording){
    terminateRec();
    return;
  }
  botObj.aiMic.classList.add('recording');
  window.plugins.NativeAudio.play( 'openAi' );
  aiVoice("","en-US");
  window.streammmType = new streammmTyper({strings : languageObj.aiRec, type : 'botInfo'});
  botObj.voiceRecording = true;
  botObj.voiceResponse = false;

  if (window.voiceTimer) {
    clearTimeout( window.voiceTimer);
  }
  window.voiceTimer = setTimeout(function () {
    terminateRec();
  }, 6000);

  window.speechRecognition.isRecognitionAvailable().then(function(available){
    if(available){
      return window.speechRecognition.hasPermission();
    }
  }).then(function(hasPermission){
    function startRecognition(){
        return window.speechRecognition.startRecognition({
            language:"en-US",
            showPopup: false,
			showPartial :false,
            matches: 1 
  
        }).then(function(data){
          if(botObj.voiceRecording){
            botObj.voiceResponse = String(data);
            if(!botObj.voiceResponse || botObj.voiceResponse == ""){
              botObj.voiceRecording = false;
              return;
            }
            submitAi(botObj.voiceResponse);
//            window.streammmType = new streammmTyper({strings : [String(data)], type : 'botInfo'});
		  }
		  botObj.voiceRecording = false;
        }).catch(function(err){
          window.streammmType = new streammmTyper({strings : languageObj.aiErr, type : 'botInfo'});			
          botObj.voiceRecording = false;
            //alert("error"+err);
            //console.error(err);
        });
    }

    if(!hasPermission){
        window.speechRecognition.requestPermission().then(function(){
            startRecognition();
        }).catch(function(err){
          window.streammmType = new streammmTyper({strings : languageObj.aiPermission, type : 'botInfo'});
          //console.error("Cannot get permission", err);
        });
    }else{
        startRecognition();
    }
}).catch(function(err){
  aiRespond("Didn't quite get that...");
  window.streammmType = new streammmTyper({strings : languageObj.aiVoiceErr, type : 'botInfo'});
    //console.error(err);
});
}
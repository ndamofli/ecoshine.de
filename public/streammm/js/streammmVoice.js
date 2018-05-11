var voiceObj = {};
voiceObj.speech = true,
voiceObj.speechRate = 1,
voiceObj.voiceFinished = true;

window.stopVoice = function(){};
window.aiVoice = function(){};

var ios6 = navigator.userAgent.match(/OS 6_[0-9_]+ like Mac OS X/i) !== null;
var ios7 = navigator.userAgent.match(/OS 7_[0-9_]+ like Mac OS X/i) !== null;
var ios8 = navigator.userAgent.match(/OS 8_[0-9_]+ like Mac OS X/i) !== null;
var ios9 = navigator.userAgent.match(/OS 9_[0-9_]+ like Mac OS X/i) !== null;
var ios10 = navigator.userAgent.match(/OS 10_[0-9_]+ like Mac OS X/i) !== null;
var ios11 = navigator.userAgent.match(/OS 11_[0-9_]+ like Mac OS X/i) !== null;

if(ios9 || ios10 || ios11) {
  voiceObj.speechRate = 1;
}

function toggleSound(){
  if(voiceObj.speech){
    window.streammmType = new streammmTyper({strings : ["Voice off^1000"], type : 'notification', wait : true, returnToInfo : true});
    stopVoice();
    voiceObj.speech = false;
	voiceObj.voiceFinished = true;
    StreammmAnalytics('event','VoiceOn',languageObj.globalLng);
  }else{
    window.streammmType = new streammmTyper({strings : ["Voice on^1000"], type : 'notification', wait : true, returnToInfo : true});
	voiceObj.speech = true;
    voiceObj.voiceFinished = true;
    StreammmAnalytics('event','VoiceOff',languageObj.globalLng);
  }
  _superStreammm();
  window.localStorage.setItem('userVoice', voiceObj.speech);
}

function voiceInit(){
  if(globalObj.hasPlugins){
    // PLUGIN
    window.plugins.tts.startup(function(){
      voiceObj.voiceFinished = true;
      window.plugins.tts.pitch(0.5,null,null);
      window.plugins.tts.speed(voiceObj.speechRate,null,null);
    },function(){voiceObj.speech = false;});
	
    window.aiVoice = function(text,lang){
      if(voiceObj.speech){
        voiceObj.voiceFinished = false;
        window.plugins.tts.setLanguage(lang,null,null);
        window.plugins.tts.speak(text, 
          function () { 
            voiceObj.voiceFinished = true;
          },
          function () {
            voiceObj.voiceFinished = true;
          }
        );
      }
    }

    window.stopVoice = function(){
      window.plugins.tts.stop();
    }
	
  }else{
    // SpeechSynthesisUtterance
    voiceObj.speech = true;
    voiceObj.voiceFinished = true;
    window.SpeechSynthesisUtterance = window.webkitSpeechSynthesisUtterance  || window.SpeechSynthesisUtterance;
    var sayit = function ()	{
      var msg = new window.SpeechSynthesisUtterance();
      msg.voiceURI = 'native';
      msg.volume = 1;
      msg.pitch = 1;
      msg.rate = voiceObj.speechRate;
      msg.addEventListener('end', function () {
       voiceObj.voiceFinished = true;
      })
      return msg;
    }
	
    window.aiVoice = function(text,lang){
      if(voiceObj.speech){
        voiceObj.voiceFinished = true;
        window.speechSynthesis.cancel();
        var sentences = text.split(".");
        for (var i=0;i<sentences.length;i++){
          if(sentences[i].length > 5){
            var toSay = sayit();
            toSay.text = sentences[i];
            toSay.lang = lang;
			//console.log(lang);
			if(lang == "en-US"){
              toSay.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Google US English"; })[0];
			}
           window.speechSynthesis.speak(toSay);
          }
        }
      }
    }

    window.stopVoice = function(){
      var stopVoice = new SpeechSynthesisUtterance(" ");
      speechSynthesis.speak(stopVoice);
    }
  }
  
}
var dataObj = {};
var globalObj = {};
globalObj.hasPlugins = false,
globalObj.logoHolder = document.getElementById('logoHolder'),
globalObj.logoMover = document.getElementById('logoMover'),
globalObj.streammmPlaylist = document.getElementById('streammmPlaylist');

var sliderObj = {};
sliderObj.started = false,
sliderObj.pause = false;

//window.localStorage.clear();

window.onerror = function(a, b, c) {
  alert(a + ", " + b + ", " + c);
};

globalObj.streammmPlaylist.addEventListener('tap', function(e){
  e.preventDefault();
  e.stopPropagation();
  filterMenuCreate();
}, false);
  
function streammmHide(){
  globalObj.logoHolder.style.display = 'none';
  txtObj.titleWrap.style.display = 'none';
  globalObj.streammmPlaylist.style.display = 'none';
}

function streammmShow(){
  globalObj.logoHolder.style.display = 'block';
  txtObj.titleWrap.style.display = 'block';
  globalObj.streammmPlaylist.style.display = 'block';
}

function aiLoader(show){
  if(show){
    stopVoice();
    if(botObj.textReply){
      window.streammmType = new streammmTyper({strings : botObj.textReply, type : 'loader', wait : true});
      aiVoice(botObj.voiceReply,"en-US");
      return;
    }
    if(window.currentGroup === 0 && !sliderObj.started){
      window.streammmType = new streammmTyper({strings : ["Streammm^1000", "Please wait^1000"], type : 'loader', wait : true});
//      aiVoice("Stream. Please wait","en-US");
    }else{
	  var tXt = window.aiMsgs[0];
	  arrayRotate(window.aiMsgs,1);
	  var tXtString = tXt.toString();
	  aiVoice(tXtString,"en-US");
	  tXtString = tXtString+" ^2000"
      window.streammmType = new streammmTyper({strings : [tXtString], type : 'loader', wait : true});
    }
  }
}

/*
sliderObj.swiper.on('onTouchEnd', function (s,ev) {
  //resetManual();
  window.streammmTxt.resume();
  if(sliderObj.pause){
	return;
  }
});*/


function nXt(){
  if(sliderObj.pause){
    return;
  }
//  if(voiceObj.voiceFinished === true && window.streammmApp.isBurnsComplete()){
  if(voiceObj.voiceFinished === true){
    window.streammmApp.nextSlide();
  }else{
    TweenLite.killDelayedCallsTo(nXt);
    TweenLite.delayedCall(1, nXt);
  }
}

function streammmPause(){
  TweenLite.killDelayedCallsTo(nXt);
  sliderObj.pause = true;
  streammmHide();
  stopVoice();
  //heeree here window.streammmTxt.pause();
  TweenLite.killDelayedCallsTo(nXt);
}

function streammmResume(reloads){
  if(reloads == undefined) {
    reloads = false;
  }
  sliderObj.pause = false;
  streammmShow();
  if(!reloads){
    _superStreammm();
  }
}

window.streammmResume = streammmResume;
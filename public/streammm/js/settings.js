var settingsObj = {};
settingsObj.userTags = [];
settingsObj.userHeadlines = false;

function loadSettings(){
  if(window.localStorage.getItem('isRated')){
    window.isRated = JSON.parse(window.localStorage.getItem('isRated'));
  }else{
    window.isRated = false;
  }
  if(window.localStorage.getItem('userTags')){
    settingsObj.userTags = JSON.parse(window.localStorage.getItem('userTags'));
  }else{
    settingsObj.userTags = [];
  }
  if(window.localStorage.getItem('userHeadlines')){
    settingsObj.userHeadlines = JSON.parse(window.localStorage.getItem('userHeadlines'));
  }else{
    settingsObj.userHeadlines = false;
  }
  if(window.localStorage.getItem('userVoice')){
    voiceObj.speech = JSON.parse(window.localStorage.getItem('userVoice'));
  }else{
    voiceObj.speech = true;
  }
}

function toggleHeadlines(){
  if(settingsObj.userHeadlines){
    settingsObj.userHeadlines = false;
	window.streammmType = new streammmTyper({strings : ["Full story mode^1000"], type : 'notification', wait : true, returnToInfo : true}); 
  }else{
    settingsObj.userHeadlines = true;
	window.streammmType = new streammmTyper({strings : ["Headlines mode^1000"], type : 'notification', wait : true, returnToInfo : true}); 
  }
  window.streammmApp.setFastForward(settingsObj.userHeadlines);
  window.streammmApp.resetTextModule();
  window.streammmApp.restartTextModule();  
  
  _superStreammm();
  window.localStorage.setItem('userHeadlines', settingsObj.userHeadlines);
  StreammmAnalytics('event','HeadLines',settingsObj.userHeadlines);
}
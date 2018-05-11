//;( function( window ) {
//	'use strict';

var currentSlide, streammmApp, ajaxCounter;
window.version = "3.0.3",
window.streamArray = [];
// instantiate the slider
window.streammmApp = new StreammmSlider("main-render");
var size = window.streammmApp.getScreenSize();
window.displayWidth = size.w;
window.displayHeight = size.h;
setTextSize();

window.currentGroup = 0;
// local method to construct the request data
// and update the group number
function constructRequest(init){
  if(typeof init == "undefined"){
    init = false;
  }
  if(init === true || init === "update"){
    window.currentGroup = 0;
  }
  if(init === "update"){
    window.currentGroup = 0;
    window.streammmApp.destroySlider();
  }
  if(init === false){
    window.currentGroup = window.streammmApp.getCurrentGroup();
  }

  aiLoader(true);

  resetUi();

  StreammmAnalytics('event','Server','API call');
  if(window.currentGroup == 6 && window.isRated === false){
    rateAiwn();
  }
  ajaxCounter = 0;
  streammmAjax(init);
}

window.constructRequest = constructRequest;

function resetUi(){
  if(window.streamArray.length > 0){
    window.streamArray = null;
    window.streamArray = [];
  }
  streammmHide();
  if(window.streammmMenu !== null){
    window.streammmMenu.dismiss();
  }
  if(window.streammmTxt !== null){
    window.streammmTxt.pause();
  }
  txtObj.titleText.innerHTML = '';
  sliderObj.pause = false;  
  TweenLite.killDelayedCallsTo(nXt);
  botObj.textReply = false;
  botObj.voiceReply = false;
  sliderObj.started = false;
}

function streammmAjax(init){
  var aiData = {
    group_number: window.currentGroup || 0,
    init: init,
    userTags: settingsObj.userTags,
    filterVal: filterObj.filterVal,
    token: "!22330)streammm",
    version: window.version,
    aisearch:window.aisearch
  };
  return reqwest({
    url: 'http://aiwn.io/streammm_301/',
//    url:"http://192.168.0.10/streammm_api_tags/new/",
    type: 'json',
    method: 'post',
	contentType: 'application/json',
    data: aiData,
    crossOrigin: true,
    withCredentials: true,
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    error: retryAjax,
    success: streammmStart
  });
}

function retryAjax(){
  TweenLite.delayedCall(1, streammmAjax);
  ajaxCounter++;
//  if(ajaxCounter == 5){
    window.streammmType = new streammmTyper({strings : ["You are offline.^1000"], type : 'loader', loop : true});
    StreammmAnalytics('event','Server','API connection error');
//  }
}

function streammmStart(alldata) {
  function checkFinished(){
    if (!streammmTyperObj.isFinished || voiceObj.voiceFinished !== true){
      TweenLite.delayedCall(1, checkFinished);
	  return;
    }else{
      goAhead();
	}
  }
  checkFinished();

  function goAhead(){
    //Firebase
    if(firebaseObj.enabled){
      if(window.currentGroup !== 0){
        alldata.slides = firebaseObj.data.concat(alldata.slides);
	  }
	  firebaseObj.data = [];
	}
    var data = [];
    data = alldata.slides;
    var sets = [];
    sets = alldata.settings;

	if(typeof sets !== "undefined"){
      if(sets['init'] == "true"){
        window.aisearch = "";
        filterObj.filterVal = "all";
        globalObj.streammmPlaylist.innerHTML = "PLAYING ALL";
      }
      if(sets['ads'] == "false"){
        adsObj.adsEnabled = false;
      }
      if(sets['update'] == "true"){
        showMessage("Update Streammm", "Please update to enjoy Streammmm", updateApp);
        return;
      }
      if(sets['maintenance'] == "true"){
        showMessage("Maintenance Break", "Please try again in a while", constructRequest);
        return;
      }
      if(typeof sets['tags'] !== 'undefined'){
		for(var i = 0; i < sets['tags'].length; i++) {
          tagMenuObj.tags.push({name:sets['tags'][i]['name'], id:sets['tags'][i]['id']})
        }
      }
	}
	if(alldata.aiMsgs){
      window.aiMsgs = alldata.aiMsgs;
	}
    if(data.length < 1){
      window.aisearch = "";
      filterObj.filterVal = "all";
      globalObj.streammmPlaylist.innerHTML = "PLAYING ALL";
      botObj.textReply = ['Feed ended. Now playing all topics.^1500'];
	  botObj.voiceReply = 'Feed ended. Now playing all topics.';
	  constructRequest("update");
      return;
    }

	streammmShow();
	
	globalObj.logoMover.innerHTML = '';
    globalObj.logoMover.style.transform = 'translateY(0px)';
	var logos = "";
    for(var i = 0; i < data.length; i++) {
      streamArray.push(data[i]);
	  var slideId = i+1;
	  logos += '<div class="logoBg" style="background-color:'+data[i].logoColor+'; background-image:url('+data[i].slideLogo+');"></div>';
    }
	globalObj.logoMover.innerHTML = logos;
	
    sliderObj.started = true;
	
    data = null;
    sets = null;
    aiLoader(false);
    window.streammmApp.createSlider(alldata);
  }
}


function textTap(){
  //console.log("textTap");
  if(window.streammmMenu !== null){
    window.streammmMenu.dismiss();
  }
  if(!sliderObj.started){
    return;
  }
  if (typeof window.plugins !== 'undefined'){
    window.streammmType = new streammmTyper({strings : languageObj.paused, type : 'botInfo', loop: true});
    streammmPause();
    var ref = window.open(dataObj.links, '_blank', 'location=no');
    ref.addEventListener('exit', function (){
      streammmResume(false);
    }, false);
  }else{
    var ref = window.open(dataObj.links, '_blank', 'location=no');
  }
  StreammmAnalytics('event','Readmore',dataObj.links);
}

function doubletap( c ){
  //console.log("doubletap");
  if(window.streammmMenu === null && sliderObj.started){	  
    var top = c.y;
    var left = c.x;
    if(left < 96){
      left = 0;
    }else if(left > window.displayWidth - 96){
      left = window.displayWidth - 192;
    }else{
      left = left-96;
    }
    if(top < 96){
      top = 0;
    }else if(top > window.displayHeight - 96){
      top = window.displayHeight - 192;
    }else{
      top = top-96;
    }
    window.streammmMenu = new streammmDisc({left : left+"px", top : top+"px"});  
  }
}

function menuClick(){
  if(window.streammmMenu === null && sliderObj.started){
    var left = (window.displayWidth/2)-96;
    var top = (window.displayHeight/2)-69;
    window.streammmMenu = new streammmDisc({left : left+"px", top : top+"px", notification : true});
  }
}		

function _superStreammm() {
  if(streamArray.length == 0){
    return;
  }
  var id = window.streammmApp.getActiveSlide();
  TweenLite.killDelayedCallsTo(nXt);
  dataObj.curId = id;
  dataObj.logo = streamArray[id].slideLogo;
  dataObj.logoColor = streamArray[id].logoColor;
  dataObj.title = streamArray[id].slideTitle;  
  dataObj.subtitle = streamArray[id].slideMsg;
  dataObj.slideLang = streamArray[id].slideLang;
  dataObj.url = streamArray[id].url;
  dataObj.image = streamArray[id].image;
  dataObj.feed = streamArray[id].feed;
  dataObj.links = streamArray[id].links;
  dataObj.time = streamArray[id].time;
  
  dataObj.aiInfo = [];
  var chnl;
  if (dataObj.feed.indexOf('|') > -1){
    var res = dataObj.feed.split(" |");
    dataObj.aiInfo.push(res[0]+"^2500");
    dataObj.aiInfo.push(res[1]+"^1500");
	chnl = res[0];
  }else{
    dataObj.aiInfo.push(dataObj.feed+"^2500");
	chnl = dataObj.feed;
  }
  dataObj.aiInfo.push(dataObj.time+"^1800");
  
  dataObj.status = [];
	
  var status = window.streammmApp.getLoadedStatus();

  if(status === 1){
    dataObj.status.push("Loading Image...^1000");
  }else if(status === 2){
    dataObj.status.push("Image failed to load...^1000");
  }
  if(!sliderObj.pause){  
    if (dataObj.status.length === 0){
      window.streammmType = new streammmTyper({strings : dataObj.aiInfo, type : 'slideInfo', returnToInfo : true});
    }else{
      var arrayMerge = dataObj.status.concat(dataObj.aiInfo);
      window.streammmType = new streammmTyper({strings : arrayMerge, type : 'slideInfo', returnToInfo : true});	  
    }
  }
  var curLogo = ((dataObj.curId)*26)*-1;
  globalObj.logoMover.style.transform = 'translateY('+curLogo+'px)';


//  window.streammmApp.resetTextModule();
  //window.streammmTxt = new streammmText({title: dataObj.title, subtitle : dataObj.subtitle, slideLang : dataObj.slideLang});

  StreammmAnalytics('screenview',false,dataObj.title);
  return;
}
window._superStreammm = _superStreammm;

function streammmResize(){
  if(window.streammmMenu !== null){
    window.streammmMenu.dismiss();
  }
  streammmHide();
  var size = window.streammmApp.getScreenSize();
  window.displayWidth = size.w;
  window.displayHeight = size.h;
  setTextSize();
//  if(!sliderObj.pause){
//	window.streammmType = new streammmTyper({strings : ["Please wait..."], type : 'botInfo'}); 
//  }
  clearTimeout(window.newSize);  
  window.newSize = setTimeout(function(){

    if(sliderObj.pause){
	  return;
	}
	if(sliderObj.started){
	  streammmShow();
    }
    if(streamArray.length > 1){
      _superStreammm();
    }
  }, 100);
}

function nGroup(){
  if (typeof window.plugins !== 'undefined' && adsObj.adsEnabled === true && window.streammmApp.getCurrentGroup() % 2 && window.streammmApp.getCurrentGroup() > window.currentGroup){
    window.streammmType.destroy();
    aiVoice("","en-US");
    resetUi();
    showAds();
  } else {
    resetUi();
    constructRequest();
  }
}

// public event listeners
window.streammmApp
//  .on("tap", singletap)
//  .on("singletap", singletap)
//  .on("touchstart", touchStart)
//heeere  .on("touchmove", scrollTxt)
//  .on("touchend", resumeTxt)
  .on("menuclick", menuClick)
  .on("texttap", textTap)
  .on("doubletap", doubletap)
  .on("newgroup", nGroup)
  .on("sliderinit", _superStreammm)
  .on("slidechange", _superStreammm)
  .on("resize", streammmResize)
  .on("textcomplete", nXt);
  

//} )( window );
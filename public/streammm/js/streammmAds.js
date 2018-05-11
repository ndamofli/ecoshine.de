//Appodeal
/*function adsInit(){
var appKey = "69a5508ce8fe4aacbf9cc90398cc02cf51cf4dce9868b743";
  Appodeal.disableLocationPermissionCheck();
  Appodeal.initialize(appKey, Appodeal.REWARDED_VIDEO);
  Appodeal.enableRewardedVideoCallbacks(true);
  Appodeal.setTesting(false);
  document.addEventListener('onRewardedVideoLoaded', function(){});
  document.addEventListener('onRewardedVideoFailedToLoad', function(){});
  document.addEventListener('onRewardedVideoShown', function(){});
  document.addEventListener('onRewardedVideoFinished', function(){});
  document.addEventListener('onRewardedVideoClosed', function(){});
}
function showAds(){
  Appodeal.isLoaded(Appodeal.REWARDED_VIDEO, function(result){
    Appodeal.show(Appodeal.REWARDED_VIDEO);
  });
}*/



//Appnext
/*var adsObj = {};
adsObj.adLoaded = false,
adsObj.adVideo;

function adsInit(){
  var placement_id = "cdd955b6-4ffc-47ef-9d52-de3ea052ce4e"
  adsObj.adVideo = new Appnext.Fullscreen(placement_id,false);
  adsLoader();
}
function adsLoader(){
  adsObj.adVideo.loadAd();
  adsObj.adVideo.setOnAdLoadedCallback( function(){
    adsObj.adLoaded = true;
  });
  adsObj.adVideo.setOnAdClosedCallback(function(){
    continueAds();
  });
  adsObj.adVideo.setOnVideoEndedCallback(function(){
    continueAds();
  });
}

function showAds(){
  if(adsObj.adLoaded === true){
    adsObj.adVideo.showAd(false,onError);
  }else{
    continueAds();
  }
}
function onError(response){
  continueAds();
}

function continueAds(){
  alert("ok");
  adsLoader();
}

//Get callback for ad clicked
adsObj.adVideo.setOnAdClickedCallback( function(){console.log("clicked");});
//Get callback for ad closed

//Get callback for ad error
fullscreen.setOnAdErrorCallback( function(error){console.log("error: " + error);});
//Get callback for video ended
*/

//appcel
var adsObj = {};
adsObj.adsEnabled = true,
adsObj.adLoaded = false,
adsObj.AdCelContentType = {
  VIDEO: 'Video',
  INTERSTITIAL : 'Interstitial',
  IMAGE : 'Image'
};
adsObj.adsArray = ["Image","Video","Interstitial"];
  
function adsInit(){
  var AdCelLogLevel = {
    Off : 0,
    Verbose : 16
  };
  var debugScreen = false;  
  window.plugins.adcelPlugin.setLogLevel(AdCelLogLevel.Verbose);
  window.plugins.adcelPlugin.setTestMode(false);
  window.plugins.adcelPlugin.start(adsObj.AdCelContentType.VIDEO + adsObj.AdCelContentType.INTERSTITIAL + adsObj.AdCelContentType.IMAGE, "03e93a2b-5710-4e1c-a719-76c5d2d0300e:f30880da-6f9a-48c3-8adf-17cd5163fd87");
  if(debugScreen){
    var adcelCallbackText = document.createElement( 'div' );
    adcelCallbackText.id = 'adcelCallbackText';
    adcelCallbackText.innerHTML = 'Adcel callbacks';
    document.body.insertBefore( adcelCallbackText, document.body.firstChild );
  }
  window.plugins.adcelPlugin.setCallbacks(function callback(data) {
    var adcelCallbackText = document.getElementById('adcelCallbackText');
//    adcelCallbackText.innerHTML = adcelCallbackText.innerHTML + '<BR>NewEvent: ' + data + "<br>";
    var callbackComponents = data.split(':')
    var callback = callbackComponents[0];
    var arg = callbackComponents[1];
    if (callback.localeCompare("onInterstitialFirstLoaded") == 0) {
      if(debugScreen){
        adcelCallbackText.innerHTML = adcelCallbackText.innerHTML + '<br>Event: [' + callback + '] - [' + arg + ']';
      }
    } else if (callback.localeCompare("onInterstitialWillAppear") == 0) {
      if(debugScreen){
        adcelCallbackText.innerHTML = adcelCallbackText.innerHTML + '<br>Event: [' + callback + '] - [' + arg + ']';
      }
    } else if (callback.localeCompare("onInterstitialDidDisappear") == 0) {
		StreammmAnalytics('event','AdsShown',adsObj.adsArray[0]);		
      if(debugScreen){
        adcelCallbackText.innerHTML = adcelCallbackText.innerHTML + '<br>Event: [' + callback + '] - [' + arg + ']';
      }
	  constructRequest();
    } else if (callback.localeCompare("onInterstitialFailedToAppear") == 0) {
		StreammmAnalytics('event','AdsFailed',adsObj.adsArray[0]);
      if(debugScreen){
        adcelCallbackText.innerHTML = adcelCallbackText.innerHTML + '<br>Event: [' + callback + '] - [' + arg + ']';
      }
	  constructRequest();
    } else if (callback.localeCompare("onInterstitialClicked") == 0) {
		StreammmAnalytics('event','AdsClicked',adsObj.adsArray[0]);
      if(debugScreen){
        adcelCallbackText.innerHTML = adcelCallbackText.innerHTML + '<br>Event: [' + callback + '] - [' + arg + ']';
      }
    } else {
      adsObj.adsEnabled = false;
      //alert("SuperError"+callback);
      if(debugScreen){
        adcelCallbackText.innerHTML = adcelCallbackText.innerHTML + '<br>Event: [' + callback + ']';
      }
    }
  },  function errorHandler(err) {
        adsObj.adsEnabled = false;
      //Failed to display small banner ad
      //document.getElementById('adcelCallbackText').innerHTML = 'Error: ' + err;
// 	  constructRequest();
  });
//  alert(window.plugins.adcelPlugin.isInterstitialDisplayed());
}





function showAds(){
  arrayRotate(adsObj.adsArray,1);
  window.plugins.adcelPlugin.showInterstitial(adsObj.adsArray[0]);
}
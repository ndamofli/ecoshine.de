var botObj = {};
botObj.voiceRecording = false,
botObj.busy = false,
botObj.textReply = false,
botObj.voiceReply = false,
botObj.voiceResponse = false;

function toggleBot() {
  if(!sliderObj.pause){
	streammmPause();
    botCreate();
    window.streammmType = new streammmTyper({strings : languageObj.aiStart, type : 'botInfo', loop : true});
    aiVoice(languageObj.voiceaiStart,"en-US");
    botObj.busy = false;
  }else{
	botObj.voiceRecording = false;
    botDestroy();
    streammmResume();
  }
}

function botCreate(){
  var aiBot = document.createElement( 'div' );
  aiBot.id = "aiBot";
  
  var aiMic = document.createElement( 'div' );
  aiMic.id = "aiMic";
  aiMic.className = "vis";
  aiMic.innerHTML = '<svg class="iconMic" viewBox="0 0 512 512"><use class="svgmic" xlink:href="#mic" x="0" y="0"></use></svg>';
  aiBot.appendChild(aiMic);

  var messageBox = document.createElement( 'div' );
  messageBox.id = "msgBox";
  messageBox.className = "message-box";
  
  var aiInput = document.createElement("input");
  aiInput.id = "aiInput";
  aiInput.className = "message-input";
  aiInput.setAttribute('type', 'text');
  aiInput.setAttribute('placeholder', 'Type your query...');
  messageBox.appendChild(aiInput);


  var aiSubmit = document.createElement( 'div' );
  aiSubmit.id = "aiSubmit";
  aiSubmit.innerHTML = '<span class="sbm">Send</span>';
  messageBox.appendChild(aiSubmit);

  var botBg = document.createElement( 'div' );
  botBg.id = "botBg";
  aiBot.appendChild(botBg);
 
  aiBot.appendChild(messageBox);

  document.body.insertBefore( aiBot, document.body.firstChild );

  botObj.aiBot = aiBot;  
  botObj.aiMic = aiMic;
  botObj.aiInput = aiInput;
  botObj.aiSubmit = aiSubmit;
  botObj.aiBot = aiBot;
  botObj.botBg = botBg;
  botObj.messageBox = messageBox;

  botObj.aiMic.addEventListener('tap', voiceRec, {passive: true, capture: false});
  botObj.aiInput.addEventListener('focus', aiInputfocus, true);
  botObj.aiSubmit.addEventListener('tap', submitHandler, false);
  botObj.botBg.addEventListener('tap', botBgHandler, false);

}


function botDestroy(){
  botObj.aiMic.removeEventListener('tap', voiceRec);
  botObj.aiInput.removeEventListener('focus', aiInputfocus);
  botObj.aiSubmit.removeEventListener('tap', submitHandler);
  botObj.botBg.removeEventListener('tap', botBgHandler);
  document.body.removeChild( botObj.aiBot );
}
  
function aiInputfocus(e){
  e.preventDefault();
  e.stopPropagation();
  botObj.aiMic.classList.remove('vis');
  e.target.removeEventListener("focus", aiInputfocus);
  return;
}
function submitHandler(e){
  e.preventDefault();
  e.stopPropagation();
  submitAi(botObj.aiInput.value);
  botObj.voiceRecording = false;  
  return;
}
function botBgHandler(e){
  e.preventDefault();
  e.stopPropagation();
  if(botObj.busy){
	  return;
  }
  toggleBot();
  streammmResume();
  return;
}

window.addEventListener('native.keyboardshow', keyboardShowHandler);
function keyboardShowHandler(e){	
  var mbox = document.getElementById('msgBox');
  if (document.getElementById('msgBox')) {
    TweenLite.to(mbox, 1.3, {
      bottom:e.keyboardHeight+62+'px',
      force3D:true,
      ease: Power4.easeOut
    });
  }
}
/*
window.addEventListener('native.keyboardhide', keyboardHideHandler);
function keyboardHideHandler(e){
  var mbox = document.getElementById('msgBox');
  if (typeof mbox !== "undefined") {
    TweenLite.to(mbox, 1.3, {
      bottom:'0px',
      force3D:true,
      ease: Power4.easeOut
    });
  }
}*/

window.addEventListener('keydown', function(e) {
  if (e.which == 13) {
    submitAi(botObj.aiInput.value);
    botObj.voiceRecording = false;
    return false;
  }
}, false);

function blinkSubmit() {
  TweenLite.to(botObj.aiSubmit, 0.2, {
    opacity: 0.3,
    onComplete: function() {
      TweenLite.to(botObj.aiSubmit, 0.2, {
        opacity: 1
      });
    }
  });
}

function searchPartial (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return true;
    }
    return false;
}

function searchFull (str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j] == str) return true;
    }
    return false;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function arrayRotate(arr, count) {
  count -= arr.length * Math.floor(count / arr.length);
  arr.push.apply(arr, arr.splice(0, count));
  return arr;
}

function searchArrays(arrays, str, method) {
  for (var n=0; n < arrays.length; n++) {
    if(method(str, arrays[n])){
      return arrays[n][0];
    }
  }
  return false;
}

function cleanString(array, str) {
  for (var j=0; j<array.length; j++) {
    str = str.replace(array[j], ''); 
  }
  return str;
}

function searchChnl (str, strArray) {
  for (var j=0; j<strArray.length; j++) {
    if (strArray[j].match(str)) return strArray[j];
  }
  return false;
}

function aiLearn(category) {
  return;
}

var world = ['world','latest','recent','current','main','international','breaking','news','now','just','happening'];
var business = ['business'];
var entertainment = ['entertainment','lifestyle','gossip','celebrity','celebs','celebrity','celeb','stars'];
var sports = ['sports','sport'];
var science = ['science','galaxy','universe','environment'];
var politics = ['politics','political'];
var technology = ['technology','tech','gadget','gadgets'];
var gaming = ['gaming','game','games','video games'];
var movies = ['movies','cinema','blockbuster','hollywood','big screen','film','films'];
var design = ['design','inspiration','art','arts','creative'];
var photography = ['photography'];
var graphics = ['graphics','graphic','branding','print','illustration','graphic design'];
var architecture = ['architecture','decoration','interior','home','renovation','apartment','deco'];
var fashion = ['fashion','style'];
var food = ['food','hungry','cooking','recipes','sweets','dessert'];
var finance = ['finance','economics','money','financial'];
var marketing = ['marketing','advertising'];
var allNews = ['all','reset','restart','start','al'];

var helpArray = ['help','info','?','guide','manual','tutorial'];

var searchKeys = ['search', 'look', 'lookup', 'find', 'query', 'looking','for','searching'];

var aiRepliesOk = shuffle(['Ok got it', 'I am on it', 'Working on it', 'Good choice of wording', 'Interesting topic', 'I have a lot of info on this one', 'This is one of my favorite keywords']);

var aiRepliesError = shuffle(["I didn't understand", "I didn't quite get that", "Can you please be more specific", "Can you please rephrase your query", "Could you try using different wording please", "Please try again", "You got me there", "I'm not sure I follow."]);

var cursing = ['cursing','fuck','fucker','asshole','cunt','bumhole','suck','bitch','motherfucker','twat','dick','porn'];
var aiRepliesCursing = shuffle(["Please be polite", "Please don't swear", "No need for swearing"]);

var cancelCommand = ['cancel','undo'];

var greetings = ['greetings', 'hi', 'meet', 'hello', 'hey', 'morning', 'afternoon', 'evening', 'pleased', 'salute', 'yo'];
var aiRepliesGreeting = shuffle(["Hi!", "Hello!","Hello there", "Let's do this", "Good day!", "Greetings", "Ask me something, anything..."]);

var commentKeys = ['comment', 'note', 'mention', 'discuss'];
var commentReplies = shuffle(["Point noted", "Your feedback is welcome", "Comment added to article"]);
var stopWords = ["i","am","a","go","about","above","after","again","against","all","and","an","any","are","is","as","at","be","because","been","before","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"];

function submitAi(command) {
  if(botObj.busy){
    return;
  }
  command = command.trim();
  if (command === '') {
    return false;
  }
  if (command.length < 2) {
    aiRespond("Too short...");
    return false;
  }
  if( command == "noads" ){
    adsObj.adsEnabled = false;
    aiRespond("Ok boss");
    return false;
  }
  botObj.busy = true;
  command = command.toLowerCase();
  botObj.aiInput.value = '';
  blinkSubmit();
  var keywords = command.split(' ');
  var searchmethod;

  if(keywords.length == 1){

    var currentKey = command;

	if(currentKey.length < 5){
      searchmethod = searchFull;
	}else{
      currentKey = currentKey.substring(0, currentKey.length - 1);
      searchmethod = searchPartial;
	}
    var help = searchArrays([helpArray], command, searchFull);
    if( help ){
      aiHelp();
      return;
    }
    var greet = searchArrays([greetings], currentKey, searchmethod );
    if( greet ){
      aiRespond(aiRepliesGreeting[0]);
      arrayRotate(aiRepliesGreeting,1);
	  return;
    }
    var category = searchArrays([world,business,entertainment,sports,science,politics,technology,gaming,movies,design,photography,graphics,architecture,fashion,food,finance,marketing,allNews], currentKey, searchmethod );
    if( category ){
      aiFilter(category,aiRepliesOk[0]);
	  arrayRotate(aiRepliesOk,1);
      return;
    }
  }
  var newCommand = "";
  var isSearch = false;
  for (var a = 0; a < keywords.length; a++) {
    var currentKey = keywords[a];
    if(searchFull(currentKey, stopWords)){
	  continue;
	}
	if(currentKey.length < 5){
      searchmethod = searchFull;
	}else{
      searchmethod = searchPartial;
	}
	if(isSearch === false){
      isSearch = searchArrays([searchKeys], currentKey, searchmethod );
	}
    if(searchFull(currentKey, searchKeys)){
	  continue;
	}	
    var retry = searchArrays([cancelCommand], keywords[a], searchFull );
    if( retry ){
      aiRespond('Please try again');
	  return;
    }
    var curse = searchArrays([cursing], keywords[a], searchmethod );
    if( curse ){
      aiRespond(aiRepliesCursing[0]);
      arrayRotate(aiRepliesCursing,1);
	  return;
    }
	newCommand = newCommand+" "+currentKey;
  }
  if(isSearch){
    aiSearch(newCommand);
    return;
  }
  return apiAi(newCommand);
}

function apiAi(command){
//console.log("apiAi");
//  command = cleanString(searchKeys, command);
  var rand = Math.floor((Math.random() * 1000000) + 1);

/*  crossOrigin: true,
    withCredentials: true,
	headers: {
      'Content-Type' : 'application/x-www-form-urlencoded'
    },*/
  return reqwest({
    url: "https://api.api.ai/v1/query?v=20150910",
    method: 'post',
    contentType: "application/json; charset=utf-8",
    type: 'json',
	cache: false,
    headers: {
      "Authorization": "Bearer " + "7bdccc0c0f004f1981b1ee547642b8af"
    },
    data: JSON.stringify({ query: command, lang: "en", sessionId: rand }),
    success: function(data) {
      var action = data['result']['action'];
      var params = data['result']['parameters'];
      var keyword = false;
      var category = false;
      var comment = false;

      if(action == "input.unknown"){
        aiRespond(data['result']['fulfillment']['speech']);
        return;
      }
      if(action == "input.welcome"){
        aiRespond(data['result']['fulfillment']['speech']);
        return;
      }
      if(action == "navigation.help"){
		aiHelp();
        return;
      }
      if(action == "news.comment"){
        aiComment(params['comment'],data['result']['fulfillment']['speech']);
        return;
      }
      if(action == "news.search"){
		//console.log(JSON.stringify(data, undefined, 2));
        if(typeof params['topic'] !== 'undefined' && params['topic'] !== ""){
		  aiFilter(params['topic'],data['result']['fulfillment']['speech']);
	      return;
        }

        if(typeof params['keyword'] !== 'undefined' && params['keyword'] !== ""){
          aiSearch(command);
	      return;
        }
      }
	  //error 
	  //console.log(aiReply);
	  //console.log(JSON.stringify(data, undefined, 2));
      aiRespond(aiRepliesError[0]);
      arrayRotate(aiRepliesError,1);
      return;
    },
    error: function() {
	  //error 
      aiRespond(aiRepliesError[0]);
      arrayRotate(aiRepliesError,1);
      return;
    }	
  });
}

function aiRespond(aiReply) {
  //console.log("aiRespond: "+aiReply);
  window.streammmType = new streammmTyper({strings : [aiReply], type : 'botInfo'});
  aiVoice(aiReply, "en-US");
  botObj.busy = false;
}

function aiHelp() {
  window.streammmType = new streammmTyper({strings : languageObj.aiTut1, type : 'botInfo'});
  aiVoice(languageObj.voiceTut1, "en-US");
  botObj.busy = false;
}
	
function aiFilter(filter, aiReply) { 
  botObj.textReply = [aiReply + "^1000","Moving on to " + filter +".^1500"];
  botObj.voiceReply = aiReply +'. Moving on to ' + filter + '.';
  botObj.busy = false;
  toggleBot();
  window.aisearch = "";
  filterObj.filterVal = filter;

  if(filterObj.filterVal == "all"){
    globalObj.streammmPlaylist.innerHTML = 'PLAYING ALL';
  }else{
    aiLearn(filter);
    globalObj.streammmPlaylist.innerHTML = filter;
  }
  constructRequest("update");
}

function aiSearch(keyword) {
  //console.log("aiSearch: "+keyword);
  botObj.textReply = ['Searching for ' + keyword +'^1500'];
  botObj.voiceReply = "Searching for " + keyword;
  botObj.busy = false;
  toggleBot();
  filterObj.filterVal = "custom";
  window.aisearch = keyword;
  var playlist = cleanString(searchKeys, keyword);
  globalObj.streammmPlaylist.innerHTML = playlist;
  constructRequest("update");
}

function aiComment(comment, aiReply) {
  //console.log("aiComment: "+comment);
  window.streammmType = new streammmTyper({strings : [aiReply], type : 'botInfo'});
  aiVoice(aiReply, "en-US");
  setTimeout(function(){
    botObj.busy = false;
    toggleBot();
    streammmResume();
  }, 3500);
}
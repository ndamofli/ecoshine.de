var txtObj = {};
txtObj.titleWrap = document.getElementById('title-wrap'),
txtObj.titleText = document.getElementById('title-text-container'),
txtObj.lastYLines = false;
	
function setTextSize() {
  txtObj.titleMaxHeight = 69;
  txtObj.fontSize = 20;
  txtObj.lineHeight = 23;  
  if(window.displayHeight > 736){
    txtObj.titleMaxHeight = 114;
    txtObj.fontSize = 35;
    txtObj.lineHeight = 38;
  }
  if(window.displayHeight > 1024){
    txtObj.titleMaxHeight = 132;
    txtObj.fontSize = 40;
    txtObj.lineHeight = 44;
  }
  if(window.displayHeight > 1280){
    txtObj.titleMaxHeight = 165;
    txtObj.fontSize = 50;
    txtObj.lineHeight = 55;
  }
  txtObj.titleWrap.style.height = txtObj.titleMaxHeight+"px";
  txtObj.titleText.style.fontSize = txtObj.fontSize+"px";
  txtObj.titleText.style.lineHeight = txtObj.lineHeight+"px";
}
	
;( function( window ) {
	'use strict';

	window.streammmTxt = null;

	/**
	 * streammmText function
	 */
	function streammmText( options ) {
		this.options = xtnd( {}, this.options );
		xtnd( this.options, options );
		this._init();
	}

	/**
	 * streammmText options
	 */
	streammmText.prototype.options = {
        titleWrap : txtObj.titleWrap,
        titleText : txtObj.titleText,
		title : false,
		subtitle : false,
		slideLang : false,
		subtitleDelay : 1500,
		charsRatio : 0.48,
		groupSpeed : 2500,
		wordsSpeed : 55
	};
	/**
	 * init function
	 * initialize and cache some vars
	 */
	 
	streammmText.prototype._init = function() {
        clearTimeout( window.textTimer );

        //Kills delayed calls to next slide
        TweenLite.killDelayedCallsTo(nXt);

        //Available Width for each line = 64% of window width
		this.availableWidth = parseInt(window.displayWidth*0.64); // 18% margin left & right
		
		//Get css value for the Font size. Variable is used to calculate each line's width
		this.wordsFontSize = txtObj.fontSize;

        // Alt regex /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/		
        //Check if language is Chinese
        if (this.options.title.match(/[\u3400-\u9FBF]/)) {
          this.isChinese = true;
        }else{
          this.isChinese = false;
        }
	  
        if(this.options.subtitle !== "" && this.options.subtitle !== false){
          this.hasSubtitle = true;
		  this.options.subtitle = this.options.subtitle + " ↑";
		}else{
          this.hasSubtitle = false;
		  this.options.title = this.options.title + " ↑";
		}		
        //Create Title Object
        this.titleObj = this.processTxt(this.options.title,this.isChinese);
        //Create subTitle Object
        this.subtitleObj = this.processTxt(this.options.subtitle,this.isChinese);

		this.currentObj = this.titleObj;
        this.subStarted = false;
		//wordLoop counts the word index
 		this.wordLoop = 0;

		//textGroup 
 		this.textGroup = 1;
		
 		this.subGroup = 1000;
 		this.allGroup = 1000;
		
        //We are not scrolling the text manually (touch) on init
        this.isManual = false;

        this.wordsSpeed = this.options.wordsSpeed;

		this.groupFinished = false;
		this.groupArray = new Array();
		//Create a new group
        this.newGroup(this.textGroup);
	};
	  	
    //Creates a new group
	streammmText.prototype.newGroup = function(group) {
	  //console.log("group"+group+"this.subGroup"+this.subGroup);
      if(group >= this.subGroup){
        this.subStarted = true;
        this.currentObj = this.subtitleObj;
      }else{
        this.subStarted = false;
        this.currentObj = this.titleObj;
      }
      //Group hasn't finished typing
      this.groupFinished = false;

        //Stores the words for each group
        this.groupArray[group] = new Array();
        this.groupArray[group].words = new Array();
        this.groupArray[group].lines = new Array();
        this.groupArray[group].wordLoop = false;

      //Invoke text to speech for the title
      if(group == 1){
        aiVoice(this.options.title,this.options.slideLang);
	  }
      if(group == this.subGroup){
        aiVoice(this.options.subtitle,this.options.slideLang);
	  }
      //Reset all text
      this.options.titleText.innerHTML = "";
	  //currentLine resets to 1
	  this.currentLine = 0;
      //Start a new line
      this.newLine();
	};

    //Creates a new line
	streammmText.prototype.newLine = function() {
      //Check if we're still on a group (3 lines/group)
	  if(this.currentLine < 3){
        //increment the line index
        this.currentLine++;
	  }else{
        //group finished
		this.finishedGroup();
		return;
	  }
	  //Create a new paragraph element
      var paraGraph = document.createElement("p");
	  //Set the id for the paragraph.
	  paraGraph.id = this.currentLine;
	  //Append the empty paragraph element to the dom element > titleText : document.getElementById('title-text-container'),
      this.options.titleText.appendChild(paraGraph);
	  //Current paragraph element 
      this.currentParaGraph = paraGraph;
      this.groupArray[this.textGroup].lines.push(this.currentParaGraph);
	  //Reset the line's width
	  this.lineWidth = 0;
	  //Start the typing method
      this.typeWord();
	};

	streammmText.prototype.typeWord = function() {
      //Check if wordloop is smaller than all text
      if(this.wordLoop < this.currentObj.length){
        //This is the next word to get typed
        var newWord = String(this.currentObj.words[this.wordLoop]);
		//Remove hex/ascii strings and estimate how many characters is the word
        var realWord =  newWord.replace(/&(\d+);/g, function(x, y) {return String.fromCharCode(y);})
        //Estimate the new word (+1 for the space that will be added) 
        var newWordWidth = (realWord.length+1)*(this.wordsFontSize*this.options.charsRatio);
		// First argument: If there is enough space to type the word in the current line
        // Second argument: If this is the first word and the new word will exceed the available width, go ahead and type it
        if(this.availableWidth > this.lineWidth + newWordWidth || (this.lineWidth == 0 && newWordWidth >= this.lineWidth)){
          //Increment the line width adding the new word width estimation
          this.lineWidth += newWordWidth;
		  
		  if(this.isChinese){
		    this.currentWord = newWord;
		  }else{
		    //Add a space before the word
		    this.currentWord = " "+newWord;
		  }
		  
          this.currentParaGraph.innerHTML += this.currentWord;

          this.groupArray[this.textGroup].words.push(this.currentWord);
          if (window.textTimer) {
            clearTimeout( window.textTimer );
          }
		  //Increment the word loop
          this.wordLoop++;
		  //Type a new word...
          window.textTimer = setTimeout(function () {
            this.typeWord();
          }.bind(this), this.wordsSpeed);
		  
	    }else{
          // Line is full, create a new line
          this.newLine();
		}
	  }else{
        if(this.subStarted === false){
          // Title has finished
          this.finishedTitle();
		}else{
          // Everything has finished
          this.finishedEverything();
		}
      }
	};
	
    //Group finished
	streammmText.prototype.finishedGroup = function() {
      //console.log("finishedGroup");
      //Group has finished typing
      this.groupFinished = true;
      this.groupArray[this.textGroup].wordLoop = this.wordLoop; 
	  
	  //If manual return
      if(this.isManual){
          return;
	  }
      //Clear timer
      if (window.textTimer) {
        clearTimeout( window.textTimer );
      }
      //Wait time calculations....
      var charSpeed = 40;
      var pauseSpeed = 200;
      //If voice narration is off speeds are different
      if(!voiceObj.speech){
        charSpeed = 40;
        pauseSpeed = 50;
      }
	  var allChars = this.groupArray[this.textGroup].words.join("");
      var commas = find_occurences(allChars, ",");
      var stops = find_occurences(allChars, ".");
      var others = find_occurences(allChars, ":");
      var pauses = commas+stops+others;
      var charsLength = allChars.length;
      var numbers = allChars.replace(/[^0-9]/g,"").length;
      this.options.groupSpeed = (charsLength*charSpeed)+(pauses*pauseSpeed)+(numbers*25);
	  if(this.textGroup+1 == this.subGroup){
		this.options.groupSpeed = this.options.groupSpeed + this.options.subtitleDelay;
	  }
      window.textTimer = setTimeout(function () {
        //increment the group index
        this.textGroup++
        //Invoke a next Group
        this.newGroup(this.textGroup);
      }.bind(this), this.options.groupSpeed);
	};
	

	// Finished method
	streammmText.prototype.finishedTitle = function() {
      //console.log("finishedTitle");
      if(this.hasSubtitle){
          this.subGroup = this.textGroup+1;
          this.subStarted = true;
          this.currentObj = this.subtitleObj;
	  }else{
		  this.allGroup = this.textGroup;
	  }
      // Finished title... check if there is a subtitle and proceed. We are on manual mode...
      if(this.isManual && this.hasSubtitle){
        this.wordLoop = 0;
        this.finishedGroup();
        return;
	  }
      // Finished title... check if we need to move to subtitles 
      if(this.hasSubtitle && !settingsObj.userHeadlines){
        this.wordLoop = 0;
        this.finishedGroup();
      }else{
        this.wordLoop = 0;
	    this.groupFinished = true;
        this.groupArray[this.textGroup].wordLoop = this.wordLoop;
		return TweenLite.delayedCall(5, nXt);
	  }
      return;
    };

	streammmText.prototype.finishedEverything = function() {
      //console.log("finishedEverything");
      this.groupFinished = true;
      this.groupArray[this.textGroup].wordLoop = this.wordLoop;
      this.allGroup = this.textGroup;
      if(this.isManual){
        return;
	  }
      return TweenLite.delayedCall(5, nXt);
    };

	// Drag Up / Forward manual scrolling method
	streammmText.prototype.manualUp = function() {
      TweenLite.killDelayedCallsTo(nXt);
      // Manual scrolling
      this.isManual = true;
	  this.wordsSpeed = 0;
      if(this.groupFinished === false){
		return;
	  }
      if(this.textGroup == this.allGroup){
        //console.log("exits here");
		return;
	  }
      this.textGroup++
  	  //console.log(this.textGroup + " up");
      //Invoke a next Group
      this.newGroup(this.textGroup);
	  return;
    };

	// Drag Down / Backward manual scrolling method
	streammmText.prototype.manualDown = function() {
      TweenLite.killDelayedCallsTo(nXt);
      // Manual scrolling
      this.isManual = true;
	  this.wordsSpeed = 0;
	  
      if(this.textGroup == 1){
		if(this.subStarted){
          this.subStarted = false;
          aiVoice(this.options.title,this.options.slideLang);
		}
		return;
	  }
	  
	  this.textGroup--;

   	  //console.log(this.textGroup + " down");

      this.options.titleText.innerHTML = "";
	  
	  var newPars = this.groupArray[this.textGroup].lines;
      for(var o=0; o<newPars.length; o++) {
        this.options.titleText.appendChild(newPars[o]);
      }
	  
 	  this.wordLoop = this.groupArray[this.textGroup].wordLoop;

//	  this.finishedGroup();
	  return;
	};

    //Resume the auto typing method
	streammmText.prototype.resume = function() {
      //Check that we indeed we were manual scrolling before
      if(this.isManual){
        if(this.textGroup == this.allGroup){
          return TweenLite.delayedCall(2, nXt);
        }
        this.wordsSpeed = this.options.wordsSpeed;
		//Clear the textTimer
        if (window.textTimer) {
          clearTimeout( window.textTimer );
        }
        // Create a new textTimer for the auto mode... Will resume in 0.5sec
        window.textTimer = setTimeout(function () {
          // Not manual any more...
          this.isManual = false;
		  this.textGroup++
		  // Type the next group
          this.newGroup(this.textGroup);
        }.bind(this), 1400);
	  }
	};

    // Pause method - Haven't implemented yet. Usefull if user enters a menu or visits a webpage
	streammmText.prototype.pause = function(ms) {
      //clearTimeout( window.textTimer );
	  TweenLite.killDelayedCallsTo(nXt);
      if (window.textTimer) {
        clearTimeout( window.textTimer );
      }
	  return;
	};
	
    // Finished - Haven't implemented yet. Should create a delayed call to the next slide (nXt function)
	streammmText.prototype.finished = function() {
      if (window.textTimer) {
        clearTimeout( window.textTimer );
      }
	  return;
	};

	function find_occurences(str, char_to_count){
      return str.split(char_to_count).length - 1;
    }
    // Process title and subtitle & Create objects...
	streammmText.prototype.processTxt = function(tXt, isChinese) {
      if (isChinese) {
        var words = tXt.split('');
      }else{
        //Remove line breaks from text
        var cleanText = tXt.replace(/(?:\r\n|\r|\n)/g, ' ');
        cleanText = cleanText.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g,' ');
        //create words array
        var words = cleanText.split(' ');
      }
	  //words array length
      var length = words.length;
	  //Text object
      var tXtOBj = {
          text: cleanText,
          words: words,
          length: length,
      };
	  //Return text object
      return tXtOBj;
	};
	
/**
* Create array with maximum chunk length = maxPartSize
* It work safe also for shorter strings than part size
**/
function convertStringToArray(str, maxPartSize){

  var chunkArr = [];
  var leftStr = str;
  do {
    chunkArr.push(leftStr.substring(0, maxPartSize));
    leftStr = leftStr.substring(maxPartSize, leftStr.length);

  } while (leftStr.length > 0);

  return chunkArr;
};

	/**
	 * add to global namespace
	 */
	window.streammmText = streammmText;

} )( window );
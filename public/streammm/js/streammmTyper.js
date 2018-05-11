var streammmTyperObj = {};
streammmTyperObj.isFinished = true;

;( function( window ) {
	'use strict';
	
    var typerElem = document.getElementById('aiPrompt'),
    typerSpan = document.getElementById('aiSpan'),
	oldType = false;
	window.streammmType = null;
	/**
	 * streammmTyper function
	 */
	function streammmTyper( options ) {
		this.options = xtnd( {}, this.options );
		xtnd( this.options, options );
		this._init();
	}

	/**
	 * streammmTyper options
	 */
	streammmTyper.prototype.options = {
		strings : false,
		type : false,
		loop : false,
		wait : false,
		returnToInfo : false,
        left : 0,
        top : 0,
		speed : 20
	};
	/**
	 * init function
	 * initialize and cache some vars
	 */
	streammmTyper.prototype._init = function() {
		if(!streammmTyperObj.isFinished){
          return;
		}
        clearTimeout( window.typeTimer );
		if(this.options.wait){
          streammmTyperObj.isFinished = false;
		}else{
          streammmTyperObj.isFinished = true;
		}
        if(oldType !== this.options.type){
          if(this.options.type == 'slideInfo'){
            typerElem.className = 'bottom';
		  }
          if(this.options.type == 'notification'){
            typerElem.className = 'bottom red';
		  }
          if(this.options.type == 'botInfo'){
            typerElem.className = '';
		  }
          if(this.options.type == 'loader'){
            typerElem.className = 'loader';
		  }
          oldType = this.options.type;
		}
		this.strings = this.options.strings;
        this.txt = '';
		this.isDeleting = false;
		this.loopNum = 0;
        this.tick();
	};

	streammmTyper.prototype.tick = function() {
      var i = this.loopNum % this.strings.length;
      var fullTxt = this.strings[i];

      if(this.isDeleting){
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      }else{
        var char = fullTxt.substring(this.txt.length, this.txt.length + 1);
        if (char == "<"){
          this.txt = fullTxt.substring(0, this.txt.length)+"<br>";
        }
		if (char == "^"){
          // get the milliseconds from the string
		  var ms = fullTxt.substring(this.txt.length+1, this.txt.length + 5);
          return this.pause(ms);
		}
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

	  typerSpan.innerHTML = this.txt;
	  
      var delta = this.options.speed;
      
      if(!this.isDeleting && this.txt === fullTxt){
        this.isDeleting = true;
      }else if( this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        this.loopNum++;
      }

      //if not looping return
	  if(this.isDeleting && this.loopNum+1 == this.strings.length && this.options.loop === false ){
        return this.finished();
	  }

      clearTimeout( window.typeTimer );
      window.typeTimer = setTimeout( function() {
		  this.tick();
      }.bind(this), delta);
	};

	streammmTyper.prototype.pause = function(ms) {
      clearTimeout( window.typeTimer );
      window.typeTimer = setTimeout( function() {
        if(this.loopNum+1 == this.strings.length && this.options.loop === false){
          return this.finished();
        }else{
          this.isDeleting = true;
          this.loopNum = this.loopNum++;
          return this.tick();
        }
      }.bind(this), ms);
	};

	streammmTyper.prototype.destroy = function() {
      clearTimeout( window.typeTimer );
      typerSpan.innerHTML = "";
	};

	streammmTyper.prototype.finished = function() {
      streammmTyperObj.isFinished = true;
      clearTimeout( window.typeTimer );
      if(this.options.returnToInfo && !sliderObj.pause){
        return window.typeTimer = setTimeout( function() {
          if (dataObj.status.length !== 0){
            dataObj.status = [];
            var status = window.streammmApp.getLoadedStatus();
            if(status == 1){
              dataObj.status.push("Loading Image...^1000");
            }else if(status == 2){
              dataObj.status.push("Image failed to load...^1000");
            }
            if (dataObj.status.length === 0){
              window.streammmType = new streammmTyper({strings : dataObj.aiInfo, type : 'slideInfo', returnToInfo : true});
            }else{
              var arrayMerge = dataObj.status.concat(dataObj.aiInfo);
             window.streammmType = new streammmTyper({strings : arrayMerge, type : 'slideInfo', returnToInfo : true});	  
            }
          }else{
            window.streammmType = new streammmTyper({strings : dataObj.aiInfo, type : 'slideInfo', returnToInfo : true});
          }
        }, 1200);
      }
	  return;
	};
	/**
	 * add to global namespace
	 */
	window.streammmTyper = streammmTyper;
	
} )( window );
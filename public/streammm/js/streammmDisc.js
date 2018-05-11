;( function( window ) {
	'use strict';
	window.streammmMenu = null;
	/**
	 * discMenu function
	 */
	function streammmDisc( options ) {
		this.options = xtnd( {}, this.options );
		xtnd( this.options, options );
		this._init();

	}

	/**
	 * discMenu options
	 */
	streammmDisc.prototype.options = {
		// element to which the notification will be appended
		// defaults to the document.body
        left : 0,
        top : 0,
		notification : false,
		// if the user doesn´t interact with the menu then we remove it 
		// after the following time
		ttl : 7000
	};

	/**
	 * init function
	 * initialize and cache some vars
	 */
	streammmDisc.prototype._init = function() {
        //check if active
        if(window.streammmMenu !== null){
            return;
        }
		// create HTML structure
        var discFragment = document.createDocumentFragment();

        this.dM = discFragment.appendChild(document.createElement('div'));
        this.dM.id = "discMenu";

        if(this.options.notification){
          var discNotification = this.dM.appendChild(document.createElement('div'));
          discNotification.id = "discNotification";
          discNotification.innerHTML = '<span class="discNotification">Tip: Double tap anywhere<br>to open the menu</span>';
		}
  
        var discControls = this.dM.appendChild(document.createElement('div'));
        discControls.id = "discControls";
        discControls.innerHTML = '<svg id="closeLines"><line x1="24" y1="36" x2="36" y2="24" stroke="white"/><line x1="24" y1="24" x2="36" y2="36" stroke="white"/></svg><svg id="helpLines"><line x1="39" x2="79" y1="19"  y2="71" stroke="#00051b"/><line x1="153" x2="113" y1="19"  y2="71" stroke="#00051b"/><line x1="125" x2="186" y1="105"  y2="127" stroke="#00051b"/><line x1="6" x2="67" y1="127"  y2="105" stroke="#00051b"/><line x1="96" x2="96" y1="126"  y2="191" stroke="#00051b"/></svg>';

        this.playControl = discControls.appendChild(document.createElement('div'));
        this.playControl.className = "divControl";
        this.playControl.id = "playControl";
        if(settingsObj.userHeadlines){
          this.playControl.innerHTML = '<svg style="width:30px;height:30px;" viewBox="0 0 512 512"><use xlink:href="#playFF" x="0" y="0"></use></svg>';
        }else{
          this.playControl.innerHTML = '<svg style="width:30px;height:30px;" viewBox="0 0 512 512"><use xlink:href="#play" x="0" y="0"></use></svg>';
        }

        this.voiceControl = discControls.appendChild(document.createElement('div'));
        this.voiceControl.className = "divControl";
        this.voiceControl.id = "voiceControl";
        if(voiceObj.speech){
          this.voiceControl.innerHTML = '<svg style="width:26px;height:26px;" viewBox="0 0 24 24"><use xlink:href="#soundOn" x="0" y="0"></use></svg>';
        }else{
          this.voiceControl.innerHTML = '<svg style="width:26px;height:26px;" viewBox="0 0 24 24"><use xlink:href="#soundOff" x="0" y="0"></use></svg>';
        }

        this.shareControl = discControls.appendChild(document.createElement('div'));
        this.shareControl.className = "divControl";
        this.shareControl.id = "shareControl";
        this.shareControl.innerHTML = '<svg style="width:26px;height:26px;" viewBox="0 0 24 24"><use xlink:href="#share" x="0" y="0"></use></svg>';
  
        this.settingsControl = discControls.appendChild(document.createElement('div'));
        this.settingsControl.className = "divControl";
        this.settingsControl.id = "settingsControl";
        this.settingsControl.innerHTML = '<svg style="width:25px;height:25px;" viewBox="0 0 24 24"><use xlink:href="#settings" x="0" y="0"></use></svg>';
        
        this.searchControl = discControls.appendChild(document.createElement('div'));
        this.searchControl.className = "divControl";
        this.searchControl.id = "searchControl";
        this.searchControl.innerHTML = '<svg style="width:28px;height:28px;" viewBox="0 0 24 24"><use xlink:href="#search" x="0" y="0"></use></svg>';
        
        var disc = this.dM.appendChild(document.createElement('div'));
        disc.id = "disc";
        
        this.centerDot = disc.appendChild(document.createElement('div'));
        this.centerDot.id = "centerDot";
        this.centerDot.innerHTML = '<svg><circle cx="40" cy="40" r="0.01" stroke="#00051b" fill="none"/></svg>';
        
        var centerRing = disc.appendChild(document.createElement('div'));
        centerRing.id = "centerRing";
        centerRing.innerHTML = '<svg><circle cx="50" cy="50" r="0.01" stroke="#fff" fill="none"/></svg>';
        
        var discFill = disc.appendChild(document.createElement('div'));
        discFill.id = "discFill";
        discFill.innerHTML = '<svg><circle cx="96" cy="96" r="46" stroke="url(#streammmgrad)" fill="none"/></svg>';

        // append to body or the element specified in options.wrapper
		document.body.insertBefore( discFragment,  document.body.firstChild);
        //Show the menu
        this.show();
		
        //Button handler
		this.handler = this.actions.bind(this);
		
        // Add button listeners
        this.centerDot.addEventListener('tap', this.handler, false);
        this.playControl.addEventListener('tap', this.handler, false);
        this.voiceControl.addEventListener('tap', this.handler, false);
        this.shareControl.addEventListener('tap', this.handler, false);
        this.settingsControl.addEventListener('tap', this.handler, false);
        this.searchControl.addEventListener('tap', this.handler, false);
		
		// dismiss after [options.ttl]ms 
		clearTimeout( this.dismissttl );
		this.dismissttl = setTimeout( function() {
		  this.dismiss();
		}.bind(this), this.options.ttl );
	};

    // action Handler
	streammmDisc.prototype.actions = function(e) {
      e.stopPropagation();
      e.preventDefault();
	  //GET ACTION
      var action = e.target.id;

      if(action === "playControl"){
         if(settingsObj.userHeadlines){
           this.playControl.innerHTML = '<svg style="width:30px;height:30px;" viewBox="0 0 512 512"><use xlink:href="#play" x="0" y="0"></use></svg>';
         }else{
           this.playControl.innerHTML = '<svg style="width:30px;height:30px;" viewBox="0 0 512 512"><use xlink:href="#playFF" x="0" y="0"></use></svg>';
         }
         toggleHeadlines();
      }
      if(action === "voiceControl"){
        if(voiceObj.speech){
          this.voiceControl.innerHTML = '<svg style="width:26px;height:26px;" viewBox="0 0 24 24"><use xlink:href="#soundOff" x="0" y="0"></use></svg>';
        }else{
          this.voiceControl.innerHTML = '<svg style="width:26px;height:26px;" viewBox="0 0 24 24"><use xlink:href="#soundOn" x="0" y="0"></use></svg>';
        }
        toggleSound();
      }
      if(action === "shareControl"){
        window.streammmType = new streammmTyper({strings : ["Share article^1000","Please wait^1000"], type : 'notification', wait : true, returnToInfo : true});
        if (globalObj.hasPlugins){
          window.plugins.socialsharing.share(dataObj.subtitle + "\n\n" + dataObj.links + "\n\n Discover the Now & the Next \n http://www.streammm.io", dataObj.title + " via Streammm", dataObj.image, dataObj.links);
        }
        StreammmAnalytics('event','Share',dataObj.links);
      }
      if(action === "settingsControl"){
	    aiVoice("","en-US");
        tagMenuCreate();
      }
      if(action === "searchControl"){
        toggleBot();
      }
	  // PROCEED WITH DISMISS
      this.dismiss();
	};

	/**
	 * show the notification
	 */
	streammmDisc.prototype.show = function() {
		//check if dM is in DOM
        if (typeof this.dM.offsetWidth !== 'undefined') {
          this.dM.style.left = this.options.left;
          this.dM.style.top = this.options.top;
          this.dM.className = "active rotate";
        } else {
          //check if dM is in DOM with RAF
          window.requestAnimationFrame(this.show);
        }
	};

	/**
	 * dismiss the notification
	 */
	streammmDisc.prototype.dismiss = function() {
        clearTimeout( this.dismissttl );
		// remove button listeners
        this.centerDot.removeEventListener('tap', this.handler);
        this.playControl.removeEventListener('tap', this.handler);
        this.voiceControl.removeEventListener('tap', this.handler);
        this.shareControl.removeEventListener('tap', this.handler);
        this.settingsControl.removeEventListener('tap', this.handler);
        this.searchControl.removeEventListener('tap', this.handler);
		//remove active class
        this.dM.classList.remove('active');
		//remove the rest
        this.dismissttl = setTimeout( function() {
		  window.streammmMenu = null;
          return document.body.removeChild( this.dM );
		}.bind(this), 400 );
	};

	/**
	 * add to global namespace
	 */
	window.streammmDisc = streammmDisc;
	
} )( window );
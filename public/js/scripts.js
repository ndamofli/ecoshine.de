/*
 * Polyfill for Internet Explorer
 * See https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
 */
( function () {
	if ( typeof window.CustomEvent === "function" ) return false;

	function CustomEvent ( event, params ) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent( 'CustomEvent' );
		evt.initCustomEvent( event,
			params.bubbles, params.cancelable, params.detail );
		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;

	window.CustomEvent = CustomEvent;
} )();


jQuery( document ).ready( function ( $ ) {
  "use strict";
  $('.abouts').matchHeight({byRow: false,property: 'height'});
  $('.abouts2').matchHeight({byRow: false,property: 'height'});
  window.oldHeight = 0;
  window.currentSelection = "null";	
  window.currentLocation = "null";
	
	$('#ecoType').hide();
	
  $(".locSelector").click(function () {
    $(".locSelector").removeClass("blueSelected");
		$(".typeSelector").removeClass("blueSelected");
		$('#bookIframe').height(150+"px");
    $(this).addClass("blueSelected");
    $('#ecoType').show();

		//Koln
    if( $(this).hasClass("koln") && window.currentLocation != 1928351){
      window.currentLocation = 1928351;
			$('#bookIframe').attr('src', '');
			$(".schritts").hide();
      $.smoothScroll({
        scrollTarget: '#ecoType',
				offset:-300
      });			
    }
		//Palais
    if( $(this).hasClass("palais") && window.currentLocation != 1928357){
      window.currentLocation = 1928357;
			$('#bookIframe').attr('src', '');
			$(".schritts").hide();
      $.smoothScroll({
        scrollTarget: '#ecoType',
				offset:-300
      });
    }
  });
	
  $(".typeSelector").click(function () {
    $(".typeSelector").removeClass("blueSelected");
    $(this).addClass("blueSelected");
    if( $(this).hasClass("mittel") && window.currentSelection != "mittel"){
      window.currentSelection = "mittel";
	    //$('#bookIframe').attr('src', 'https://app.acuityscheduling.com/schedule.php?owner=15195881&calendarID=1928357&appointmentType=category:Mittelklasse');
  		$('#bookIframe').attr('src', 'https://app.acuityscheduling.com/schedule.php?owner=15195881&calendarID='+window.currentLocation+'&appointmentType=category:Mittelklasse');
      $.smoothScroll({
        scrollTarget: '#book2'
      });
    }
    if( $(this).hasClass("sedan") && window.currentSelection != "sedan"){
      window.currentSelection = "sedan";
	    //$('#bookIframe').attr('src', 'https://app.acuityscheduling.com/schedule.php?owner=15195881&calendarID=1928357&appointmentType=category:Sedan+%2F+Kombi');
		  $('#bookIframe').attr('src', 'https://app.acuityscheduling.com/schedule.php?owner=15195881&calendarID='+window.currentLocation+'&appointmentType=category:Sedan+%2F+Kombi');
      $.smoothScroll({
        scrollTarget: '#book2'
      });
    }
    if( $(this).hasClass("suv") && window.currentSelection != "suv"){
      window.currentSelection = "suv";
      //$('#bookIframe').attr('src', 'https://app.acuityscheduling.com/schedule.php?owner=15195881&calendarID=1928357&appointmentType=category:SUV+%2F+7-sitzer');	  
      $('#bookIframe').attr('src', 'https://app.acuityscheduling.com/schedule.php?owner=15195881&calendarID='+window.currentLocation+'&appointmentType=category:SUV+%2F+7-sitzer');
      $.smoothScroll({
        scrollTarget: '#book2'
      });
    }
    if( $(this).hasClass("smart") && window.currentSelection != "smart"){
      window.currentSelection = "smart";
	    //$('#bookIframe').attr('src', 'https://app.acuityscheduling.com/schedule.php?owner=15195881&calendarID=1928357&appointmentType=category:Smart');
		  $('#bookIframe').attr('src', 'https://app.acuityscheduling.com/schedule.php?owner=15195881&calendarID='+window.currentLocation+'&appointmentType=category:Smart');
      $.smoothScroll({
        scrollTarget: '#book2'
      });
    }
		
		//REMONDIS
    if( $(this).hasClass("mittelremondis") && window.currentSelection != "mittelremondis"){
      window.currentSelection = "mittelremondis";
      $('#bookIframe').attr('src', 'https://app.acuityscheduling.com/schedule.php?owner=15195881&calendarID=2672416&appointmentType=category:Mittelklasse');
			$(".schritts").hide();
      $.smoothScroll({
        scrollTarget: '#book2'
      });
    }
    if( $(this).hasClass("sedanremondis") && window.currentSelection != "sedanremondis"){
      window.currentSelection = "sedanremondis";
	    $('#bookIframe').attr('src', 'https://app.acuityscheduling.com/schedule.php?owner=15195881&calendarID=2672416&appointmentType=category:Sedan+%2F+Kombi');
			$(".schritts").hide();
      $.smoothScroll({
        scrollTarget: '#book2'
      });
    }
  });
  function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
      element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + eventName, eventHandler);
    }
  }
  bindEvent(window, 'message', function (e) {
    if(e.data && $.type( e.data ) === "string" && e.data.indexOf("sizing") >= 0){
      var newHeight = parseInt(e.data.replace("sizing:", ""));
	  //console.log("newHeight"+newHeight);
      $('#bookIframe').height(newHeight+"px");

    }
    if(e.data && $.type( e.data ) === "string" && e.data.indexOf("scrollTo") >= 0){
      var newScroll = parseInt(e.data.replace("scrollTo:", ""));
	  newScroll = newScroll-200;
      $.smoothScroll({
        scrollTarget: '#book2',
        offset:newScroll
      });
    }	
  });
  $('body').smoothScroll({
    delegateSelector: 'a',
    offset:-100
  });

} );

      WebFont.load({google:{families:['Open Sans:600,300i,400,400i,600i,700i,800i,300i,400,400i,600i,700i,800i,300i,400,400i,600i,700i,800i,300i,400,400i,600i,700i,800i,700,300i,400,400i,600i,700i,800i,300i,400,400i,600i,700i,800i,300i,400,400i,600i,700i,800i,300i,400,400i,600i,700i,800i,300i,400,400i,600i,700i,800i,300i,400,400i,600i,700i,800i,300i,400,400i,600i,700i,800i,300i,400,400i,600i,700i,800i,300i,400,400i,600i,700i,800i']}});
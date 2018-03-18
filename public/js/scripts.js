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
  $(".typeSelector").click(function () {
    $(".typeSelector").removeClass("blueSelected");
    $(this).addClass("blueSelected");

    $.smoothScroll({
      scrollTarget: '#book2'
    });
    if( $(this).hasClass("mittel") && window.currentSelection != "mittel"){
      window.currentSelection = "mittel";
	  $('#bookIframe').attr('src', 'https://app.acuityscheduling.com/schedule.php?owner=15195881&calendarID=1928357&appointmentType=category:Mittelklasse');
    }
    if( $(this).hasClass("sedan") && window.currentSelection != "sedan"){
      window.currentSelection = "sedan";
	  $('#bookIframe').attr('src', 'https://app.acuityscheduling.com/schedule.php?owner=15195881&calendarID=1928357&appointmentType=category:Sedan+%2F+Kombi');
    }
    if( $(this).hasClass("suv") && window.currentSelection != "suv"){
      window.currentSelection = "suv";
	  $('#bookIframe').attr('src', 'https://app.acuityscheduling.com/schedule.php?owner=15195881&calendarID=1928357&appointmentType=category:SUV+%2F+7-sitzer');	  
    }
    if( $(this).hasClass("smart") && window.currentSelection != "smart"){
      window.currentSelection = "smart";
	  $('#bookIframe').attr('src', 'https://app.acuityscheduling.com/schedule.php?owner=15195881&calendarID=1928357&appointmentType=category:Smart');
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
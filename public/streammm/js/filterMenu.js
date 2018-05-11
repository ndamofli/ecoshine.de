var filterObj = {};
filterObj.filterVal = "all";

filterObj.filters = [{name:"All Categories", id:"all"},{name:"Technology & Gadgets", id:"technology"}, {name:"Entertainment & Lifestyle", id:"entertainment"}, {name:"World & Breaking news", id:"world"}, {name:"Design & Arts", id:"design"}, {name:"Fashion & Style", id:"fashion"}, {name:"Food & Recipes", id:"food"}, {name:"Sports", id:"sports"}, {name:"Science & Environment", id:"science"}, {name:"Gaming", id:"gaming"}, {name:"Business & Entrepreneurship", id:"business"}, {name:"Architecture & Decoration", id:"architecture"}, {name:"Movies", id:"movies"}, {name:"Photography", id:"photography"}, {name:"Graphic Design", id:"graphics"}, {name:"Politics", id:"politics"}, {name:"Economics  & Finance", id:"finance"}, {name:"Marketing & Branding", id:"marketing"}];

function filterMenuCreate(){
  streammmPause();
  if(window.streammmMenu !== null){
    window.streammmMenu.dismiss();
  }
  var filterWrapper = document.createElement( 'div' );
  filterWrapper.className = 'menu-wrapper';
  filterWrapper.id = 'filterWrapper';

  var filterFragment = filterFraction();
  filterWrapper.appendChild(filterFragment);
  
  document.body.insertBefore( filterWrapper, document.body.firstChild );
  
  window.streammmType = new streammmTyper({strings : languageObj.filterTxt, type : 'botInfo', loop : true});

  var filterHeader = document.createElement( 'div' );
  filterHeader.className = 'menu-header';
  filterHeader.id = 'filterHeader';
  filterHeader.innerHTML = '<div class="time-header"></div><a class="menuBtn" id="cancelFilter">Back</a>';
  document.body.insertBefore( filterHeader, document.body.firstChild );
  var cancelFilter = document.getElementById('cancelFilter');
  cancelFilter.addEventListener('tap', cancelHandler, false);
}

function filterFraction(arr,name){
  var fragment = document.createDocumentFragment();
  for (var f = 0; f < filterObj.filters.length; f++) {
    var filterName = filterObj.filters[f].name;
    var filterId = filterObj.filters[f].id;
    var flt = document.createElement('div');
    flt.className = 'filterDiv';
	flt.setAttribute('data-id', filterId);
    flt.style.background = "url('images/filters/"+ filterId +".jpg') no-repeat center center";
    flt.style.backgroundSize = "cover";
	
    var fltTxt = document.createElement('span');
    fltTxt.className = 'filterSpan';
    fltTxt.innerHTML = filterName;
	flt.appendChild(fltTxt);
	
    fragment.appendChild(flt);
	
	flt.addEventListener('tap', fltHandler, false);
  }
  return fragment;
}

function fltHandler(e){
  e.preventDefault();
  e.stopPropagation();
  filterObj.filterVal = this.getAttribute('data-id');
  window.aisearch = "";
  filterMenuDestroy();
  StreammmAnalytics('event','Server','Filter');
  if(filterObj.filterVal == "all"){
    globalObj.streammmPlaylist.innerHTML = 'PLAYING ALL';
  }else{
    globalObj.streammmPlaylist.innerHTML = filterObj.filterVal;
  }
  botObj.textReply = ["Moving on to " + filterObj.filterVal +" ^1500"];
  botObj.voiceReply = 'Moving on to ' + filterObj.filterVal + '.';
  constructRequest("update");
  return;
}

function filterMenuDestroy(){
  var flts = document.getElementsByClassName('filterDiv');
  for (var i = 0; i < flts.length; i++) {
    flts[i].removeEventListener('tap', fltHandler);
  }
  var cancelFilter = document.getElementById('cancelFilter');
  cancelFilter.removeEventListener('tap', cancelHandler);
  var filterHeader = document.getElementById('filterHeader');
  document.body.removeChild( filterHeader );
  var filterWrapper = document.getElementById('filterWrapper');
  document.body.removeChild( filterWrapper );  
}

function cancelHandler(e){
  e.preventDefault();
  e.stopPropagation(); 
  filterMenuDestroy();
  streammmResume(false);
  return;
}

function newGradient() {
  var c1 = {
        r: Math.floor(35+Math.random()*220),
        g: Math.floor(35+Math.random()*220),
        b: Math.floor(Math.random()*255)
      };
      var c2 = {
        r: Math.floor(35+Math.random()*220),
        g: Math.floor(35+Math.random()*220),
        b: Math.floor(Math.random()*255)
      };
  c1.rgb = 'rgb('+c1.r+','+c1.g+','+c1.b+')';
  c2.rgb = 'rgb('+c2.r+','+c2.g+','+c2.b+')';
  return 'radial-gradient(at top left, '+c1.rgb+', '+c2.rgb+')';
}
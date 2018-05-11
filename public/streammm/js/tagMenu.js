var tagMenuObj = {};
tagMenuObj.needsRefresh = false;
tagMenuObj.feedBackEnabled = true;

tagMenuObj.popularTags = [{name:"Technology", id:"technology"}, {name:"Design", id:"design"}, {name:"Entertainment", id:"entertainment"}, {name:"World news", id:"world"}, {name:"United States",id:"usa-en"}, {name:"Fashion", id:"fashion"}, {name:"Business", id:"business"}, {name:"Food", id:"food"}, {name:"Sports", id:"sports"}, {name:"Architecture", id:"architecture"}, {name:"Science", id:"science"}, {name:"Movies", id:"movies"}, {name:"Graphic Design", id:"graphics"}];

tagMenuObj.countriesTags = [{name:"United States",id:"usa-en"}, {name:"Austria",id:"austria"}, {name:"Belgique (French)",id:"belgium-fr"}, {name:"Germany",id:"germany"}, {name:"France",id:"france"}, {name:"Greece",id:"greece"}, {name:"Italy",id:"italia"}, {name:"Sweden",id:"sweden"}, {name:"Switzerland",id:"switzerland-fr"}, {name:"United Kingdom",id:"united kingdom"}, {name:"China - 中国",id:"china"},{name:"National Only", id:"nationalonly"}];

tagMenuObj.tags = [{name:"World news", id:"world"}, {name:"Breaking news", id:"breaking"}, {name:"Business", id:"business"}, {name:"Entrepreneurship", id:"entrepreneurship"}, {name:"Startups", id:"startups"}, {name:"Lifestyle", id:"lifestyle"}, {name:"Entertainment", id:"entertainment"}, {name:"Gossip", id:"gossip"}, {name:"Sports", id:"sports"}, {name:"Science", id:"science"}, {name:"Environment", id:"environment"}, {name:"Politics", id:"politics"}, {name:"Technology", id:"technology"}, {name:"Gadgets", id:"gadgets"}, {name:"Gaming", id:"gaming"}, {name:"Movies", id:"movies"}, {name:"Cinema", id:"cinema"}, {name:"Films", id:"films"}, {name:"Design", id:"design"}, {name:"Inspiration", id:"inspiration"}, {name:"Arts", id:"arts"}, {name:"Photography", id:"photography"}, {name:"Graphic Design", id:"graphics"}, {name:"Architecture", id:"architecture"}, {name:"Decoration", id:"decoration"}, {name:"Interior", id:"interior"}, {name:"Fashion", id:"fashion"}, {name:"Style", id:"style"}, {name:"Food", id:"food"}, {name:"Cooking", id:"cooking"}, {name:"Recipes", id:"recipes"}, {name:"Finance", id:"finance"}, {name:"Economics", id:"economics"}, {name:"Money", id:"money"}, {name:"Marketing", id:"marketing"}, {name:"Branding", id:"branding"}];

function tagMenuCreate(welcome){
  if(welcome){
    tagMenuObj.needsRefresh = true;
  }else{
    tagMenuObj.needsRefresh = false;
    streammmPause();
  }
  var tagWrapper = document.createElement( 'div' );
  tagWrapper.className = 'menu-wrapper';

  var popularFragment = tagFraction(tagMenuObj.popularTags, "Popular Tags");
  tagWrapper.appendChild(popularFragment);

  var allFragment = tagFraction(tagMenuObj.tags, "All Tags"); 
  
  tagWrapper.appendChild(allFragment);

  var countriesFragment = tagFraction(tagMenuObj.countriesTags, "Countries");
  tagWrapper.appendChild(countriesFragment);
  
  if(tagMenuObj.feedBackEnabled === true){
    var feedbackFragment = feedbackFraction();
    tagWrapper.appendChild(feedbackFragment);
  }

  document.body.insertBefore( tagWrapper, document.body.firstChild );
  
  window.streammmType = new streammmTyper({strings : languageObj.menuTxt, type : 'botInfo', loop : true});

  var tagHeader = document.createElement( 'div' );
  tagHeader.className = 'menu-header';
  tagHeader.innerHTML = '<div class="time-header"></div><a class="menuBtn" id="saveTags">Save</a>';
  document.body.insertBefore( tagHeader, document.body.firstChild );
  var saveTags = document.getElementById('saveTags');
  saveTags.addEventListener('tap', saveHandler, false);
}

function tagMenuDestroy(){
  var tags = document.getElementsByClassName('tag');
  for (var i = 0; i < tags.length; i++) {
    tags[i].removeEventListener('tap', tagHandler);
  }
  var saveTags = document.getElementById('saveTags');
  saveTags.removeEventListener('tap', saveHandler);
  
  if(tagMenuObj.feedBackEnabled === true){
    var feedBackButton = document.getElementById('feedBackButton');
    feedBackButton.removeEventListener('tap', feedBackHandler);
  }
	
  var tagHeader = document.getElementsByClassName('menu-header');
  document.body.removeChild( tagHeader[0] );
  var tagWrapper = document.getElementsByClassName('menu-wrapper');
  document.body.removeChild( tagWrapper[0] );  
}

function tagFraction(arr,name){
  var fragment = document.createDocumentFragment();
  var tagSeparator = document.createElement( 'div' );
  tagSeparator.className = 'tag-separator';
  tagSeparator.innerHTML = '<p>'+name+'</p>';
  fragment.appendChild(tagSeparator);
  for (var t = 0; t < arr.length; t++) {
    var tagName = arr[t].name;
    var tagId = arr[t].id;
    var tag = document.createElement('div');
    if (settingsObj.userTags.containsArray(tagId)) {
      tag.className = 'tag checked '+ tagId;
	}else{
      tag.className = 'tag '+ tagId;
	}
	tag.setAttribute('data-id', tagId);
    tag.innerHTML = tagName+'<svg class="fa fa-plus" viewBox="0 0 1792 1792"><use class="fasvg" xlink:href="#fa-plus" x="0" y="0"></use></svg><svg class="fa fa-check" viewBox="0 0 1792 1792"><use class="fasvg" xlink:href="#fa-check" x="0" y="0"></use></svg>';
    fragment.appendChild(tag);
	tag.addEventListener('tap', tagHandler, false);
  }
  return fragment;
}

function tagHandler(e){
  e.preventDefault();
  e.stopPropagation();
  tagMenuObj.needsRefresh = true;
  var dataId = this.getAttribute('data-id');
  var tags = document.getElementsByClassName(dataId);
  if(this.classList.contains('checked')){
    for (var i = 0; i < tags.length; i++) {
      tags[i].classList.remove('checked');
      tags[i].classList.remove('flicked');
    }
  }else{
    for (var i = 0; i < tags.length; i++) {
      tags[i].classList.add('checked');
      tags[i].classList.add('flicked');
    }
  }
}
 
function saveHandler(e){
  e.preventDefault();
  e.stopPropagation();
  this.removeEventListener('tap', saveHandler);
  settingsObj.userTags = [];
  var userTags = document.getElementsByClassName('checked');
  for (var i = 0; i < userTags.length; i++) {
    var tagId = userTags[i].getAttribute('data-id');
    if (!settingsObj.userTags.containsArray(tagId)) {
      settingsObj.userTags.push(tagId);   
    }
  }
  window.localStorage.setItem('userTags', JSON.stringify(settingsObj.userTags));
  tagMenuDestroy();
  if(tagMenuObj.needsRefresh){
    filterObj.filterVal = "all";
    window.aisearch = "";
    streammmResume(true);
    StreammmAnalytics('event','Server','Tag Menu');
    if(window.firstRun === true){
      window.firstRun = false;
      constructRequest(true);
    }else{
      globalObj.streammmPlaylist.innerHTML = 'PLAYING ALL';
      constructRequest("update");
    }
  }else{
    streammmResume(false);
  }
  return;
}

function feedbackFraction(){
  var fragment = document.createDocumentFragment();
  var tagSeparator = document.createElement( 'div' );
  tagSeparator.className = 'tag-separator';
  tagSeparator.innerHTML = '<p>Have any Questions ?</p>';
  fragment.appendChild(tagSeparator);
  var feedBackButton = document.createElement( 'div' );
  feedBackButton.id = 'feedBackButton';
  feedBackButton.innerHTML = "Questions / Feature requests";
  fragment.appendChild(feedBackButton);
  feedBackButton.addEventListener('tap', feedBackHandler, false);
  return fragment;
}

function feedBackHandler(e){
  e.preventDefault();
  e.stopPropagation();
  var crispUrl = "https://go.crisp.chat/chat/embed/?website_id=78db0278-a3ef-4602-b4e0-d21c16dfbaba";
  if (typeof window.plugins !== 'undefined'){
    var ref = window.open(crispUrl, '_blank', 'location=no');
//      ref.addEventListener('exit', function(){streammmResume(false);});
  }else{
    var ref = window.open(crispUrl, '_blank', 'location=no');
  }
  return;
}
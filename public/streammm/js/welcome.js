function welcomeStreammm() {
  var str = '';
  str += '<div id="countrySelect">';
  str += '<div id="countrySelector">';
  
  str += '<select id="welcomeSel" name="Select your country">';
  str += '<option value="" selected disabled>Select your country</option>';

  for (var i = 0; i <  tagMenuObj.countriesTags.length-1; i++) {
    var countryId = tagMenuObj.countriesTags[i].id;
    var countryName = tagMenuObj.countriesTags[i].name;
    str += '<option data-id="'+countryId+'">'+countryName+'</option>';
  }

  str += '</select>';
  str += '</div>';
  str += '</div>';
  str += '<div id="welcomenxtBtn" class="nxtBtn" style="display:none;">Ok</div>';

  document.body.insertAdjacentHTML('afterbegin', str);

  window.streammmType = new streammmTyper({strings : languageObj.countrySelect, type : 'botInfo'});
  var action = 0;
  if(globalObj.hasPlugins){
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
  }
  var welcomeSel = document.getElementById('welcomeSel');
  welcomeSel.addEventListener('change', function(e){
    e.preventDefault();
    e.stopPropagation();
	var data_id = welcomeSel.options[this.selectedIndex].getAttribute('data-id');
	var name = welcomeSel.options[this.selectedIndex].getAttribute('data-name');	
    languageObj.globalLng = data_id;
    window.localStorage.setItem('globalLng', data_id);
	settingsObj.userTags.push(data_id); 
    window.localStorage.setItem('userTags', JSON.stringify(settingsObj.userTags));
	document.getElementById('welcomenxtBtn').style.display = 'block';
  }, false);	
  document.getElementById('welcomenxtBtn').addEventListener('tap', function(e){
    e.preventDefault();
    e.stopPropagation();
    if(action === 0){
      document.getElementById('main-render').style.display = 'none';
      window.streammmType = new streammmTyper({strings : languageObj.aiTut1, type : 'botInfo'});
      this.innerHTML = "Next";
	  var countrySelect = document.getElementById('countrySelect');
	  countrySelect.parentNode.removeChild(countrySelect);
	  action = 1;
	}else if(action == 1){
      window.firstRun = true;
      window.localStorage.setItem('firstRun', false);
      window.localStorage.setItem('isRated', false);
      loadSettings();
	  tagMenuCreate(true);
      this.parentNode.removeChild(this);
	  document.getElementById('main-render').style.display = 'inline-block';
	  if(globalObj.hasPlugins){
        cordova.plugins.Keyboard.disableScroll(true);
      }
	}
  }, false); 
}
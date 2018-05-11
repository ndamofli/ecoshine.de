function isDigit(n) {
    return Boolean([true, true, true, true, true, true, true, true, true, true][n]);
}
function getVal(array, id, key) {
  var obj = array.filter(function (val) {
    return val.id === id;
  });
  return obj[0][key];
}

function changeVal(id,key,newval,array) {
   for (var i in array) {
     if (array[i].id == id) {
        array[i][key] = newval;
        break;
     }
   }
}

function findVal(source, id) {
  var found = false;
  for (var i = 0; i < source.length; i++) {
    if (source[i].id === id) {
	  found = true;
      break;
    }
  }
  return found;
}

function delVal(source, id) {
  for (var i = 0; i < source.length; i++){
    if (source[i].id && source[i].id === id) { 
      source.splice(i, 1);
      break;
    }
  }
}

function hexToRgb(hex) {
  var h=hex.replace('#', '');
  h =  h.match(new RegExp('(.{'+h.length/3+'})', 'g'));
  for(var i=0; i<h.length; i++)
    h[i] = parseInt(h[i].length==1? h[i]+h[i]:h[i], 16);
    var obj = {
      r:  h[0],
      g: h[1],
      b: h[2]
    };
  return obj;
}

function getFirstWord(str) {
 if (str.indexOf(' ') === -1){
  return str;
 }else{
  return str.substr(0, str.indexOf(' '));
 }
}

function convertSpecials(str){
  str = str.replace(/&amp;/g, "&");
  str = str.replace(/&apos;/g, "/'");
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/&quot;/g, '"/');
  str = str.replace(/'/g, "&#039;");
  return str;
}

Array.prototype.containsArray = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

function arrayRemove(arr, item) {
  for(var i = arr.length; i--;) {
    if(arr[i] === item) {
      arr.splice(i, 1);
    }
  }
}

function xtnd(destination, source) {   
  for (var property in source) {
    destination[property] = source[property];
  }
  return destination;
}
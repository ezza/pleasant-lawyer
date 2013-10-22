// Will only run on the domain speicifed in the manifest.json!

var div = document.getElementsByClassName("show-beetil-header-1")[0];

if (div) {
  var spans = div.getElementsByTagName("span");
  for (var i=0; i<spans.length; i++){
    var span = spans[i],
        text = span.innerHTML,
        result = text.match(/\#\d+/);
    if (result) {
      chrome.runtime.sendMessage({number: parseInt(result[0].substring(1))}, function(phrase) {
        span.innerHTML = text + ' "' + phrase + '"';
      });
      break;
    }
  }
}

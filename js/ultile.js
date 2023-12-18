// main function

// smooth scroll
jQuery(document).ready(function($){
  var $root = $('html, body');
  $('a[href^="#"]').click(function() {
      var href = $.attr(this, 'href');
      var dis = 0;
      if(href != 'top'){
        dis = $(href).offset().top - 60;
      }
      $root.animate({scrollTop: dis}, 800);
      return false;
      
});
function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

});
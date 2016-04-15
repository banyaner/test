var myScroll;
function loaded () {
  myScroll = new IScroll('#wrapper', { mouseWheel: true });
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
$(document).ready(function(){
  // $('body').height = window.innerHeight + 'px';

  var $doc2 = $('#doc2');
  $('#question').on('tap', function(event) {
    $doc2.css({'z-index':'2'});
     $('html,body').css({
                overflow: 'hidden'
            });
  });

  $('.content').on('tap',function(event) {
    event.stopPropagation();
  });
  $doc2.on('tap', function(event) {
    $doc2.css({'z-index':'-1'});
     $('html,body').css({
                overflow: 'auto'
            });
  });
  $('#download').on('tap',function(event) {
    window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.youdao.huihui.deals";
  });
  var ratio = $('.hd img').width() / 640;
  $('#question').attr('coords', 575 * ratio + "," + 34 * ratio + "," + 34 * ratio);
  $('#download').attr('coords', 156 * ratio + "," + 573 * ratio + "," + 492 * ratio + "," + 636 * ratio);
  $('.sum').css({'top':430 * ratio + 'px','left':190 * ratio + 'px'});
  $('.code').css({'top':530 * ratio + 'px','left':365 * ratio + 'px'});
});
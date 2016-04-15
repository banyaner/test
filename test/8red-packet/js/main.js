<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="http://zhushou.corp.youdao.com/api/wxauth"></script>
<script type="text/javascript">
  wx.config({
    appId: _wx_auth.appId,
    timestamp: _wx_auth.timestamp,
    nonceStr: _wx_auth.nonceStr,
    signature: _wx_auth.signature,
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo'
    ]
  });
  window.red_text="",red_imgurl="",red_share="";
  $(document).ready(function(){
    $.ajax({
      url:'code_share/share_info.json',
      dataType:'jsonp',
      success:function(data){
        red_text=data.text;
        red_imgurl=data.url;
        red_share=data.share_url;
        wx.ready(function () {
      wx.onMenuShareAppMessage({
          title: '红包分享-惠惠',
          desc: red_text,
          link: red_share,
          imgUrl: red_imgurl
      });
      // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
      wx.onMenuShareTimeline({
          title: red_text,
          link: red_share,
          imgUrl: red_imgurl
      });
      // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
      wx.onMenuShareQQ({
           title: '红包分享-惠惠',
          desc: red_text,
          link: red_share,
          imgUrl: red_imgurl
      });
      });
      }
    });
    $('#submitEmail').on('tap',function(e){
      var $sum=$('.sum'),$account=$('.account');
      var $inputemail = $('.inputemail');
      var email = $inputemail.val();
      if (email === "" || email.length === 0) {
        $('#hint').text("输入不能为空");
        }
      else {
        var pattern = /^[a-z0-9\-_.]+@(((((vip\.)?(163|126))|188)\.com)|(yeah\.net))$/;
        if (pattern.test(email)) {
          $.ajax({
            url:'/code_share/pick_code',
            data:{
              email:email
            },
            dataType:'jsonp',
             beforeSend: function () {
                 $('#submitEmail').unbind('tap');
             },
            success:function(data){
              $('#doc2').removeClass('hidden');
              $('#doc1').addClass('hidden');
              $('a').attr('href','#');
              setTimeout(function(){
                $('a').attr('href','http://a.app.qq.com/o/simple.jsp?pkgname=com.youdao.huihui.deals');},1000);
              if (data.status === "succ") {
                $sum.append("<span>"+(data.data)/100+"</span>元");
                $account.append("<p>恭喜您！现金券已放入您的网易账户"+email+"中，登录即可立刻用券抵现金啦！</p>");//领取成功
              }
              else{
                $sum.append("<span>Sorry<span>");
                $account.append("<p>"+data.message+"</p>");
                }
              },
            error: function() {
              alert('请求失败');
             }
          });
        }else {
            $('#hint').text("请输入网易邮箱账号哦（163，126，yeah）！");
        }
      }
    });
  });
</script>
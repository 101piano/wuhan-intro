
//CMD规范
/*define(function(require,exports,module){
  var jquery=require('jquery');
  var Carousel=require('tools/carousel');
  
  //do sth
});*/


//AMD规范
define(['jquery','tools/carousel','tools/lazyload','tools/gotop','tools/gowhere','tools/waterfall'],function($,Carousel,LazyLoad,GoTop,GoWhere,WaterFall){

  new GoTop();
  
  new Carousel($('#header .carousel'));
  LazyLoad.init($('.historical-sites ul img').not('.loaded'),showImg);
  LazyLoad.init($('.historical-sites ul p').not('.loaded'),showText);
  
  GoWhere.init($('.loadmore'),$('.three-towns'));
  GoWhere.init($('.navul li').eq(0),$('.three-towns'));
  GoWhere.init($('.navul li').eq(1),$('.snacks'));
  GoWhere.init($('.navul li').eq(2),$('.historical-sites'));
  GoWhere.init($('.navul li').eq(3),$('.events'));
  GoWhere.init($('.navul li').eq(4),$('.contacts'));

  var parameters={
    pageIndex:1,
    pageCount: 8
  };
 
 new WaterFall(parameters,$('.container'));
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  function showImg($img){
    var imgUrl=$img.attr('data-src');
    $img.attr('src',imgUrl);
    $img.addClass('loaded');
  }
  
  function showText($text){
    $text.css({
      'opacity': 1
    });
    $text.addClass('loaded');
  }
})




































































define(['jquery'],function($){
  function Exposure($target,callback){
    this.target=$target,
    this.callback=callback;
    this.bind();
  }
  Exposure.prototype={
    bind: function(){
      var _this=this;
      $(window).on('scroll',function(){
       
        if(_this.isShow()){
          _this.callback(_this.target);
        }        
      });
    },
    isShow:function(){
      var windowHeight=$(window).height();//���ڸ߶�
      var scrollTop=$(window).scrollTop();//���ָ߶�
      var offsetTop=this.target.offset().top;//Ԫ�ؾ��ĵ��߶�
      var nodeHeight=this.target.height();//Ԫ�ظ߶�
      if(scrollTop<(offsetTop+nodeHeight) && offsetTop<(windowHeight+scrollTop)){
        return true;
      }else {
        return false;
      }
    }   
  }
  
  var LazyLoad=(function(){
    return {
      init:function($nodes,callback){
        $nodes.each(function (index,node){
          new Exposure($(node),callback);
        })
      }   
    }
  })();
    
  return LazyLoad;
})
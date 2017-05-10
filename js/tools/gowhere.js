define(['jquery'],function($){
  
  
  function _GoWhere($node,$target){
    this.init($node,$target);
    this.bind();
    
  }
  _GoWhere.prototype={
    init: function($node,$target){
      this.node=$node;
      this.target=$target;
      
    },
    bind: function(){
      var _this=this;
      _this.node.on('click',function(e){
        e.preventDefault();
        $(document.body).scrollTop(_this.target.offset().top);
      });     
    }
    
  }
  var GoWhere=(function(){
    return{
      init:function($node,$target){
        new _GoWhere($node,$target);
      }
    }
  })();
  
  return GoWhere;  
      
})
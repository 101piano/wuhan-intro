define(['jquery'],function($){
  function GoTop(){
    this.createNode();
    this.bind();
  }
  GoTop.prototype={
    createNode: function(){
      this.target=$('<div class="go-top"><a href="#">GoTop</a></div>');
      $(document.body).append(this.target);
      this.target.hide();
      this.target.css({
        'position': 'fixed',
        'bottom': '20px',
        'right': '20px',
        'width': '90px',
        'height': '90px',
        'border-radius': '50%',
        'background-color': '#ccc',
        'font-size': '20px',
        'color': '#fff',
        'line-height': '90px',
        'text-align': 'center',
        'cursor': 'pointer'
      });
    },
    
    bind: function(){
      var _this=this;
      $(window).on('scroll',function(){
        if($(this).scrollTop()>=300){
          _this.target.show();
        }else{
          _this.target.hide();
        }       
      });
      _this.target.on('click',function(e){
        e.preventDefault();
        $(document.body).animate({
          scrollTop: 0
        },500);
      });
    }
    
  }
  
  return GoTop;
});
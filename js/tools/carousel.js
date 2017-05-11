define(['jquery'],function($){
  
  function Carousel(ct){  
    this.init(ct);
    this.bind();
  }
  Carousel.prototype={
    init: function(ct){
      this.ct=ct;
      var carouselImg=this.carouselImg=this.ct.find('.carousel-img'),
          preBtn=this.preBtn=this.ct.find('.pre-btn'),
          nextBtn=this.nextBtn=this.ct.find('.next-btn'),
          navImgs=this.navImgs=this.ct.find('.nav-img');
      
      this.currentIndex=0;
      this.isAnimate=false;

      
       //未复制前的个数
      this.imgNum=carouselImg.children().length;
      this.liWidth=carouselImg.find('li').width();
   
      //复制
      var firstImg=this.firstImg=carouselImg.find('li').first(),
          lastImg=this.lastImg=carouselImg.find('li').last();
          
      //插入
      carouselImg.prepend(lastImg.clone());
      carouselImg.append(firstImg.clone());
      //将carouselImg的宽度变大
      carouselImg.css('width',carouselImg.children().length*this.liWidth);
      carouselImg.css('left',-(this.liWidth));
    },
    bind:function(){
      var _this=this;
      setInterval(function(){_this.playNext(1)},2000);
      
      this.preBtn.on('click',function(){
        _this.playPre(1);
      });
      
      this.nextBtn.on('click',function(){
        _this.playNext(1);
      });  
      
      this.clicknavImg();
    },
    playPre:function(num){
      var _this=this;
      if(_this.isAnimate) return;
      _this.isAnimate=true;
      this.carouselImg.animate({
          left: '+='+num*_this.liWidth
        },function(){
          _this.currentIndex-=num;
          if(_this.currentIndex<0){
            _this.carouselImg.css('left',-(_this.liWidth*_this.imgNum));
            _this.currentIndex=_this.imgNum-1;
          }
          _this.setnavImg(_this.currentIndex);
          _this.isAnimate=false;
      });
    },
    playNext:function(num){
      var _this=this;
      if(_this.isAnimate) return;
      _this.isAnimate=true;
      this.carouselImg.animate({
          left: '-='+num*_this.liWidth
        },function(){
          _this.currentIndex+=num;
          if(_this.currentIndex==_this.imgNum){
            _this.carouselImg.css('left',-(_this.liWidth));
            _this.currentIndex=0;
          }
          _this.setnavImg(_this.currentIndex);
          _this.isAnimate=false;
      });
    },
    setnavImg:function(index){
      $(this.navImgs).children().removeClass('active')
                                .eq(index)
                                .addClass('active');
    },
    
    clicknavImg: function(){
      var _this=this;
      _this.navImgs.on('click','li',function(){
        var len=$(this).index()-_this.currentIndex;
        if(len>=0){
          _this.playNext(len);
        }else {
          _this.playPre(-len);
        }        
      });
      _this.navImgs.on('mouseover','li',function(){
        $(this).addClass('active');
      });
      _this.navImgs.on('mouseout','li',function(){
        $(this).removeClass('active');
      });
    }   
  }
  
  return Carousel;
});
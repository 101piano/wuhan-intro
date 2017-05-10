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
      
       //δ����ǰ�ĸ���
      this.imgNum=carouselImg.children().length;
      this.liWidth=carouselImg.find('li').width();
   
      console.log(this.liWidth);
      //����
      var firstImg=this.firstImg=carouselImg.find('li').first(),
          lastImg=this.lastImg=carouselImg.find('li').last();
          
      //����
      carouselImg.prepend(lastImg.clone());
      carouselImg.append(firstImg.clone());
      //��carouselImg�Ŀ�ȱ��
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
    }

   
  }
  
  return Carousel;
});
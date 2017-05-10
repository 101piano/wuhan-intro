define(['jquery'],function($){
  
  function WaterFall(parameters,$ct){
    this.init(parameters,$ct);
    this.getData();
    this.bind();
  }
  WaterFall.prototype={
    
    init: function(parameters,$ct){
      this.ct=$ct;
      this.parameters=parameters;
      var imgWaterfall=this.imgWaterfall=this.ct.find('.img-waterfall'),
          ctWidth=this.ctWidth=this.ct.find('.img-waterfall').width();
          
      var nodeArr=this.nodeArr=[],
          loadMore=this.loadMore=this.ct.find('.load-more');
     
          
      var isDadaArrive=true;
        
    },
    bind: function(){
      var _this=this;
      
      _this.loadMore.on('click',function(e){
        e.preventDefault();
        var script=$('<script src="http://platform.sina.com.cn/slide/album_tech"></script>');
        $(document.body).append(script);
        if(_this.isDataArrive){
          _this.getData();
        }else {
          return;
        }
      });
    },
    getData: function() {   
      this.isDataArrive=false;
      var _this=this;
      $.ajax({
        url: 'http://platform.sina.com.cn/slide/album_tech',
        method: 'get',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        data: {
          app_key: '1271687855',
          format: 'json',
          size: 'img',
          page: _this.parameters.pageIndex,
          num: _this.parameters.pageCount
        }
      }).done(function(result){
        if(result.status.code==0){
          _this.isDataArrive=true;
          var nodedatas=_this.appendHtml(result.data);
          _this.isImgLoad(nodedatas);
          _this.parameters.pageIndex++;
        }
      }).fail(function(){
        alert('系统出错了');
      });
    },
    appendHtml: function(datas){
      var html='';
      $.each(datas,function(){
        html+='<li class="item">';
        html+=  '<a href="javascript:void(0)" class="link"><img src='+this.img_url+'></a>'
        html+=  '<h3 class="header">'+this.short_name+'</h3>'
        html+=  '<p class="introduce">'+this.short_intro+'</p>'
        html+='</li>';
      });
      var nodes=$(html);
      this.imgWaterfall.append(nodes);
      return nodes;
    },
    isImgLoad: function(imgs){
      var _this=this;
      imgs.each(function(){
        $(this).find('img').on('load',function(){
          _this.waterFall($(this));
        });
      });
    },
    waterFall: function(node){
      var nodeParent=node.parents('li');
      var nodeWidth=nodeParent.outerWidth(true);
      var columnNum=parseInt(this.ctWidth/nodeWidth);
      
      if(this.nodeArr.length==0){
        for(var i=0;i<columnNum;i++){
          this.nodeArr.push(0);
        }
      }
      
      var minValue=Math.min.apply(null,this.nodeArr);
      var minIndex=this.nodeArr.indexOf(minValue);
      var _this=this;
      nodeParent.css({
        top: _this.nodeArr[minIndex],
        left: nodeWidth*minIndex
      });
      _this.nodeArr[minIndex]+=nodeParent.outerHeight(true);
      _this.imgWaterfall.height(Math.max.apply(null,_this.nodeArr));
    }
    
    
  }
  
  return WaterFall;
  
})
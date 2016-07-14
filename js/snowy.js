/*
  * version:1.0
  * author:MrZHu
  * Date:2016/7/14
*/

 var snowyPic=$("img").eq(0); //雪花标本
    
     //雪花位置随机数
     function randomAt(){
        var widthPos = Math.random().toString().slice(0,5);
        widthPos =widthPos*1000; 
        if(widthPos >= $(window).width()) widthPos=$(window).width()-100;
        return widthPos;
     }


     //生产雪花标本
     function snowyCreate(speed,size){
        this.speed=speed; //雪花速度
        this.pos_x=randomAt();  //横坐标
        this.pos_y=0;  //纵坐标

        var self=this;
        this.create=function(){ 
          var random=Math.random()+Math.random();
          random=random.toString().slice(2,9);  //id有长度限制
          $("body").append("<img src='img/snow.png' id= '"+random+"'/>");
          var _star=$("#"+random);
          if(size === "normal"){ var snowySize="60px";}
          else if(size === "small"){ var snowySize="30px";}
           else if(size === "big"){var snowySize="90px";}
           _star.css({width:snowySize});
           _star.offset({left:this.pos_x,top:this.pos_y});
          return _star;
        };

        //下落
        this.drift=function(domOb){
           
            var _star=domOb;
            var drop=setInterval(function(){
               //self.pos_x=self.pos_x + Math.random()*50;
               self.pos_x=self.pos_x + 20;
               self.pos_y=self.pos_y +40;
               var _option={
                 left: self.pos_x,
                  top: self.pos_y,
               };
                  if(_star.offset().top <= $(window).height()-100 && _star.offset().left <= $(window).width()-100){
                     _star.offset(_option);

                  }
                  else {
                     _star.remove();
                     clearInterval(drop);
                  }
                },self.speed);
           } ;

             this.drift(this.create());
   }

    //提取参数
     var options={
        speed:function(){
          if(snowyPic.attr("speed") ==="slow") return 100;
          else if(snowyPic.attr("speed") === "normal") return 75;
            else if(snowyPic.attr("speed") === "fast")  return  50;
              else {alert("格式设置有误！"); clearInterval(produce);}
          },
        size:snowyPic.attr("size")
     };

     //测试
    var produce= setInterval(function(){
         var snowy = new snowyCreate(options.speed(),options.size);
    },250);
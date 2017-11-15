window.onload=function(){

    var header=document.querySelector('#header');
    var ul=document.querySelector('#banner');
    var ulLiArr=ul.querySelectorAll('li');
    var ol=document.querySelector('#points');
    var olLiArr=ol.getElementsByTagName('li');

    var iwidth=document.documentElement.clientWidth;
    ul.style.width=iwidth*ulLiArr.length+'px';


    for(var i=0;i<ulLiArr.length;i++){
        ulLiArr[i].style.width=iwidth+'px';
    }


    //header搜索框变色；
    var imgHeight = ul.offsetHeight;
    window.onscroll= function () {
        var bili=0.85*(document.body.scrollTop)/imgHeight;
        bili=bili>=0.85?0.85:bili;
        header.style.backgroundColor="rgba(201, 21, 35,"+bili+")";
    }
    //根据ul中的li的个数生成li添加到ol中;
    for(var i=0;i<ulLiArr.length;i++){
        var newLi=document.createElement('li');
        ol.appendChild(newLi);
    }



    //ul.appendChild(ulLiArr[0].cloneNode(true));
    var startx=0;
    var endx=0;
    var disx=0;
    var index=0;

    ul.addEventListener('touchstart', function (e) {
        startx= e.touches[0].clientX;
    })
    ul.addEventListener('touchmove', function (e) {
        endx= e.touches[0].clientX;
        disx=Math.abs(startx-endx);
    })
    ul.addEventListener('touchend', function (e) {
        if(startx-endx>0){
            if(disx>30){
                index--;
                index=index<=0?0:index;

                ul.style.transform="translateX("+(-iwidth*index)+"px)";
                transPoint(index);
            }
        }else{
            if(disx>30){
                index++;
                index=index>=ulLiArr.length?ulLiArr.length-1:index;


                ul.style.transform="translateX("+(-iwidth*index)+"px)";
                transPoint(index);
            }
        }
        disx=0;
    })
    //点亮第一张
    olLiArr[0].classList.add('current');

    var killTime=10000;
    var djs=document.querySelectorAll('.main .count span');
    //console.log(djs);
    var timer=setInterval(function () {
        killTime--;
        if(killTime<=0){
            killTime=0;
        }
        var h=toDouble(Math.floor(killTime%86400/3600));
        var m=toDouble(Math.floor(killTime%86400%3600/60));
        var s=toDouble(Math.floor(killTime%60));

        djs[0].innerHTML=Math.floor(h/10);
        djs[1].innerHTML=h%10;

        djs[3].innerHTML=Math.floor(m/10);
        djs[4].innerHTML=m%10;

        djs[6].innerHTML=Math.floor(s/10);
        djs[7].innerHTML=s%10;

    },1000)

    function transPoint(index){
        for(var i=0;i<olLiArr.length;i++){
            olLiArr[i].classList.remove('current');
        }
        olLiArr[index].classList.add('current');
    }

    function toDouble(msg){
        return msg<10?'0'+msg:msg+'';
    }






}
/**
 * Created by Administrator on 2017/11/8.
 */
window.onload= function () {

    var header=document.querySelector('.header');
    var banner=document.querySelector('.banner');
     var bannerUl=banner.querySelector('ul');
    var liArr=bannerUl.querySelectorAll('li');
    var iwidth=document.documentElement.offsetWidth;
    var points=document.querySelector('#points');
console.log(iwidth)

    window.onscroll= function () {
        var ulHeight=bannerUl.offsetHeight;
        var bili=0.85*window.scrollY/ulHeight;
        //console.log(iwidth);
        //console.log(bili);
        bili=bili>=0.85?0.82:bili;
        header.style.backgroundColor="rgba(201, 21, 35,"+bili+")";
    }


    var startx=0;
    var movex=0;
    var disx=0;
    var index=0;
    var timer1=null;
    for(var i=0;i<liArr.length;i++){
        liArr[i].style.width=iwidth+'px';
        pointLi=document.createElement('li');
        pointLi.index=i;
        points.appendChild(pointLi);
    }

    var pointLiArr=points.querySelectorAll('li');
    //克隆第一张海报图
    bannerUl.appendChild(liArr[0].cloneNode(true));

    bannerUl.style.width=(liArr.length+1)*iwidth+'px';
    pointLiArr[0].classList.add('pActive');
    //console.log(pointLiArr);



    bannerUl.addEventListener('touchstart', function (e) {
        //console.log(e);
        startx= e.touches[0].clientX;
        clearInterval(timer1);
    })
    bannerUl.addEventListener('touchmove', function (e) {
        //console.log(e);
        movex= e.touches[0].clientX;
        disx=movex-startx;
        console.log(Math.abs(disx));
    })
    bannerUl.addEventListener('touchend', function (e) {
        if(Math.abs(disx)>30&&disx<0){
            index++;
            index=index>=liArr.length?liArr.length-1:index;
            bannerUl.style.transform="translateX("+(-index*iwidth)+"px)";
            updatePoint(pointLiArr,index);
        }
        if(Math.abs(disx)>30&&disx>0){
            index--;
            index=index<=0?0:index;
            bannerUl.style.transform="translateX("+(-index*iwidth)+"px)";
            updatePoint(pointLiArr,index);
        }
        if(Math.abs(disx)>30){
             timer1=setInterval(function () {
                index++;
                index=index>=liArr.length?0:index;
                bannerUl.style.transform="translateX("+(-index*iwidth)+"px)";
                updatePoint(pointLiArr,index);

            },1500)
        }
        disx=0;
    })


     timer1=setInterval(function () {
        index++;

         //index=index>=liArr.length?0:index;
         if(index<=liArr.length){
             bannerUl.style.transition="all 0.4s";

             bannerUl.style.transform="translateX("+(-index*iwidth)+"px)";
            //if(index==liArr.length){
            //    index=liArr.length+1;
            //}
         }
         if(index>liArr.length){
             bannerUl.style.transition='none';
             bannerUl.style.transform="translateX(0)";

             index=0;
         }
        console.log(bannerUl.style.transform.match(/translateX\((.*)\)/)[1]);

         //if(index>liArr.length){
         //    bannerUl.style.transition='none';
         //
         //    bannerUl.style.transform="translateX(0)";
         //
         //    index=0;
         //}




         /*if(index==liArr.length){
             bannerUl.style.transition="all 0.4s";

             bannerUl.style.transform="translateX("+(-index*iwidth)+"px)";
             index=liArr.length+1;
             console.log(x);

         }
         if(index>liArr.length){
             bannerUl.style.transition='none';
             bannerUl.style.transform="translateX(0)";
             index=0;
         }*/

         if(index>liArr.length) {
             bannerUl.style.transition = 'none';
             bannerUl.style.transform = "translateX(0)";
             index = 0;
         }


             /*if(index>liArr.length){
                 //bannerUl.style.transform="translateX("+(-index*iwidth)+"px)";
                 bannerUl.style.transition='none';
                 bannerUl.style.transform="translate(0,0)";
                 index=0;
                 console.log(1)
             }
             if(index==0){
                 bannerUl.style.transition="all 0.4s";
                 index=1;
                 bannerUl.style.transform="translateX("+(-index*iwidth)+"px)";
             }*/
         //else{
         //    bannerUl.style.transform="translateX("+(-index*iwidth)+"px)";
         //}
         translating(bannerUl,index);
        updatePoint(pointLiArr,index);


    },1500)

    function translating(ele,index){
        clearInterval(ele.timer1);
        ele.timer1=setInterval(function () {
            ele.style.transition="all 0.4s";
            ele.style.transform="translateX("+(-index*iwidth)+"px)";
            if(Math.abs(ele.style.transform.match(/translateX\((.*)\)/)[1])+""==index*iwidth+"px"){
                clearInterval(ele.timer1);
            }
        },1)

    }
    
    function updatePoint(point,index){
        for(var i=0;i<point.length;i++){
            point[i].classList.remove('pActive');
        }
        point[index].classList.add('pActive');
    }



    var djs=document.querySelector('.djs');
    var djsLi=djs.querySelectorAll('li');
    var killtime=10000;
    var timer2=setInterval(function () {

        var hour=toDouble(Math.floor(killtime%86400/3600));
        var mintue=toDouble(Math.floor(killtime%86400/3600/60));
        var seconds=toDouble(Math.floor(killtime%60));

        djsLi[0].innerHTML=Math.floor(hour/10);
        djsLi[1].innerHTML=hour%10;
        djsLi[3].innerHTML=Math.floor(mintue/10);
        djsLi[4].innerHTML=mintue%10;
        djsLi[6].innerHTML=Math.floor(seconds/10);
        djsLi[7].innerHTML=seconds%10;
        killtime--;
        killtime=killtime<=0?0:killtime;

    },1000)

    function toDouble(msg){
        return msg>=10?msg+'':'0'+msg;
    }
    
    
}
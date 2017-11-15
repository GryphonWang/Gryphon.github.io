/**
 * Created by Administrator on 2017/11/7.
 */
window.onload = function () {
    leftSwipe();
    rightSwipe();

}

function leftSwipe() {
    /*
     1.获取要滚动的UL以及UL的父级
     2.确定正常的滚动范围
     3.确定最大的滚动范围
     4.为元素添加滚动事件
     5.确定滚动的距离
     */
    var left = document.querySelector('.container .left');
    var ul = left.querySelector('ul');
    var li = ul.querySelectorAll('li');

    var leftHeight = left.clientHeight;
    var ulHeight = ul.offsetHeight;

    //console.log(leftWidth);
    //console.log(ulWidth);

    var normalScrollDown = 0;
    var normalScrollUp = -677;

    var maxScrollDowd = normalScrollDown + 100;
    var minScrollup = normalScrollUp - 100;

    console.log(minScrollup);
    console.log(maxScrollDowd);

    var starty = 0;
    var endy = 0;
    var disy = 0;
    var curDisy = 0; //当前滚动位置

    left.addEventListener('touchstart', function (e) {
        //alert(1)
        starty = e.touches[0].clientY;
    })

    left.addEventListener('touchmove', function (e) {
        endy = e.touches[0].clientY;
        disy = endy - starty;
        console.log(disy );

        if (disy + curDisy > minScrollup && disy + curDisy < maxScrollDowd) {
            ul.style.transform = "translateY(" + (disy + curDisy) + 'px)';
            ul.style.transition='none';

        }

    })

    left.addEventListener('touchend', function (e) {
        curDisy = disy + curDisy;
        //console.log(disy);
        //console.log(curDisy);

        if(curDisy<normalScrollUp){
            curDisy=normalScrollUp;

            ul.style.transition='all 0.4s';
            //console.log(curDisy+'_上');
            ul.style.transform="translateY("+curDisy+"px)";
        }
        if(curDisy>normalScrollDown){
            curDisy=normalScrollDown;
            //console.log(curDisy+'_下');
            ul.style.transition='all 0.4s';
            ul.style.transform="translateY("+curDisy+"px)";
        }
        //console.log(curDisy);
    })
    tap(ul, function (e) {

        for(var i=0;i<li.length;i++){
            li[i].children[0].classList.remove('active');
            li[i].children[0].index=i;
        }
        e.target.classList.add('active');

        var willScrollPosition= -e.target.index*li[0].offsetHeight;
        if(willScrollPosition>normalScrollUp){
            console.log(willScrollPosition);
            ul.style.transform="translateY("+willScrollPosition+"px)";
            ul.style.transition='all 0.4s';
        }


    })
}

function rightSwipe(){
    itcast.iScroll({
        swipeDom:document.querySelector('.right'),
        swipeType:'y',
        swipeDistance:100
    })
}

function tap(dom,callback){

    var startTime=0;
    var isMove=false;

    dom.addEventListener('touchstart', function (e) {
        startTime=Date.now();
    })
    dom.addEventListener('touchmove', function (e) {
        isMove=true;
    })
    dom.addEventListener('touchend', function (e) {
        if(!isMove&&Date.now()-startTime<150){
            callback(e);
        }
        isMove=false;
        startTime=0;
    })


}
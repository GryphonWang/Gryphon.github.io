/**
 * Created by Administrator on 2017/11/9.
 */
window.onload= function () {
    var delArr=document.querySelectorAll('.botr');
    var mask=document.querySelector('.popBox');
    var textBox=document.querySelector('.textBox');
    var btn=document.querySelector('.btn');
    console.log(btn.children[0])
    var _this=null;
    for(var i=0;i<delArr.length;i++){
        delArr[i].addEventListener('click', function () {
            _this=this
            this.children[0].classList.add('open');
            mask.style.opacity="1";
            mask.style.zIndex="10";
            //textBox.classList.remove('active');
            textBox.classList.add('flipInY');
        })
        btn.children[0].addEventListener('click', function () {
            console.log(1);
            _this.children[0].classList.remove('open');
            mask.style.opacity="0";
            mask.style.zIndex="-1";
            //textBox.classList.add('active');
            textBox.classList.remove('flipInY');


        })
    }



}
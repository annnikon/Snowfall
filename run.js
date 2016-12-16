
// Кількість сніжинок (оптимально 30-400)
var snowmax=prompt("Введіть максимальну кількість сніжинок (оптимально від 30 до 300)",100);

// Зображення сніжинок
var snowletter="<img src='snow2.png' style='position: absolute; width: 10px;'>"

// Швидкість падіння (оптимально від 0.3 дo 2)
var sinkspeed= 2.0;

// Максимальний розмір сніжинок
var snowmaxsize=35

// Мінвмальний розмір сніжинок
var snowminsize=8

// Снігопадна зона
// 1- весь документ, 2- ліво
// 3-центр, 4 - право
var snowingzone=1

var snow=new Array()
var marginbottom
var marginright
var timer
var i_snow=0
var x_mv=new Array();
var crds=new Array();
var lftrght=new Array();

function faster(){
    sinkspeed++;
	}
function slower(){
	sinkspeed --;
	}

function randommaker(range) {
    rand=Math.floor(range*Math.random())
    return rand
}

function initsnow() {

        marginbottom = document.body.scrollHeight
        marginright = document.body.clientWidth-15

    var snowsizerange=snowmaxsize-snowminsize;
    for (i=0;i<=snowmax;i++) {
        crds[i] = 0;
        lftrght[i] = Math.random()*15;
        x_mv[i] = 0.03 + Math.random()/10;
        snow[i]=document.getElementById("s"+i)

        snow[i].size=randommaker(snowsizerange)+snowminsize


        snow[i].style.zIndex=1000
        snow[i].sink=sinkspeed*snow[i].size/5
        if (snowingzone==1) {snow[i].posx=randommaker(marginright-snow[i].size)}
        if (snowingzone==2) {snow[i].posx=randommaker(marginright/2-snow[i].size)}
        if (snowingzone==3) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/4}
        if (snowingzone==4) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/2}
        snow[i].posy=randommaker(2*marginbottom-marginbottom-2*snow[i].size)
        snow[i].style.left=snow[i].posx+'px';
        snow[i].style.top=snow[i].posy+'px';
    }
    movesnow()
}

function movesnow() {
    for (i=0;i<=snowmax;i++) {
        crds[i] += x_mv[i];
        snow[i].posy+=sinkspeed*snow[i].size/5
        snow[i].style.left=snow[i].posx+lftrght[i]*Math.sin(crds[i])+'px';
        snow[i].style.top=snow[i].posy+'px';

        if (snow[i].posy>=marginbottom-2*snow[i].size || parseInt(snow[i].style.left)>(marginright-3*lftrght[i])){
            if (snowingzone==1) {snow[i].posx=randommaker(marginright-snow[i].size)}
            if (snowingzone==2) {snow[i].posx=randommaker(marginright/2-snow[i].size)}
            if (snowingzone==3) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/4}
            if (snowingzone==4) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/2}
            snow[i].posy=0
        }
    }
    var timer=setTimeout("movesnow()",50)
}

for (i=0;i<=snowmax;i++) {
    document.write("<span id='s"+i+"' style='position:absolute;top:-"+snowmaxsize+"'>"+snowletter+"</span>")
}

    window.onload=initsnow


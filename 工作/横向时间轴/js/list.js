// JavaScript Document
var nav_position=0;
$(document).ready(function () {
	GetRequest();
	for (i = 1; i <= 2; i++) {
		$('#nav' + i).hover(function () {

			$('#nav' + i).css('background', '#018ee7');
		}, function () {
			$('#nav' + i).css('background', '#e1eaf2');
		});
	}
});

//获取url中"?"符后的字串
function GetRequest() {
	var url = location.search;
	if (url.indexOf('?') != -1) {
		var str = url.substr(1);
		strs = str.split('=');
		contentchange(strs[1]);
	}
}

function indexload() {
	// body...
	contentchange(14);
}

//更改三级栏目样式
function hidebg(flag) {
	document.getElementById('box_nav' + flag).style.background = '#daeffe';
	//document.getElementById('nav' + flag).style.background = '#daeffe';
	document.getElementById('nav' + flag).style.color = '#70879b';
}
function hidebg2(flag) {
	document.getElementById('box_nav' + flag).style.background = '#47a9f2';
	//document.getElementById('nav' + flag).style.background = '#47a9f2';
	document.getElementById('nav' + flag).style.color = '#e1eaf2';
}

function hidebg3(flag) {
	document.getElementById('box_nav' + flag).style.background = '#086fc6';
	//document.getElementById('nav' + flag).style.background = '#086fc6';
	document.getElementById('nav' + flag).style.color = '#e1eaf2';
	// body...
}
function showbg(flag) {
	// body...
	document.getElementById('box_nav' + flag).style.background = 'linear-gradient(to right,#47a9f2  ,rgb(0, 235, 255))';
	//document.getElementById('nav' + flag).style.background = 'linear-gradient(to right,#47a9f2  ,#daeffe';
	document.getElementById('nav' + flag).style.color = '#e1eaf2';
}


var changdu;
function juli(flag) {
	// body...
	document.getElementById('').style.transform
}


function contentchange(flag) {
	nav_position = flag;
	for (i = 1; i <= 15; i++) {
		if (i == flag) {
			document.getElementById('ky_source' + i).style.display = 'block';
			document.getElementById('ol').style.transform="translateX(-"+(i-1)*85+"px)";
			showbg(i);		
		}else{
			document.getElementById('ky_source' + i).style.display = 'none';
			hidebg(i);
			hidebg2(3);
			hidebg2(5);
			hidebg2(7);
			hidebg3(10);
			hidebg3(12);
			hidebg3(15);
		}
	}
}

//function main(){
//	a = 1;
//	if (a=1) {
//	document.getElementById('ky_source' + i).style.display = 'block';
//	}else{
//	document.getElementById('ky_source' + i).style.display = 'none';
//	}
//}
function hoverup(flag) {
	showbg(flag);
	showbg(nav_position);

}

function houverout(flag) {
	hidebg(flag);
	
	hidebg2(3);
	hidebg2(5);
	hidebg2(7);
	hidebg3(10);
	hidebg3(12);
	hidebg3(15);	
	showbg(nav_position);
}

var click;

function now() {
	// body...
	click = document.getElementById('ol').style.transform;
	return click;
}

function right() {
	// body..
	document.getElementById('ol').style.transform = now()+"translateX(-200px)";
}

function left() {
	// body...
	document.getElementById('ol').style.transform = now()+"translateX(+200px)";
}
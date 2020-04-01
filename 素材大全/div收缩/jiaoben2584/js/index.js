$(document).ready(function(){
	var a =$(".box");
	var c =window.innerWidth;
	if (c>1100) {
	    a.show();
	}else{
	   	a.hide();
	}
	window.onresize = function(){
		var b =window.innerWidth;
	    if (b>1100) {
	    	a.show(300);
	    }else{
	    	a.hide(300);
	    }
	}    
});



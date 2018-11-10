console.log("Ready 1");
var stop=false; //stop="info-box is shown"

function hideInfo(recursive, name){
	stop = false;
	$('.info-box').toggleClass('info-box-translate');
	setTimeout(function(){
		$('.info-content').hide();
	}, 500);
}

function showInfo(name){
	//If previous info-box still open
	if (stop==true){
		$('.info-content').hide();
		$('#info-'+name).show();
	}
	else if (stop==false){
		stop = true;
		// Show text corresponding to clicked icon
		$('#info-'+name).show();
		// Show or hide info box corresponding to clicked icon
		$('.info-box').toggleClass('info-box-translate');
	}
}

$(document).ready(function(){
	console.log("Ready 3");
	$('.info-content').hide();
	$('.close').click(function(){
		hideInfo();
	});
});

console.log("Ready 2");

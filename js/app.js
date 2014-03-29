//======================================Global Variables =================================
var next_page = 2;
var total_pages;
var initiated = 0;
$(document).ready(function(e) {	

//============================== category page functions ====================================	
	$('.cat').addClass('shake');
	$('.cat').each(function(i,v){
		var categories = localStorage.getItem('categories');
		if(categories !== null){
		categories = categories.split(',');
		var thisItem = $(this);
		var thisCategory = $(this).attr('data-title');
		$.each(categories,function(i,v){
			if(v == thisCategory){
				$(thisItem).removeClass('shake');
				$(thisItem).attr("data-check", "1");
			}
		});
		}
	});
	
    $('.cat').click(function(){
		$(this).toggleClass('shake');
		 var dataCheck = $(this).attr("data-check");
        if($(this).attr("data-check") == "0"){
             $(this).attr("data-check", "1");			
        } else if($(this).attr("data-check") == "1"){
             $(this).attr("data-check","0");
        }
        var cat = "";
        $('.cat').each(function(){
            if($(this).attr('data-check') == "1"){
                cat += "," + $(this).attr('data-title');
            }
        });
        localStorage.setItem("categories", cat.slice( 1 ));
	});
	$('.cat').click(function(){
		if(localStorage.getItem('categories') === null || localStorage.getItem('categories') === ''){
			$('#skipContinue').html('Skip');
		}else{
			$('#skipContinue').html('Continue');
		}
	});
	
	// divide things
	

//============================== add category page functions ====================================

$('.add').click(function(){
	var add = localStorage.setItem("add", true);
	location.href = 'index.html';	
});
	
//============================== player page functions ====================================

	$(function () {
		var video_id = GetParameterValues('v');
		var id = GetParameterValues('id');
		var des = GetParameterValues('des');
		var tit = GetParameterValues('title');
		var agotime$ = GetParameterValues('ago');
	});
	function GetParameterValues(param) {
		var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for (var i = 0; i < url.length; i++) {
			var urlparam = url[i].split('=');
			if (urlparam[0] == param) {
				return urlparam[1];
			}
		}
	}
	var videoLink = "http://www.youtube.com/embed/" + GetParameterValues('v') +"?html5=1";
	$('.wedeoplayer iframe').attr('src', videoLink).show();
	$('.description h1').html(decodeURIComponent(GetParameterValues('title')));
	$('.description span').html(decodeURIComponent(GetParameterValues('ago')));
	$('.description p').html(decodeURIComponent(GetParameterValues('des')));
	
	if($('#youtube-player-container').length > 0){
	jQuery("#youtube-player-container").tubeplayer({
			width: 100 + '%', // the width of the player
			height: 270 , // the height of the player
			allowFullScreen: "false", // true by default, allow user to go full screen
			initialVideo: GetParameterValues('v'), // the video that is loaded into the player
			preferredQuality: "hd720",// preferred quality: default, small, medium, large, hd720
			autoPlay: true,
			onPlay: function(id){}, // after the play method is called
			onPause: function(){}, // after the pause method is called
			onStop: function(){}, // after the player is stopped
			onSeek: function(time){}, // after the video has been seeked to a defined point
			onMute: function(){}, // after the player is muted
			onUnMute: function(){} // after the player is unmuted
		});
	}
});
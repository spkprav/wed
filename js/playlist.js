// JavaScript Document
//============================== playlist page functions ====================================
$(document).ready(function(){
if(localStorage.getItem("categories") == null){
		var url = 'http://video.apps.webpunditz.com/highlights';
	}else{
		var url = 'http://video.apps.webpunditz.com/highlights?c='+localStorage.getItem("categories");
	}
	
	 $.getJSON(url,function(e){
        $.each(e.videos, function(item,value){
            var thumb = "http://img.youtube.com/vi/" + value.video_id + "/hqdefault.jpg";
			var video = "http://www.youtube.com/embed/" + value.video_id +"/";
            $('.playlist ul').append('<li>' + '<img src="'+ thumb +'" alt="'+ value.video_id +'" data-id="' + value.videos.id+'" data-title="'+ value.title+'" data-des="'+value.description+'" data-ago="'+value.ago+'" >' + '<div class="discription"><div class="col-lg-10 title"><p>'+ value.title+'</p></div></div></li>');
            current_page = e.pages.current_page;
            next_page = e.pages.next_page;
            total_pages = e.pages.total_pages;
        });
		$('#loading').hide();
		
		$('.playlist ul li img').click(function(){
			var paramV = $(this).attr('alt');
			var paramId = $(this).attr('data-id');
			var paramdes = $(this).attr('data-des');
			var paramtitle = $(this).attr('data-title');
			var parago = $(this).attr('data-ago');
			window.location = "player.html?v="+ paramV + "&id="+paramId +"&des="+ paramdes +"&title=" + paramtitle+"&ago="+parago ;	
		});
    }).done(function(){
			$('.playlist ul li').addClass('slideUp');
		});


//============================== playlist infinite scroll page functions ====================================

    $(window).scroll(function() {
        if($(window).scrollTop() > ($('.playlist').height() - 600)) {		
            if(next_page < 10){
                if(initiated == 0){
                	initiated = 1;
                	if(localStorage.getItem("categories") == null){
						var sUrl = 'http://video.apps.webpunditz.com/highlights?page='+next_page
					}else{
						var sUrl = 'http://video.apps.webpunditz.com/highlights?c='+localStorage.getItem("categories")+'&page='+next_page;
					}
                    $.getJSON(sUrl,function(e){
                        $.each(e.videos, function(item,value){
                            var thumb = "http://img.youtube.com/vi/" + value.video_id + "/hqdefault.jpg";
							var video = "http://www.youtube.com/embed/" + value.video_id +"/";
           					 $('.playlist ul').append('<li>' + '<img src="'+ thumb +'" alt="'+ value.video_id +'" data-id="' + value.videos.id +'" data-title="'+ value.title+'" data-des="'+value.description+'" data-ago="'+value.ago+'" >' + '<div class="discription"><div class="col-lg-10 title"><p>'+ value.title+'</p></div></div></li>');
                            next_page = e.pages.next_page;
                            total_pages = e.pages.total_pages;
                        });
                    }).promise().done(function(){
                        initiated = 0;
						$('.playlist ul li').addClass('expandUp');
                    });
                }
            }
        }
		
		$('#loading').hide();
		
		$('.playlist ul li img').click(function(){
			var paramV = $(this).attr('alt');
			var paramId = $(this).attr('data-id');
			var paramdes = $(this).attr('data-des');
			var paramtitle = $(this).attr('data-title');
			var parago = $(this).attr('data-ago');
			window.location = "player.html?v="+ paramV + "&id="+paramId +"&des="+ paramdes +"&title=" + paramtitle+"&ago="+parago ;	
		});
    });
	
});
	
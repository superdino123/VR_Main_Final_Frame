// JavaScript Document
$(document).ready(function(e) {
    //游戏TOP榜		
	$(".gamePHbot").each(function(index, element) {
		$(this).children().children(".gamePHliname:first").addClass("borbobm");
        $(this).children().children(".gamePHliimg:first").addClass("disblock");
	});
	
	$('.gamePHbot .gamePHli').mouseover(function() {
        var $this = $(this);
        $this.find('.gamePHliname').addClass('borbobm');
        $this.find('.gamePHliimg').show();
        $this.siblings('.gamePHli').find('.gamePHliname').removeClass('borbobm');
        $this.siblings('.gamePHli').find('.gamePHliimg').hide();
    });	
		
	//游戏下载
	$('.g_downTnav').on('click','span',function(event) {
        var $this =  $(this),
		$index = $this.attr("data-id"),
		$wrapper = $('div[id^=gameTop]');
		$wrapperAM = $('A[id^=gamoreA]');
		var na = "gbg" + $index;
        $this.siblings().removeClass();
        $this.addClass(na);
        $wrapper.hide();
        $wrapper.eq($index).show();
		$wrapperAM.hide();
		$wrapperAM.eq($index).show();
    });
		
});


// JavaScript Document


(function($){
	$.scrollContent = function(obj){
		var posList = [];
		var posNum = 0;
		var timer = 0;
		var direction = 0;
		var delay = 5000;
		var activeClass = "focus"
		if(obj.delay){
			delay = obj.delay;
		}
		function showPos(num){
			obj.content.animate({
				"left": "-" + posList[num] + "px"
			});	
			if(obj.btn){
				obj.btn.removeClass(activeClass);
				obj.btn.eq(num).addClass(activeClass);
			}
		}
		function viewNext(){
			posNum ++;
			if(posNum >= posList.length){
				posNum = 0;	
			}
			showPos(posNum);
		}
		function viewPrev(){
			posNum --;
			if(posNum < 0){
				posNum = posList.length - 1;	
			}
			showPos(posNum);
		}
		function autoShow(){
			timer = setInterval(function(){
				if(direction && obj.direct){
					viewPrev();
				}
				else{
					viewNext();
				}
			}, delay);
		}
		function resetScroll(){
			clearInterval(timer);
			autoShow();	
		}
		obj.content.css("width", function(){
			var boxWidth = 0;
			var child = $(this).children();
			for(var i = 0; i < child.length; i ++){
				boxWidth += child.eq(i).outerWidth();
			}
			return boxWidth + "px";
		}).children().each(function(i){
			posList[i] = $(this).position().left;
		}).bind("mouseover", function(){
			clearInterval(timer);	
		}).bind("mouseout", function(){
			autoShow();	
		});
		if(obj.btn){
			obj.btn.each(function(i){
				$(this).bind("mouseover", function(){
					showPos(i);
					posNum = i;
					resetScroll();
				});
			});
		}
		if(obj.next){
			obj.next.bind("mouseover", function(){
				direction = 0;
				viewNext();
				resetScroll();
			});
		}
		if(obj.prev){
			obj.prev.bind("mouseover", function(){
				direction = 1;
				viewPrev();
				resetScroll();
			});
		}
		showPos(0);
		autoShow();
	}
})(jQuery);
<!--/*-->
(function($){
	$.fn.featureList = function(options) {
		var tabs	= $(this);
		var output	= $(options.output);

		new jQuery.featureList(tabs, output, options);

		return this;	
	};
	$.featureList = function(tabs, output, options) {
		function slide(nr) {
			if (typeof nr == "undefined") {
				nr = visible_item + 1;
				nr = nr >= total_items ? 0 : nr;
			}

			tabs.removeClass('focus').filter(":eq(" + nr + ")").addClass('focus');

			output.stop(true,true).filter(":visible").fadeOut();
			output.filter(":eq(" + nr + ")").fadeIn(100,function() {
				visible_item = nr;	
			});
		}
		var options			= options || {}; 
		var total_items		= tabs.length;
		var visible_item	= options.start_item || 0;
		options.pause_on_hover		= options.pause_on_hover		|| true;
		options.transition_interval	= options.transition_interval	|| 5000;
		output.hide().eq( visible_item ).show();
		tabs.eq( visible_item ).addClass('focus');
		tabs.mouseover(function() {
			if ($(this).hasClass('focus')) {
				return false;	
			}

			slide(tabs.index(this));
		});
		if (options.transition_interval > 0) {
			var timer = setInterval(function () {
				slide();
			}, options.transition_interval);

			if (options.pause_on_hover) {
				tabs.mouseenter(function() {
					clearInterval( timer );

				}).mouseleave(function() {
					clearInterval( timer );
					timer = setInterval(function () {
						slide();
					}, options.transition_interval);
				});
			}
		}
	};
})(jQuery);
<!--*/-->
$(document).ready(function(){
	(function(){
		var timer1, timer2;
		var link_more = $("[rel=js_more_link]"), link_content = $("#js_more_link_content");
		link_more.bind("mouseover", function(){
			clearTimeout(timer2);
			timer1 = setTimeout(function(){
				link_content.fadeIn()
			}, 600);
		}).bind("mouseout", function(){
			clearTimeout(timer1);
			timer2 = setTimeout(function(){
				link_content.fadeOut()
			}, 900);
		});
	})();
		
	$(".col-sub ul li").first().addClass("first-child").end().last().addClass("last-child");
	$(".invest-box, .events-list").last().addClass("no-border");
	
	(function(){
		setInterval(function(){
			$("[rel=js_toggle_img]").children().toggle();
		}, 7000)
	})();
	
	$.scrollContent({
		content: $("[rel=scroll_box_content]"),
		btn: $("[rel=js_btn_list]"),
		prev: $("[rel=js_btn_prev]"),
		next: $("[rel=js_btn_next]"),
		delay: 7000,
		direct: true
	});
	
	$.featureList(
	$("[rel=feature_list_btn]"),
	$("[rel=feature_list]"), {
		start_item:	0,
		transition_interval: 6000
		}
	);
	
});


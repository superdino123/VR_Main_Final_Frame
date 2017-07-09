jQuery(function ($) {
    //轮播图代码
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 4000,
        loop: true
    });
    $('.arrow-left').on('click', function (e) {
        e.preventDefault();
        mySwiper.swipePrev();
    });
    $('.arrow-right').on('click', function (e) {
        e.preventDefault();
        mySwiper.swipeNext();
    });
    //排行榜代码
    var rankingSwiper = new Swiper('.ranking-container', {
        onlyExternal: true,
        speed: 500
    });
    $(".rankingTit .rankingNav").on('mouseenter', function (e) {
        $(".rankingTit .active").removeClass('active');
        $(this).addClass('active');
        rankingSwiper.swipeTo($(this).index());
    });
    //游戏下载
    var downSwiper = new Swiper('.down-container', {
        onlyExternal: true,
        speed: 300
    });
    $(".down-tab a").on('click', function (e) {
        e.preventDefault();
        $(".down-tab .active").removeClass('active');
        $(this).addClass('active');
        downSwiper.swipeTo($(this).index());
    });
    //VR图说
    var $column_wiki_list = $('#column_wiki_list'),
         $column_wiki_count = $column_wiki_list.find('li').size();
    //ul width: 218*count+66*count 
    $column_wiki_list.width(286 * $column_wiki_count);
    $('#wiki_next').click(function () {
        $column_wiki_list.children().first().animate({ marginLeft: '-=286px' }, 'slow', function () {
            $(this).appendTo($column_wiki_list).css('marginLeft', '0');
        });
    });
    $('#wiki_prev').click(function () {
        $column_wiki_list.children().last().prependTo($column_wiki_list).css('marginLeft', '-286px');
        $column_wiki_list.children().first().animate({ marginLeft: '+=286px' }, 'slow');
    });

    var newsid = "";
    $("p.clearfix").each(function (index, item) {
        var newid = $(this).attr("id");
        newsid += newid + ",";
    });
    //alert(newsid);
    $.ajax({
        type: "post",
        url: "/ashx/indexnewsclick.ashx",
        data: { comidlist: newsid },
        dataType: "json",
        success: function (data) {
            if (data.ret == 0) {
                var result = data.result;
                $(result).each(function (index, item) {
                    $("#new_" + item.id + " span.visited").text(item.click);
                    $("#new_" + item.id + " span.discuss").text(item.discuss);
                });
            }
        },
        error: function (xhr, errorType, error) {
            //alert(error);
            return false;
        }
    });
});

$(document).ready(function () {
    //$(".index-job").load("/2016/Control/joblist.html");
    //$("#videolist").load("/2016/Control/videolist.html");
    //$(".ranking-game-list").load("/2016/Control/gametoplist.html");

    //$("#windowsli").load("/2016/Control/gamelistwindows.html");
    //$("#iosli").load("/2016/Control/gamelistios.html");
    //$("#androidsli").load("/2016/Control/gamelistandroid.html");
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    switch (month) {
        case 1: month = "January";
            break;
        case 2: month = "February";
            break;
        case 3: month = "March";
            break;
        case 4: month = "April";
            break;
        case 5: month = "May";
            break;
        case 6: month = "June";
            break;
        case 7: month = "July";
            break;
        case 8: month = "August";
            break;
        case 9: month = "September";
            break;
        case 10: month = "October";
            break;
        case 11: month = "November";
            break;
        case 12: month = "December";
            break;
    }

    var days = myDate.getDate();
    $(".hotNews-month").html(month);
    $(".hotNews-day").html(days);

    var parms = {
        dt: new Date()
    };
    $.ajax({
        type: "post",
        url: "/ashx/Newscheck.ashx",
        data: parms,
        dataType: "json",
        success: function (data) {
            if (data != undefined) {
                $(".newsUpdate").html("<a href='http://news.87870.com/xinwen-1-01-1.html' target='_blank'>今日更新 " + data.result + " 篇</a>");
            }
        },
        error: function (xhr, errorType, error) {
            //alert(error);
            return false;
        }
    });
});
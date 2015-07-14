(function ( $ ) {
    jQuery.fn.reverse = [].reverse;
    jQuery.fn.xrowslideshow = function( options ) {
        return this.each(function() {
            var settings = $.extend({
                    slider_viewport: ".viewport",//viewport for your gallery
                    item_container: "a",        //wrapper of gallery item
                    resize_flip_buttons: true, //forward/backward buttons are as high as their parent
                    animation_interval: 5000, //animation interval in milliseconds (needs playbutton enabled)
                    speed: 500,              //animation speed in milliseconds
                    speedforswipe: 100,     //animation Swipespeed in milliseconds
                    max_visible: 1,         //maximum items that are visible at once in the viewport
                    indicator: false,      //#indicator:false|true
                    autostart: false,     //automatic animation #autostart:true|false
                    show_flip_buttons: true //show/hide forward/backward buttons #show_flip_buttons: false|true
                    }, options );
            $(this).children(settings.slider_viewport).wrapInner("<div></div>");
            $(this).data( "index", parseInt(0) );
            $(this).find(settings.item_container).addClass("slide");
            //$(this).css({"width": $(this).css("width")});//fix for item_container with relative size
            $(this).find(settings.item_container).css({"width": $(this).find(settings.item_container).css("width")});//fix for item_container with relative size
            var outer_wrapper = $(this),
                viewport_object = outer_wrapper.children(settings.slider_viewport),
                animation_wrapper = viewport_object.children("div"),
                width = $(viewport_object).find(settings.item_container).outerWidth(),
                current_index = parseInt(outer_wrapper.data( "index" )),
                itemcount = parseInt( viewport_object.find(animation_wrapper).find(settings.item_container).length ),
                offsetleft = "-" + parseFloat( settings.max_visible * width );
            if( itemcount > parseInt(1) )
            {
                if (settings.show_flip_buttons == true)
                {
                    viewport_object.before('<span class="interaction"><span class="backward"></span><span class="forward"></span></span>');
                    if( settings.resize_flip_buttons == true )
                    {
                        outer_wrapper.find(".forward, .backward").css({"height": viewport_object.find(settings.item_container).outerHeight(true) + "px"});
                    }
                }
                $(animation_wrapper).css({left: offsetleft + "px"});
                viewport_object.find(settings.item_container).each(function(){
                    if( $(this).index() <= parseInt( settings.max_visible - 1 ) )
                    {
                        $(this).addClass("appendright");
                    }
                    if ( $(this).index() >= parseInt(itemcount - settings.max_visible ) )
                    {
                        $(this).addClass("appendleft");
                    }
                });
                var appendleft  = viewport_object.find(".appendleft").clone(),
                    appendright = viewport_object.find(".appendright").clone();

                $(appendleft).reverse().each(function(){
                    viewport_object.children("div").prepend($(this));
                });

                $(appendright).each(function(){
                    viewport_object.children("div").append($(this));
                });

                outer_wrapper.find(".appendleft").removeClass("appendleft");
                outer_wrapper.find(".appendright").removeClass("appendright");

                if( settings.indicator == true)
                {
                    outer_wrapper.find(".interaction").append('<span class="indicator"></span>');
                    var indicator = outer_wrapper.find(".indicator");
                    indicator.append('<span class="active" data-index="0"></span>');
                    for (i=2; i <= itemcount; i++) {
                        indicator.append('<span data-index="'+parseInt(i-1)+'"></span>');
                    }
                    indicator.find("span").click(function(){
                        if( !$(animation_wrapper).is(":animated") )
                        {
                            $(this).addClass("active").siblings().removeClass("active");
                            $(animation_wrapper).animate({left: parseInt(width * -1 * ( $(this).data("index") + (settings.max_visible * 2) - 1 )) + "px"}, settings.speed);
                            $(outer_wrapper).data("index", $(this).data("index"));
                        }
                    });
                }
                if( settings.autostart == true )
                {
                    var autostart;
                    autostart = setInterval(function(){
                        $(animation_wrapper).animate({left: parseInt(width * -1 * ( $(outer_wrapper).data("index") + (settings.max_visible * 2) )) + "px"}, settings.speed, function(){
                            $(outer_wrapper).data("index", parseInt( $(outer_wrapper).data("index") + 1 ) );
                            if ( $(outer_wrapper).data("index") == itemcount )
                            {
                                $(outer_wrapper).data("index",  parseInt(0));
                                $(animation_wrapper).css({left: parseInt(width * -1 * settings.max_visible ) + "px"});
                            }
                            if( settings.indicator == true)
                            {
                                indicator.find('span[data-index="'+ $(outer_wrapper).data('index') +'"]').addClass("active").siblings().removeClass("active");
                            }
                        });
                    }, settings.animation_interval);
                    outer_wrapper.find(".interaction span").click(function(){
                        clearInterval(autostart);
                    });
                    
                    outer_wrapper.find(".viewport").on( "swipeleft", function (){
                        clearInterval(autostart);
                        posleft = parseInt( $(animation_wrapper).css("left").split("px")[0] );
                        slideleft();
                    });
                    
                    outer_wrapper.find(".viewport").on( "swiperight", function (){
                        clearInterval(autostart);
                        posleft = parseInt( $(animation_wrapper).css("left").split("px")[0] );
                        slideright();
                    });
                }else{
                    $(outer_wrapper).find(".viewport").on( "swipeleft", function (){
                        posleft = parseInt( $(animation_wrapper).css("left").split("px")[0] );
                        slideleft();
                    });
                    
                    $(outer_wrapper).find(".viewport").on( "swiperight", function (){
                        posleft = parseInt( $(animation_wrapper).css("left").split("px")[0] );
                        slideright();
                    });
                }
                
                if (settings.show_flip_buttons == true)
                {
                    $(outer_wrapper).find(".forward, .backward").mousedown(function(){
                        posleft = parseInt( $(animation_wrapper).css("left").split("px")[0] );
                        if( !$(animation_wrapper).is(":animated") && $(this).hasClass("forward") )
                        {
                        slideleft();
                        }
                        else if( !$(animation_wrapper).is(":animated") )
                        {
                        slideright();
                        }
                    });
                }
                
                function slideleft(){
                            $(outer_wrapper).data( "index", parseInt($(outer_wrapper).data( "index" ) + 1));
                            var left = parseInt( posleft - width );
                            $(animation_wrapper).animate({left: left + "px"}, settings.speedforswipe, function(){
                                if ( $(outer_wrapper).data("index") == itemcount )
                                {
                                    $(animation_wrapper).css({left: parseInt(width * -1 * settings.max_visible) + "px"});
                                    $(outer_wrapper).data("index", parseInt(0));
                                }
                                if( settings.indicator != false )
                                {
                                    indicator.find('span[data-index="'+ $(outer_wrapper).data('index') +'"]').addClass("active").siblings().removeClass("active");
                                }
                            });
                
                }
                
                function slideright(){
                            $(outer_wrapper).data( "index", parseInt($(outer_wrapper).data( "index" ) - 1) );
                            var left = parseInt(posleft + width);
                            $(animation_wrapper).animate({left: left + "px"}, settings.speedforswipe, function(){
                                if ( $(outer_wrapper).data("index") == "-1")
                                {
                                    $(animation_wrapper).css({left: parseInt((itemcount + settings.max_visible - 1) * width * -1 ) + "px"});
                                    $(outer_wrapper).data("index",  parseInt(itemcount - 1));
                                }
                                if( settings.indicator != false )
                                {
                                    indicator.find('span[data-index="'+ $(outer_wrapper).data('index') +'"]').addClass("active").siblings().removeClass("active");
                                }
                            });
                }
                
                
                var resizetimer;
                $(window).resize(function(){
                    outer_wrapper.removeAttr("style");
                    width = viewport_object.find(settings.item_container).outerWidth();
                    offsetleft = "-" + parseFloat( (settings.max_visible + $(outer_wrapper).data( "index" )) * width );
                    $(animation_wrapper).css({left: offsetleft + "px"});
                    if( settings.resize_flip_buttons == true && settings.show_flip_buttons == true)
                    {
                        outer_wrapper.find(".forward, .backward").css({"height": viewport_object.find(settings.item_container).outerHeight(true) + "px"});
                    }
                    clearTimeout(resizetimer);
                    resizetimer = setTimeout(function(){
                        outer_wrapper.css({"width": outer_wrapper.css("width")}); //fix for item_container with relative size (needs to be fired after resize)
                    }, 100);
                });
            }
            else
            {
                outer_wrapper.removeAttr("style");
            }
        });
    };
}( jQuery ));

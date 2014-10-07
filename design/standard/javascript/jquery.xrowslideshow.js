(function ( $ ) {
    jQuery.fn.reverse = [].reverse;
    $.fn.xrowslideshow = function( options ) {
        return this.each(function() {
            var settings = $.extend({
                    slider_viewport: ".viewport", //viewport for your gallery
                    item_container: "a",//wrapper of gallery item
                    speed: 500,       //animation speed in milliseconds
                    items_to_show: 1 //maximum how many items are visible at once in the viewport
                    }, options );

            $(this).children(settings.slider_viewport).wrapInner("<div></div>");
            $(this).data( "index", parseInt(0) );
            var outer_wrapper = $(this),
                viewport_object = outer_wrapper.children(settings.slider_viewport),
                animation_wrapper = viewport_object.children("div"),
                width = $(viewport_object).find(settings.item_container).outerWidth(),
                current_index = parseInt(outer_wrapper.data( "index" )),
                itemcount = parseInt( viewport_object.find(animation_wrapper).find(settings.item_container).length ),
                offsetleft = "-" + parseFloat( settings.items_to_show * width );

            if( itemcount > settings.items_to_show )
            {
                viewport_object.before('<span class="interaction"><span class="backward"></span><span class="forward"></span></span>');
                outer_wrapper.find(".forward, .backward").css({"height": viewport_object.outerHeight(true) + "px"});
                $(animation_wrapper).css({left: offsetleft + "px"});
                viewport_object.find(settings.item_container).each(function(){
                    if( $(this).index() <= parseInt( settings.items_to_show - 1 ) )
                    {
                        $(this).addClass("appendright");
                    }
                    if ( $(this).index() >= parseInt(itemcount - settings.items_to_show ) )
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
                
                $(outer_wrapper).find(".forward, .backward").mousedown(function(){

                    posleft = parseInt( $(animation_wrapper).css("left").split("px")[0] );

                    if( !$(animation_wrapper).is(":animated") && $(this).hasClass("forward") )
                    {
                        current_index = parseInt(current_index + 1);
                        var left = parseInt( posleft - width );
                        $(outer_wrapper).data( "index",  current_index);
                        $(animation_wrapper).animate({left: left + "px"}, settings.speed, function(){
                            if ( current_index == itemcount )
                            {
                                $(animation_wrapper).css({left: parseInt(width * -1 * settings.items_to_show) + "px"});
                                current_index = parseInt(0);
                                $(outer_wrapper).data( "index",  current_index);
                            }
                        });
                    }
                    else if( !$(animation_wrapper).is(":animated") )
                    {
                        current_index = parseInt(current_index - 1);
                        var left = parseInt(posleft + width);
                        $(outer_wrapper).data( "index", current_index );
                        $(animation_wrapper).animate({left: left + "px"}, settings.speed, function(){
                            if ( current_index == "-1")
                            {
                                $(animation_wrapper).css({left: parseInt((itemcount + settings.items_to_show - 1) * width * -1 ) + "px"});
                                current_index = parseInt(itemcount - 1);
                                $(outer_wrapper).data( "index",  current_index);
                            }
                        });
                    }
                });
                $(window).resize(function(){
                    width = $(viewport_object).find(settings.item_container).outerWidth();
                    offsetleft = "-" + parseFloat( (settings.items_to_show + $(outer_wrapper).data( "index" )) * width );
                    $(animation_wrapper).css({left: offsetleft + "px"});
                    outer_wrapper.find(".forward, .backward").css({"height": viewport_object.outerHeight(true) + "px"});
                });
            }
        });
    };
}( jQuery ));

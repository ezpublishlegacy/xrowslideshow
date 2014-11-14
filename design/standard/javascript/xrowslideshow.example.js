
$(window).load(function(){ //$(window).load() waits for images to be loaded
    $(".xrowslideshow").xrowslideshow({
        slider_viewport: ".viewport-example", //optional: viewport container class for your gallery; default setting: ".viewport"
        item_container: "a.gallery-item",//optional: wrapper for each gallery item; default setting: "a"
        speed: 750,       //optional: animation speed in milliseconds; default setting: 500
        items_to_show: 4 //optional: maximum items that are visible at once in the viewport; default setting: 1
    });
});
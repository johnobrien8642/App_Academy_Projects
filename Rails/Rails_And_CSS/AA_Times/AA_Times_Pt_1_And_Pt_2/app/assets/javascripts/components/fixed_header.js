var wrap = $("#section-links-nav");

wrap.on("scroll", function(e) {
    
    if (this.scrollTop > 10) {
        wrap.addClass("fix-links-nav");
    } else {
        wrap.removeClass("fix-links-nav");
    }

});


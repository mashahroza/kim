jQuery( document ).ready(function($) {
    $("span.submenu-arrow").click( function() {
			// event.preveneDefault();
			console.log("li Click");
			console.log($(this));
			if( $(this).parent().hasClass("open") ) {
				$(this).parent().removeClass("open");
				console.log("li closed");
			}
			else {
				$(this).parent().addClass("open");
				console.log("li opened");
			}
    });

    /* Scroll to anchor */
    $('a[href^="#"]').click(function () {
		var target = $(this).attr('href');
		$('html, body').animate({scrollTop: $(target).offset().top - 170 }, 3000);
		//return false;
		});

    // Passive event listeners. Disable for Google PageSpeed
  //   jQuery.event.special.touchstart = {
	 //    setup: function( _, ns, handle ) {
  //       this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
	 //    }
		// };
		// jQuery.event.special.touchmove = {
	 //    setup: function( _, ns, handle ) {
  //       this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
	 //    }
		// };
		// jQuery.event.special.wheel = {
	 //    setup: function( _, ns, handle ){
  //       this.addEventListener("wheel", handle, { passive: true });
	 //    }
		// };
		// jQuery.event.special.mousewheel = {
	 //    setup: function( _, ns, handle ){
  //       this.addEventListener("mousewheel", handle, { passive: true });
	 //    }
		// };

	// $("#load_more_button").click(function(e) {
	// 	e.preventDefault();
	// 	// $("#load_more_button").removeClass('rotate');
	// 	$(this).addClass('rotate');
	// })

	load_more_button.onclick = function(){
		this.classList.toggle('rotate')
		// this.classList.add('rotate')
		// setInterval(this.classList.remove('rotate'), 1000)
		// $("#load_more_button").addClass('rotate');
		// this.removeClass('rotate');
	}

});
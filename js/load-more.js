jQuery(document).ready(function($) {
	if (!jQuery('#recent_news.publications,#recent_news.mobilepubl').length) return false;
	jQuery('body').append('<div class="loader"></div>');
	jQuery('#recent_news.publications,#recent_news.mobilepubl').after('<span class="load-more"></span>');

	var button = $('.load-more');
	var loader = $('.loader');

	var page = 1;
	var loading = false;
	var tm;
	var vec = 0;
	var author = $('#primary').attr('data-author');

	if(jQuery('body').hasClass("home")){
		$('#load_more_button').click(function() {
			getContent(author);
	})
	}else{
		$(window).scroll(function() {
			var scrolltop;
			var offset;
			var nextblock;

			clearTimeout(tm);
			tm = setTimeout(function(){
				scrolltop = $(window).scrollTop();

				/*nextblock = ( jQuery(window).width() > 767 )
					? jQuery('#recent_news.publications').closest('div')
					: jQuery('#recent_news.mobilepubl').closest('div')
				;*/

				if (jQuery(window).width() > 767 && jQuery('#recent_news.mobilepubl').length) {
					nextblock = jQuery('#recent_news.mobilepubl').closest('div');
				} else {
					nextblock = jQuery('#recent_news.publications').closest('div');
				}
					var nextblock_offset = nextblock.offset();
				offset = nextblock_offset.top + nextblock.height() - getHeight();

				$allow = vec < scrolltop; // движение вниз
				vec = scrolltop;
				if ($allow && scrolltop >= offset) {
					getContent(author);
				}

			}, 350);
		});
	}

	// document.documentElement.clientHeight
	function getHeight() {
		return window.innerHeight * (document.documentElement.clientWidth / window.innerWidth);
	}

	function getContent(author) {
		if ( loading ) return false;
		loading = true;
		loader.css({display:'block'});
		var author = $('#primary').attr('data-author');
		var data = {
			action: 'dj_post_more',
			page: page,
			id: +djdmore.id,
			width: window.screen.width,
			authorID: author,
			is_home: djdmore.is_home || false,
			is_single: djdmore.is_single || false,
			cat: +djdmore.cat || false
		};
		$.post(djdmore.url, data, function(res) {
			loader.css({display:'none'});
			if( res.success) {
				page = page + 1;
				if (res.data) {
					$('#recent_news.publications,#recent_news.mobilepubl').append( res.data );
				}
			} else {
				// console.log(res);
			}
			loading = false;
		}).fail(function(xhr, textStatus, e) {
			// console.log(xhr.responseText);
			loader.css({display:'none'});
			loading = false;
		});		
	}
});

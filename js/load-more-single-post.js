jQuery(document).ready(function($) {
	console.log("load-more-single-post.js Loaded");
	
	
	// setTimeout(getContent(author), 1);

		// $(window).scroll(function() {
			console.log("load-more-single-post.js window.scroll");
		// if (  $(document).height() - ($(window).height() + $(window).scrollTop()) <= 1405
		// 	) {
			$('#load_more_button').click(function(){
			console.log("Scrolled down");
		getContent(author);
		console.log("getContent has ended");
			});
		// }
		// });


	var author = $('#primary').attr('data-author');
	var loading = false;
	var page = 1;

	function getContent(author) {
		console.log("Function getContent is running");
		if ( loading === true ) { console.log("loading is undefined"); return false; }
		loading = true;
		//loader.css({display:'block'});
		var author = $('#primary').attr('data-author');
		var data = {
			action: 'single_post_more',
			page: page,
			id: +load_more_single_post.id,
			width: window.screen.width,
			// authorID: author,
			is_home: false,
			is_single: true,
			cat: +load_more_single_post.cat || false
		};
		$.post(load_more_single_post.url, data, function(res) {
			loading = false;
		})
		.done(function(res) {
			page = page + 1;
			console.log(res);
			$('.load_more_single_post ul').append( res.data );
			loading = false;
		})
		.fail(function(xhr, textStatus, e) {
			console.log("Fail: " + xhr.responseText);
			//loader.css({display:'none'});
			loading = false;
		});		
	}
});
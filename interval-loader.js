(function( $ ) {
	$.fn.itervalLoader = function (childSelector, params) {
		
		// если не передан childSelector - выход
		if (!childSelector) return;
		
		params = params || {};
		params.loaderClass = params.loaderClass || 'loader';
		params.updateClass = params.updateClass || 'update';
		params.interval = params.interval || 15000;
		params.url = params.url || '';
		var parent = this;
		
		var handlerId;
		var updateTestimonial = function (isManual) {
			if (isManual) {
				if (handlerId) clearInterval(handlerId);
				handlerId = setInterval(updateTestimonial, params.interval);
			}
			var url = params.url + '?rand=' + Math.random() + ' ' + childSelector;
			$(childSelector).animate({ opacity: 0 }, 500, function () {
				$('<div class="'+params.loaderClass+'" />').appendTo(parent);
				parent.load(url, function () {
					$(childSelector).css('opacity', 0);
					$(childSelector).animate({ opacity: 1 }, 500);
				});
			});
			return false;
		};

		handlerId = setInterval(updateTestimonial, params.interval);
		
		$('.'+params.updateClass).click(function() {
			return updateTestimonial(true);
		});
		
	}
})(jQuery);
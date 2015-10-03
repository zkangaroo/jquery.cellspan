/**
*  table cell operation for jQuery, version 0.1.0
*  (c) 2015 z.kangaroo
*
*  table cell operation is freely distributable under the terms of an MIT-style license.
*  For details, see the web site: https://github.com/zkangaroo/jquery.cellspan
*/

(function($){

	$.extend({
		cellspan : function(target, options){
			var target = (target instanceof jQuery) ? target : $(target);
			var defaults = {
				expand: {
					priority:	'row',	// row or cell
				},
			};
			var settings = $.extend({}, defaults, options);

			// private
			function expandRow(){
				$($('th:empty, td:empty', target).get().reverse()).each(function(){
					prev = $(this).parent().prev().children().eq($(this).index());
					if(prev.length){
						prev.attr('rowspan', (Number($(this).attr('rowspan')) || 1) + 1);
						$(this).remove()
					}
				});
			}

			function expandCell(){
				$('th:empty, td:empty', target).each(function(){
					prev = $(this).prev();
					if(prev.length){
						prev.attr('colspan', (Number(prev.attr('colspan')) || 1) + 1);
						$(this).remove()
					}
				});
			}

			// public
			var Cellspan = function(){};
			Cellspan.prototype = {
				expand : function(priority){
					priority = priority || settings.expand.priority;
					switch(priority){
						case 'row':
							expandRow();
							expandCell();
							break;
						case 'col':
							expandCell();
							expandRow();
							break;
					}
				},

				partition: function(){
					$('[rowspan]', target).each(function(){
						len = $(this).attr('rowspan');
						$(this).removeAttr('rowspan');
						for(i = 1; i < len; i++){
							$parent = $(this)
								.parent()
									.parent()
										.children().eq($(this).parent().index() + i);
							if($(this).index() < $parent.children().length){
								e = $parent.children().eq($(this).index());
								e.before($(this).clone().empty());
							}else{
								e = $parent.children(':last');
								e.after($(this).clone().empty());
							}
						}
					});

					$('[colspan]', target).each(function(){
						len = $(this).attr('colspan');
						for(i = 1; i < len; i++) $(this).after("<td>");
						$(this).removeAttr('colspan');
					});
				},
			}

			return new Cellspan();
		}
	});

})(jQuery);

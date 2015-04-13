var $projects = $('#projects');
var v = '0.1.2';
var ShowdownConverter = new Showdown.converter();
var init = function() {
	var file_formats = ['png', 'jpg', 'gif'];
	var categories = ['build', 'contribute', 'disseminate', 'create', 'sustain'];
	var groups = [];

	for(var i = 0; i < categories.length; i++) {
		var id = categories[i];
		groups[id] = $('<div class="group" id="' + id + '">');
	}

	$.get('./projects/list?v=' + v, function(data) {
		var list = JSON.parse(data);
		for(code in list) {
			var info = list[code];
			var $project = $('<div class="project">');
			$project.append('<div class="title">' + info.title + '</div>');

			if('images' in info) {
				for(var i = 0; i < info.images.length; i++) {
					$project.append('<img src="./projects/' + code + '/' + (i + 1) + '.' + file_formats[info.images[i]] + '">');
				}
			}
			if('links' in info) {
				var $links = $('<div class="links">');
				for(var i = 0; i < info.links.length; i++) {
					$links.append('<div class="link"><a href="' + info.links[i] + '" target="_blank">' + info.links[i] + '</a></div>');
				}
				$project.append($links);
			}
			if('text' in info) {
				$project.append('<div class="text">' + ShowdownConverter.makeHtml(info.text) + '</div>');
			}
			$project.append('<div class="date"><label class="small">' + info.date + '</label></div>');
			groups[info.category].append($project);
		}

		for(id in groups)
			$projects.append(groups[id]);
	});
};
init();
/*
var _root = new Firebase('https://youzhihao.firebaseio.com/');
var _projects = _root.child('projects');
_projects.once('value', function(snapshot) {
	if(snapshot.val() == null) {
		init();
	}
});*/

$('#categories > .category').click(function(event) {
	$projects.removeClass('hide');
	event.stopPropagation();
});
$('article').click(function() {
	$projects.addClass('hide');
});

// http://stackoverflow.com/questions/5802467/prevent-scrolling-of-parent-element
$('.scrollable').on('DOMMouseScroll mousewheel', function(ev) {
	var $this = $(this),
	scrollTop = this.scrollTop,
	scrollHeight = this.scrollHeight,
	height = $this.height(),
	delta = ev.originalEvent.wheelDelta,
	up = delta > 0;

	var prevent = function() {
		ev.stopPropagation();
		ev.preventDefault();
		ev.returnValue = false;
		return false;
	}

	if(!up && -delta > scrollHeight - height - scrollTop) {
		// Scrolling down, but this will take us past the bottom.
		$this.scrollTop(scrollHeight);
		return prevent();
	}
	else if(up && delta > scrollTop) {
		// Scrolling up, but this will take us past the top.
		$this.scrollTop(0);
		return prevent();
	}
});
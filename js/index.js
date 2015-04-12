var _root = new Firebase('https://youzhihao.firebaseio.com/');
var _projects = _root.child('projects');
_projects.once('value', function(snapshot) {
	if(snapshot.val() == null) {
		$.get('projects', function(data) {
			console.log(data);
		})
	}
});

$('#categories > .category > a').click(function(event) {
	$('#projects').removeClass('hide');
	event.stopPropagation();
});
$('article').click(function() {
	$('#projects').addClass('hide');
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
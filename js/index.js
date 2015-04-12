var _root = new Firebase('https://youzhihao.firebaseio.com/');
var _projects = _root.child('projects');//.push({id: 0, title: 'try'});

$('#categories > .category > a').click(function(event) {
	$('#projects').removeClass('hide');
	event.stopPropagation();
});
$('article').click(function() {
	$('#projects').addClass('hide');
});
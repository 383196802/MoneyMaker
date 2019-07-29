
function search() {
	var query = $('#search-input').val()
	window.location = 'course-list?query=' + encodeURIComponent(query)
}

function entryClicked(courseID) {
	window.location = 'course?id=' + courseID
}

function main() {
	
}

$(document).ready(main)

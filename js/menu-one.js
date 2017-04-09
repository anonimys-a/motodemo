//## MENU ONE

$(document).ready(function () {
	//show menu on hover for every subject
	$('.main-subject-tab').hover(function () {
	    //stop() method we used to stop an animation or effect before it is finished
	    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
	}, function () {
	    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
	});


	//take the subject name when click event is triggered
	$('.main-subject-tab').click(function () {
	    var chosenSubjectName = $(this).find("span.hidden-subject-name").text();
	    $("p#subject-type").text(chosenSubjectName);
	});
});
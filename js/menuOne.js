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

    //take the link name when click event is triggered on the first view/box
    $(document).on('click', '.edinecno-odobruvanje-link', function (e) {
        e.preventDefault();
        var chosenSubjectLink = $(this).text();
        $("p#chosen-link-from-view-menu1").text(chosenSubjectLink);
    });

    $(document).on('click', '.adr-link', function (e) {
        e.preventDefault();
        var chosenAdrLink = $(this).text();
        $("p#chosen-link-from-view-menu4").text(chosenAdrLink);
    });

    $(".discard-all-button").click(function () {
        clearSecondCircleForm();
        clearThirdCircleForm();
        $("li").removeClass("active");
        resetTablePotvrdaZaTehnickiKarakteristiki();
        
        //if we click on discard from the third menu
        var chosenView = $("p#subject-type").text();
        if($(this).hasClass('discard-from-menu3') && (chosenView === 'Единечно одобрување и преправки' || chosenView === "Потврда за технички карактеристики")) {
	        $("a.sidebar-toggle").trigger("click"); // we trigger a click on the sidebar button in order to reset all the space for the table
	        $('#proccess-container').removeClass("container-fluid").addClass("container"); //reset space with fluid class
        }
    });
});
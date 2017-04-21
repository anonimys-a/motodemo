$(document).ready(function () {
    //loading the html layout and add to the DOM
    //	$("#load-template").on("click", function() {
    //        $("#page-content-wrapper").load("page-content-template.html");
    //	});

    //show the proccess content on click
    $('#load-template').click(function (e) {
        $('#proccess-container').show();
    });

    $('.main-subject-box').click(function (e) {
        $('.btn-menu1').removeClass('btn-info').addClass('btn-default');
        $('.btn-menu2').addClass('btn-info').removeClass('btn-default').blur();
    });

    //when click on a circle then that circle is blue
    $(document).on('click', '.btn-circle', function () {
        hideErrorMessagesForValidation();
        $('.btn-circle.btn-info').removeClass('btn-info').addClass('btn-default');
        $(this).addClass('btn-info').removeClass('btn-default').blur();
    });

    //add behaviour on the select input for the Entering vehicle data form
    $("#input-type-of-vehicle-shipping-requiring-confirmation").change(function () {
        if ($("#input-type-of-vehicle-shipping-requiring-confirmation option:selected").val() === "public") {
            $("#input-class-of-the-vehicle").prop("disabled", false);
            $("#input-model-of-the-vehicle").prop("disabled", false);
            $("#input-number-of-seats-according-to-vehicle-license").prop("disabled", false);
            //$("#input-registration-number-of-the-vehicle").prop("disabled", false);
            $("#input-year-of-first-registration").prop("disabled", false);
            $("#input-year-of-production").prop("disabled", false);
        } else {
            $("#input-class-of-the-vehicle").prop("disabled", true);
            $("#input-model-of-the-vehicle").prop("disabled", true);
            $("#input-number-of-seats-according-to-vehicle-license").prop("disabled", true);
            $("#input-year-of-first-registration").prop("disabled", true);
            $("#input-year-of-production").prop("disabled", true);
        }


    });

    //this is the behaviour when click on next or back buttons
    $(document).on('click', '.next-step, .prev-step', function (e) {
        //if the sidebar is collapsed then we want to show it
        if ($('body').hasClass('sidebar-collapse')) {
            $("a.sidebar-toggle").trigger("click");
        }

        //reset the div container
        $('#proccess-container').removeClass("container-fluid").addClass("container");

        hideErrorMessagesForValidation();
        hideErrorMessagesForVehicleDataValidation();

        var activeTab = $('.tab-pane.active');
        var activeTabId = activeTab[0].id;

        // If this returns true we know that we are validating individual_person_form
        var embgFieldExist = $('#embg-legal-entity').is(":visible");
        var chosenView = $("p#subject-type").text();
        var chosenSubjectLinkFromFirstMenu = $("p#chosen-link-from-view-menu1").text();
        var chosenAdrLinkFromFourthMenu = $("p#chosen-link-from-view-menu4").text();

        $('.btn-circle.btn-info').removeClass('btn-info').addClass('btn-default');

        if ($(this).hasClass('next-step')) {
            //if activeTab is div#menu2 we call a fucntion for sending a request to the backend with validation 
            //for ex. activeTab = <div id="menu2" class="tab-pane fade active in">
            if (activeTabId === "menu2") {
                //validate the form and send a request
                if (!validate_second_step_form(embgFieldExist)) {
                    //if validation not pass or the response is with error we do not go to the third step(cirlce)
                    return;
                } else {
                    //                    clearSecondCircleForm();
                };
            }

            //if we are on the third circle then the active tab is <div id="menu3" class="tab-pane fade active in">
            if (activeTabId === "menu3") {
                //validate the form before going to the fourth cicrcle
                if (!validate_third_step_form(chosenView)) {
                    //if validation not pass or the response is with error we do not go to the fourth step(cirlce)
                    return;
                } else {
                    //                    clearThirdCircleForm();
                };
            }

            var nextTab = activeTab.next('.tab-pane').attr('id');
            $('[href="#' + nextTab + '"]').addClass('btn-info').removeClass('btn-default');
            $('[href="#' + nextTab + '"]').tab('show');

            if (nextTab === "menu3") {
                var chosenView = $("p#subject-type").text();
                //change the form layout depending of the clicked subject
                changeFormLayoutForVehicleData(chosenView);
                changeFormLayoutForContributionsEvidence(chosenView);



                if (chosenView === 'Потврда за технички карактеристики') {
                    //make the main div fluid because we need more space for the table from fifth table box view
                    $('#proccess-container').removeClass("container").addClass("container-fluid");
                    $("a.sidebar-toggle").trigger("click"); // we trigger a click on the sidebar button in order to get all space for the table
                }
            }

            if (nextTab === "menu4") {
                createLeyoutForMenu4(chosenView, chosenAdrLinkFromFourthMenu);
            }

            if (nextTab === "menu5") {
                createLeyoutForMenu5(chosenView, chosenSubjectLinkFromFirstMenu);
            }

        } else {
            var prevTab = activeTab.prev('.tab-pane').attr('id');
            $('[href="#' + prevTab + '"]').addClass('btn-info').removeClass('btn-default');
            $('[href="#' + prevTab + '"]').tab('show');
            if (prevTab === "menu1") {
                clearSecondCircleForm();
            }

            if (prevTab === "menu3" && chosenView === 'Потврда за технички карактеристики') {
                //make the main div fluid because we need more space for the table from fifth table box view
                $('#proccess-container').removeClass("container").addClass("container-fluid");
                $("a.sidebar-toggle").trigger("click"); // we trigger a click on the sidebar button in order to get all space for the table
            }
        }
    });

    function createLeyoutForMenu4(chosenView, chosenAdrLinkFromFourthMenu) {
        if (chosenView === "АДР") {
            if (chosenAdrLinkFromFourthMenu === "- Инспекција на цистерни за транспорт на опасни материи") {
                $(".inspection-of-tanks-wrapper").show();
                $(".edinechno-odobrenie-vozilo-zapleneto").hide();
              //da se zemat site potrebni vrednosti za menu 4 za Инспекција на цистерни за транспорт на опасни материи
                if ($("#legal-entity-radio-button").is(':checked')) {
                	//da se prezemat podatocite od pravno, da se prikazat vo menu 4 vo prvata tabela.
                	//po default se krie tabelata za pravno lice vo css  
                } else {
                	//da se prezemat podatocite od fizicko lice i da se prikazat vo menu 4 vo prvata tabela
                	var embgFizicko = $("#input-embg").val();
                	$("#embg-podnesuvach-korisnik-tabela").val(embgFizicko);
                }
                //da se prezemat site podatoci od menu 3 i da se setiraat vo menu 4
            } else {
                $(".inspection-of-tanks-wrapper").hide();
                $(".edinechno-odobrenie-vozilo-zapleneto").show();
            }
        }
    }

    function createLeyoutForMenu5(chosenView, chosenSubjectLinkFromFirstMenu) {
        //create the appropriate layout for the fifth menu
        var isCheckboxFromTheMenu3Table3isChecked = $('#grupa3-tabela-vid-na-prepravka-checkbox-3-1').is(':checked');
        if (chosenView === "Единечно одобрување и преправки") {
            if (chosenSubjectLinkFromFirstMenu === "- Единечно одобрување со преправка") {
                //if the first row from the 3.1 table is selected
                if (isCheckboxFromTheMenu3Table3isChecked) {
                    //show appropriate tables and hide everything else if needed
                    $(".liquid-compressed-gas-wrapper").show();
                } else {
                    //show appropriate tables and hide everything else if needed
                    $(".liquid-compressed-gas-wrapper").hide();
                }
            } else if (chosenSubjectLinkFromFirstMenu === "- Единечно одобрување-запленето") {
                //show appropriate tables and hide everything else if needed
                $(".izveshtaj-za-pregledano-vozilo-tabela").show();
                $(".liquid-compressed-gas-wrapper").hide();
            } else if (chosenSubjectLinkFromFirstMenu === "- Одобрување на преправено/поправено возило") {
                //show appropriate tables and hide everything else if needed
            	if(isCheckboxFromTheMenu3Table3isChecked){
	        		$(".liquid-compressed-gas-wrapper").show();
	        		$(".izveshtaj-za-pregledano-vozilo-tabela").hide();
            	}
            } else {
                //what we going to show if non of the three links from the first view is chosen>??
            }
        } else {
            //this means that we came on the fifth menu but not from the first view, so what we should show/hide in this situation???
            // da se vidi vo dokumentacijata sto da ima vo peto menu ako ne pristapime od prvo view
        }

    }

    //third circle handle modal inputs to automaticaly fill form input description
    $('#podatoci-vozilo-marka-modal-button').click(function () {
        $('#input-mark-vehicle').val($('#description-podatoci-vozilo-modal').val());
    });

    //third circle handle modal inputs to automaticaly fill form input type-of-engine
    $("#podatoci-vozilo-tip-motor-modal-button").click(function () {
        $("#input-type-of-engine").val($("#podatoci-vozilo-tip-motor-modal").val());
    });

    //third circle handle modal inputs to automaticaly fill form input model-of-the-vehicle (komercijalna oznaka)
    $("#podatoci-vozilo-komercijalna-oznaka-modal-button").click(function () {
        $("#model-of-the-vehicle").val($("#modal-komercijalna-oznaka").val());
    });

    //Date picker
    $('#datepicker-approval-for-embossing').datepicker({
        autoclose: true
    });

    $('#datepicker-orders-of-authority').datepicker({
        autoclose: true
    });


    $('#datepicker-individual-approval').datepicker({
        autoclose: true
    });

    $('a').tooltip();
});
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
//    	$('body').hasClass('sidebar-collapse') {
//    		$("a.sidebar-toggle").trigger("click");
//    	}
    	
    	//reset the div container
    	$('#proccess-container').removeClass("container-fluid").addClass("container");
    	
        hideErrorMessagesForValidation();
        hideErrorMessagesForVehicleDataValidation();

        var activeTab = $('.tab-pane.active');
        var activeTabId = activeTab[0].id;

        // If this returns true we know that we are validating individual_person_form
        var embgFieldExist = $('#embg-legal-entity').is(":visible");
        var chosenView = $("p#subject-type").text();

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
                    clearSecondCircleForm();
                };
            }

            //if we are on the third circle then the active tab is <div id="menu3" class="tab-pane fade active in">
            if (activeTabId === "menu3") {
                //validate the form before going to the fourth cicrcle
                if (!validate_third_step_form(chosenView)) {
                    //if validation not pass or the response is with error we do not go to the fourth step(cirlce)
                    return;
                } else {
                    clearThirdCircleForm();
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
                
                //make the main div fluid because we need more space for the table from fifth table box view
                $('#proccess-container').removeClass("container").addClass("container-fluid");
            }

        } else {
            var prevTab = activeTab.prev('.tab-pane').attr('id');
            $('[href="#' + prevTab + '"]').addClass('btn-info').removeClass('btn-default');
            $('[href="#' + prevTab + '"]').tab('show');
            if (prevTab === "menu1") {
                clearSecondCircleForm();
            }
            
            if (prevTab === "menu3") {
                //make the main div fluid because we need more space for the table from fifth table box view
                $('#proccess-container').removeClass("container").addClass("container-fluid");
            }
        }
    });

    //change the second step form layout depending on the checkbox state
    $("#individual-person-label, #legal-entity-label").change(function () {
        var placeOfResidence = $(".input-place-of-residence-wrapper");
        var embgLegalEntity = $(".embg-legal-entity-wrapper");
        var nameLegalEntity = $(".name-legal-entity-wrapper");
        var embLegalEntity = $(".emb-legal-entity-wrapper");
        var taxIdentificationNumber = $(".input-tax-identification-number-wrapper");
        var name = $(".input-name-wrapper");
        var surname = $(".input-surname-wrapper");

        //hide all error messages for validation before switch to another form
        hideErrorMessagesForValidation();

        if ($("#legal-entity-radio-button").is(':checked')) {
            //change the input names in the form when legal-entity 
            embgLegalEntity.hide();
            taxIdentificationNumber.show();
            embLegalEntity.show();
            nameLegalEntity.show();
            placeOfResidence.insertBefore(".state-of-residence");
            name.hide();
            surname.hide();
        } else {
            //change the input names in the form when individual-person
            taxIdentificationNumber.hide();
            embLegalEntity.hide();
            nameLegalEntity.hide();
            embgLegalEntity.show();
            placeOfResidence.insertBefore(".state-of-residence");
            name.show();
            surname.show();
            $('#input-name-of-agent').val(""); //clear the agent name field when individual person is shown
        }
    });

    //second circle handle modal inputs to automaticaly fill form inputs for name surname
    $('#agent-podnositel-modal-button').click(function () {
        //set the values from the modal to the input fields
        if (!$("#legal-entity-radio-button").is(':checked')) {
            $('#input-name').val($('#input-name-modal-agent-podnositel').val());
            $('#input-surname').val($('#input-surname-modal-agent-podnositel').val());
            $('#input-embg').val($('#input-embg-modal-agent-podnositel').val());
        } else {
            //legal-entity form is selected
            var name = $('#input-name-modal-agent-podnositel').val();
            var surname = $('#input-surname-modal-agent-podnositel').val();
            var fullName = name + "  " + surname;
            $('#input-name-of-agent').val(fullName);//set the agent name field
        }
    });

    function hideErrorMessagesForValidation() {
        $('#input-name').removeAttr('placeholder', '');
        $("#input-surname").removeAttr('placeholder', '');
        $("#input-address").removeAttr('placeholder', '');
        $("#input-number").removeAttr('placeholder', '');
        $("#input-contact-person").removeAttr('placeholder', '');
        $("#input-fax").removeAttr('placeholder', '');
        $("#input-email").removeAttr('placeholder', '');
        $("#input-name-of-agent").removeAttr('placeholder', '');
        $("#input-embg").removeAttr('placeholder', '');
        $("#emb-legal-entity").removeAttr('placeholder', '');
        $("#name-legal-entity").removeAttr('placeholder', '');
        $("#input-tax-identification-number").removeAttr('placeholder', '');

        $(".form-control#input-name").css("border-color", "#d2d6de");
        $(".form-control#input-surname").css("border-color", "#d2d6de");
        $(".form-control#input-address").css("border-color", "#d2d6de");
        $(".form-control#input-number").css("border-color", "#d2d6de");
        $(".form-control#input-contact-person").css("border-color", "#d2d6de");
        $(".form-control#input-fax").css("border-color", "#d2d6de");
        $(".form-control#input-email").css("border-color", "#d2d6de");
        $(".form-control#input-name-of-agent").css("border-color", "#d2d6de");
        $(".form-control#input-embg").css("border-color", "#d2d6de");
        $(".form-control#emb-legal-entity").css("border-color", "#d2d6de");
        $(".form-control#name-legal-entity").css("border-color", "#d2d6de");
        $(".form-control#input-tax-identification-number").css("border-color", "#d2d6de");
    }

    function hideErrorMessagesForVehicleDataValidation() {
        $("#input-manufacturer-of-vehicle").removeAttr('placeholder', '');
        $("#input-mark-vehicle").removeAttr('placeholder', '');
        $("#input-type").removeAttr('placeholder', '');
        $("#input-chassis-number").removeAttr('placeholder', '');
        $("#input-type-number-of-engine").removeAttr('placeholder', '');
        $("#input-vehicle-category").removeAttr('placeholder', '');
        $("#input-kind-of-renovation").removeAttr('placeholder', '');
        $("#input-number-of-adr-certificate").removeAttr('placeholder', '');
        $("#input-type-vehicle").removeAttr('placeholder', '');
        $("#input-mileage").removeAttr('placeholder', '');
        $("#input-examination-for-class").removeAttr('placeholder', '');
        $("#input-registration-mark-of-the-vehicle").removeAttr('placeholder', '');
        $("#input-type-of-vehicle-shipping-requiring-confirmation").removeAttr('placeholder', '');
        $("#input-class-of-the-vehicle").removeAttr('placeholder', '');
        $("#input-model-of-the-vehicle").removeAttr('placeholder', '');
        $("#input-number-of-seats-according-to-vehicle-license").removeAttr('placeholder', '');
        $("#input-registration-number-of-the-vehicle").removeAttr('placeholder', '');
        $("#input-year-of-first-registration").removeAttr('placeholder', '');
        $("#input-year-of-production").removeAttr('placeholder', '');

        $(".form-control#input-manufacturer-of-vehicle").css("border-color", "#d2d6de");
        $(".form-control#input-mark-vehicle").css("border-color", "#d2d6de");
        $(".form-control#input-type").css("border-color", "#d2d6de");
        $(".form-control#input-chassis-number").css("border-color", "#d2d6de");
        $(".form-control#input-type-number-of-engine").css("border-color", "#d2d6de");
        $(".form-control#input-vehicle-category").css("border-color", "#d2d6de");
        $(".form-control#input-kind-of-renovation").css("border-color", "#d2d6de");
        $(".form-control#input-number-of-adr-certificate").css("border-color", "#d2d6de");
        $(".form-control#input-type-vehicle").css("border-color", "#d2d6de");
        $(".form-control#input-mileage").css("border-color", "#d2d6de");
        $(".form-control#input-examination-for-class").css("border-color", "#d2d6de");
        $(".form-control#input-registration-mark-of-the-vehicle").css("border-color", "#d2d6de");
        $(".form-control#input-type-of-vehicle-shipping-requiring-confirmation").css("border-color", "#d2d6de");
        $(".form-control#input-class-of-the-vehicle").css("border-color", "#d2d6de");
        $(".form-control#input-model-of-the-vehicle").css("border-color", "#d2d6de");
        $(".form-control#input-number-of-seats-according-to-vehicle-license").css("border-color", "#d2d6de");
        $(".form-control#input-registration-number-of-the-vehicle").css("border-color", "#d2d6de");
        $(".form-control#input-year-of-first-registration").css("border-color", "#d2d6de");
        $(".form-control#input-year-of-production").css("border-color", "#d2d6de");
    }

    function clearSecondCircleForm() {
        $('#input-name').val('');
        $("#input-surname").val('');
        $("#input-address").val('');
        $("#input-number").val('');
        $("#input-contact-person").val('');
        $("#input-fax").val('');
        $("#input-email").val('');
        $("#input-name-of-agent").val('');
        $("#input-embg").val('');
        $("#emb-legal-entity").val('');
        $("#name-legal-entity").val('');
        $("#input-tax-identification-number").val('');
        $("#input-municipality-of-residence").val('');
        $("#input-place-of-residence").val('');
        $("#input-municipality-of-residence").val('');
    }

    function clearThirdCircleForm() {
        $("#input-manufacturer-of-vehicle").val('');
        $("#input-mark-vehicle").val('');
        $("#input-type").val('');
        $("#input-chassis-number").val('');
        $("#input-type-number-of-engine").val('');
        $("#input-vehicle-category").val('');
        $("#input-kind-of-renovation").val('');
        $("#input-number-of-adr-certificate").val('');
        $("#input-type-vehicle").val('');
        $("#input-mileage").val('');
        $("#input-examination-for-class").val('');
        $("#input-registration-mark-of-the-vehicle").val('');
        $("#input-type-of-vehicle-shipping-requiring-confirmation").val('');
        $("#input-class-of-the-vehicle").val('');
        $("#input-model-of-the-vehicle").val('');
        $("#input-number-of-seats-according-to-vehicle-license").val('');
        $("#input-registration-number-of-the-vehicle").val('');
        $("#input-year-of-first-registration").val('');
        $("#input-year-of-production").val('');
    }

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

    //regex for email validation
    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    /*=========SECOND FORM VALIDATION=======*/

    //form validation
    function validate_second_step_form(embgFieldExist) {
        //common fields
        var isFormSubmitted = true;

        var name = $("#input-name").val();
        if (name === "") {
            $('#input-name').attr('placeholder', 'Внеси Име').val('');
            $(".form-control#input-name").css("border-color", "#dd4b39");
            isFormSubmitted = false;
        }

        var surname = $("#input-surname").val();
        if (surname === "") {
            $('#input-surname').attr('placeholder', 'Внеси Презиме').val('');
            $(".form-control#input-surname").css("border-color", "#dd4b39");
            isFormSubmitted = false;
        }

        var address = $("#input-address").val();
        if (address === "") {
            $("#input-address").attr("placeholder", "Внеси адреса").val("");
            $(".form-control#input-address").css("border-color", "#dd4b39");
            isFormSubmitted = false;
        }

        var phoneNumber = $("#input-number").val();
        if (phoneNumber === "" || isNaN(phoneNumber)) {
            $("#input-number").attr("placeholder", "Внеси контакт телефон").val("");
            $(".form-control#input-number").css("border-color", "#dd4b39");
            isFormSubmitted = false;
        }

        var personForContact = $("#input-contact-person").val();
        if (personForContact === "") {
            $("#input-contact-person").attr("placeholder", "Внеси контакт лице").val("");
            $(".form-control#input-contact-person").css("border-color", "#dd4b39");
            isFormSubmitted = false;
        }

        var fax = $("#input-fax").val();
        if (fax === "" || isNaN(fax)) {
            $("#input-fax").attr("placeholder", "Внеси факс").val("");
            $(".form-control#input-fax").css("border-color", "#dd4b39");
            isFormSubmitted = false;
        }

        var emailAddress = $("#input-email").val();
        if (emailAddress === "" || !isEmail(emailAddress)) {
            $("#input-email").attr("placeholder", "Внеси Е-маил").val("");
            $(".form-control#input-email").css("border-color", "#dd4b39");
            isFormSubmitted = false;
        }

        var applicant = $("#input-name-of-agent").val();
        if (applicant === "") {
            $("#input-name-of-agent").attr("placeholder", "Внеси име и презиме на агент - подносител на барањето").val("");
            $(".form-control#input-name-of-agent").css("border-color", "#dd4b39");
            isFormSubmitted = false;
        }

        //object with common input values
        var inputValues = {
            'name': name, 'surname': surname, 'address': address, 'phoneNumber': phoneNumber, 'personForContact': personForContact,
            'fax': fax, 'emailAddress': emailAddress, 'applicant': applicant
        };

        //validate fields for the first form
        if (embgFieldExist) {
            var embg = $("#input-embg").val();
            inputValues.embg = embg;

            if (embg === "" || isNaN(embg)) {
                $("#input-embg").attr("placeholder", "Внеси ЕМБГ").val("");
                $(".form-control#input-embg").css("border-color", "#dd4b39");
                isFormSubmitted = false;
            }
        } else {
            //validate fields for the second form
            var emb = $("#emb-legal-entity").val();
            if (emb === "" || isNaN(emb)) {
                $("#emb-legal-entity").attr("placeholder", "Внеси ЕМБ").val("");
                $(".form-control#emb-legal-entity").css("border-color", "#dd4b39");
                isFormSubmitted = false;
            }

            var nameLegalEntity = $("#name-legal-entity").val();
            if (nameLegalEntity === "") {
                $("#name-legal-entity").attr("placeholder", "Внеси назив").val("");
                $(".form-control#name-legal-entity").css("border-color", "#dd4b39");
                isFormSubmitted = false;
            }

            var taxNumber = $("#input-tax-identification-number").val();
            if (taxNumber === "" || isNaN(taxNumber)) {
                $("#input-tax-identification-number").attr("placeholder", "Внеси ЕДБ (даночен број)").val("");
                $(".form-control#input-tax-identification-number").css("border-color", "#dd4b39");
                isFormSubmitted = false;
            }

            inputValues.emb = emb;
            inputValues.nameLegalEntity = nameLegalEntity;
            inputValues.taxNumber = taxNumber;
        }

        //send the request if the validation pass
        if (isFormSubmitted) {
            //we do ajax call to backend with all form inputs as json for ex.
            inputValues = JSON.stringify(inputValues);

            //send request
            $.ajax({
                type: "POST",
                url: "",
                async: false,
                cache: false,
                Accept: 'application/json',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: inputValues,
                success: function (response) {
                    //what we will do on success case?
                    hideErrorMessagesForValidation();
                    isFormSubmitted = true;
                },
                error: function (response) {
                    //what we will do on error case?
                    isFormSubmitted = true;
                }
            });
        }
        return true;
        //    	return true;
    }
    
    //going from first view to fifth view by clickng the link
    $("#potvrda-tehnicki-karakteristiki").click(function(e) {
		e.preventDefault();
		//hide all elements for the first view and show the table from the fifth view.
		$(".data-entry-vehicle").hide();
		$(".data-entry-vehicle-header").hide();
		$(".content-header-recording-of-contributions").hide();
		$(".content-recording-of-contributions-first-view").hide();
        $(".confirmation-of-the-technical-characteristics-wrapper").show(); //show the table
        $("a.sidebar-toggle").trigger("click"); // we trigger a click on the sidebar button in order to get all space for the table
	})
	
	//hide or show columns when user is swithcing between legal entity or individual person
	$(document).on('change', '#fizichko-lice-tehnicki-karakteristiki-labela, #pravno-lice-tehnicki-karakteristiki-labela', function () {
        if ($("#legal-entity-tehnicki-karakteristiki-radio-button").is(':checked')) {
            //hide ime, prezime columns and show naziv
        	$('.ime-tehnicki-karakteristiki').hide();
        	$('.prezime-tehnicki-karakteristiki').hide();
        	$('.naziv-tehnicki-karakteristiki').show();
        } else {
            //show ime, prezime columns and hide naziv
        	$('.ime-tehnicki-karakteristiki').show();
        	$('.prezime-tehnicki-karakteristiki').show();
        	$('.naziv-tehnicki-karakteristiki').hide();
        }
	});

    //here we creating the wanted layout of the first part of the third circle view (Vnesuvanje na podatoci za voziloto)
    function changeFormLayoutForVehicleData(chosenView) {
        //create the appropriate form layout

        var manufacturerOfVehicle = $(".input-manufacturer-of-vehicle-wrapper");
        var typeOfEngine = $(".input-type-of-engine-wrapper");
        var numberOfEngine = $(".input-number-of-engine-wrapper");
        var vehicleCategory = $(".input-vehicle-category-wrapper");
        var kindOfRenovation = $(".input-kind-of-renovation-wrapper");
        var registrationNumberOfTheVehicle = $(".input-registration-number-of-the-vehicle-wrapper");
        var numberOfAdrCertificate = $(".input-number-of-adr-certificate-wrapper");
        var typeVehicle = $(".input-type-vehicle-wrapper");
        var mileage = $(".input-mileage-wrapper");
        var registrationMarkOfTheVehicle = $(".input-registration-mark-of-the-vehicle-wrapper");
        var typeOfVehicleShippingRequiringConfirmation = $(".input-type-of-vehicle-shipping-requiring-confirmation-wrapper");
        var classOfTheVehicle = $(".input-class-of-the-vehicle-wrapper");
        var modelOfTheVehicle = $(".input-model-of-the-vehicle-wrapper");
        var numberOfSeats = $(".input-number-of-seats-according-to-vehicle-license-wrapper");
        var yearOfFirstRegistration = $(".input-year-of-first-registration-wrapper");
        var yearOfProduction = $(".input-year-of-production-wrapper");
        var examinationForClass = $(".input-examination-for-class-wrapper");
        var type = $(".input-type-wrapper");
        var markVehicle = $(".input-mark-vehicle-wrapper");
        var potvrdaZaTehnickiKarakteristiki = $(".confirmation-of-the-technical-characteristics-wrapper");

        //common input fields
        var chassisNumber = $(".input-chassis-number-wrapper");

        if (chosenView === "Единечно одобрување и преправки" || chosenView === "Одобрување на тип на возило") {
            //add the needed fields and remove the ones that do not need
            manufacturerOfVehicle.show();
            typeOfEngine.show();
            numberOfEngine.show();
            vehicleCategory.show();
            kindOfRenovation.show();
        } else if (chosenView === "Идентификација на возило и идентификација и оцена на техничката состојба") {
            manufacturerOfVehicle.show();
            typeOfEngine.show();
            numberOfEngine.show();
            vehicleCategory.show();
            chassisNumber.insertAfter(type);
        } else if (chosenView === "Втиснување на идентификациски ознаки") {
            
        } else if (chosenView === "АДР") {
            manufacturerOfVehicle.show();
            typeOfEngine.insertAfter(chassisNumber);
            numberOfEngine.show();
            vehicleCategory.show();
            registrationNumberOfTheVehicle.show();
            numberOfAdrCertificate.show();
        } else if (chosenView === "Потврда за технички карактеристики") {
        	potvrdaZaTehnickiKarakteristiki.show();
        } else if (chosenView === "ЦЕМТ") {
            typeVehicle.show();
            typeOfEngine.show();
            numberOfEngine.show();
            mileage.show();
        } else if (chosenView === "Калибрација на тахографи") {
            manufacturerOfVehicle.show();
            typeOfEngine.hide();
            numberOfEngine.hide();
            registrationMarkOfTheVehicle.show();
            chassisNumber.insertBefore(registrationMarkOfTheVehicle);
            $(".content-recording-of-contributions-third-view").hide();
        } else if (chosenView === "ПТЕУ") {
            manufacturerOfVehicle.show();
            typeOfVehicleShippingRequiringConfirmation.show();
            classOfTheVehicle.show();
            modelOfTheVehicle.show();
            numberOfSeats.show();
            registrationNumberOfTheVehicle.show();
            yearOfFirstRegistration.show();
            yearOfProduction.show();
            registrationNumberOfTheVehicle.insertAfter(chassisNumber);
            typeOfVehicleShippingRequiringConfirmation.insertAfter(registrationNumberOfTheVehicle);
        } else if (chosenView === "Одобрување на тип на возило") {
            $(".content-header.data-entry-vehicle-header").hide();
            $(".content.data-entry-vehicle").hide();
            $(".content-recording-of-contributions-third-view").hide();
        } else if (chosenView === "АТП") {
            typeVehicle.show();
            examinationForClass.show();
            typeVehicle.insertBefore(examinationForClass);
            typeOfEngine.hide();
            numberOfEngine.hide();
        }
    }

    function changeFormLayoutForContributionsEvidence(chosenView) {
        if (chosenView === "Единечно одобрување и преправки") {
            $(".content-header-recording-of-contributions").show();
            $(".content-recording-of-contributions-first-view").show();
            $(".box-primary-first-view-wrapper").show();

            $(".content-recording-of-contributions-third-view").hide();
            $(".box-primary-third-view-wrapper").hide();
        } else if (chosenView === "Идентификација на возило и идентификација и оцена на техничката состојба") {
            $(".content-header-recording-of-contributions").show();
            $(".content-recording-of-contributions-second-view").show();
            $(".box-primary-second-view-wrapper").show();

            $(".content-recording-of-contributions-third-view").hide();
            $(".box-primary-third-view-wrapper").hide();
        } else if (chosenView === "Втиснување на идентификациски ознаки") {
            $(".content-header-recording-of-contributions").show();
            $(".content-recording-of-contributions-third-view").show();
            $(".box-primary-third-view-wrapper").show();
        } else if (chosenView === "АДР") {
            $(".content-header-recording-of-contributions").show();
            $(".content-recording-of-contributions-fourth-view").show();
            $(".box-primary-fourth-view-wrapper").show();

            $(".content-recording-of-contributions-third-view").hide();
            $(".box-primary-third-view-wrapper").hide();
        } else if (chosenView === "Потврда за технички карактеристики") {
            $(".content-header-confirmation-of-the-technical-characteristics").show();
            $("confirmation-of-the-technical-characteristics-fifth-view").show();
            $(".box - wrapper - fifth - view").show();
            $(".content-header.data-entry-vehicle-header").hide();
            $(".content.data-entry-vehicle").hide();
            $(".content-recording-of-contributions-third-view").hide();
        } else if (chosenView === "ЦЕМТ") {
            $(".content-header-recording-of-contributions").show();
            $(".content-recording-of-contributions-sixth-view").show();
            $(".box-primary-sixth-view-wrapper").show();

            $(".content-recording-of-contributions-third-view").hide();
            $(".box-primary-third-view-wrapper").hide();
        } else if (chosenView === "ПТЕУ") {
            $(".content-header-recording-of-contributions").show();
            $(".content-recording-of-contributions-eighth-view").show();
            $(".box-primary-eighth-view-wrapper").show();

            $(".content-recording-of-contributions-third-view").hide();
            $(".box-primary-third-view-wrapper").hide();
        } else if (chosenView === "АТП") {
            $(".content-header-recording-of-contributions").show();
            $(".content-recording-of-contributions-tenth-view").show();
            $(".box-primary-tenth-view-wrapper").show();

            $(".content-recording-of-contributions-third-view").hide();
            $(".box-primary-third-view-wrapper").hide();
        }
    }


    /*=========THIRD FORM VALIDATION=======*/

    //form validation
    function validate_third_step_form(chosenView) {

        //we have to validate 
        var isFormValid = true;
        //common fields
        var inputMarkVehicle = $("#input-mark-vehicle").val();
        if (inputMarkVehicle === "") {
            $('#input-mark-vehicle').attr('placeholder', 'Внеси марка на возило').val('');
            $(".form-control#input-mark-vehicle").css("border-color", "#dd4b39");
            isFormValid = false;
        }

        var inputType = $("#input-type").val();
        if (inputType === "") {
            $("#input-type").attr('placeholder', 'Внеси тип').val('');
            $(".form-control#input-type").css("border-color", "#dd4b39");
            isFormValid = false;
        }

        var inputChassisNumber = $("#input-chassis-number").val();
        if (inputChassisNumber === "" || isNaN(inputChassisNumber)) {
            $("#input-chassis-number").attr('placeholder', 'Внеси број на шасија').val('');
            $(".form-control#input-chassis-number").css("border-color", "#dd4b39");
            isFormValid = false;
        }

        var vehicleDate = { 'inputMarkVehicle': inputMarkVehicle, 'inputType': inputType, 'inputChassisNumber': inputChassisNumber };


        if (chosenView === "Единечно одобрување и преправки" || chosenView === "Втиснување на идентификациски ознаки" || chosenView === "Потврда за технички карактеристики"
            || chosenView === "Одобрување на тип на возило") {

            var inputManufacturerOfVehicle = $("#input-manufacturer-of-vehicle").val();
            if (inputManufacturerOfVehicle === "") {
                $("#input-manufacturer-of-vehicle").attr('placeholder', 'Внеси производител на возило').val('');
                $(".form-control#input-manufacturer-of-vehicle").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputTypeNumberOfEngine = $("#input-type-number-of-engine").val();
            if (inputTypeNumberOfEngine === "" || isNaN(inputTypeNumberOfEngine)) {
                $("#input-type-number-of-engine").attr('placeholder', 'Внеси тип/број на мотор').val('');
                $(".form-control#input-type-number-of-engine").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputVehicleCategory = $("#input-vehicle-category").val();
            if (inputVehicleCategory === "") {
                $("#input-vehicle-category").attr('placeholder', 'Внеси категорија на возило').val('');
                $(".form-control#input-vehicle-category").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputKindOfRenovation = $("#input-kind-of-renovation").val();
            if (inputKindOfRenovation === "") {
                $("#input-kind-of-renovation").attr('placeholder', 'Внеси вид на преправката').val('');
                $(".form-control#input-kind-of-renovation").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            vehicleDate.inputManufacturerOfVehicle = inputManufacturerOfVehicle;
            vehicleDate.inputTypeNumberOfEngine = inputTypeNumberOfEngine;
            vehicleDate.inputVehicleCategory = inputVehicleCategory;
            vehicleDate.inputKindOfRenovation = inputKindOfRenovation;

        } else if (chosenView === "Идентификација на возило и идентификација и оцена на техничката состојба") {

            var inputManufacturerOfVehicle = $("#input-manufacturer-of-vehicle").val();
            if (inputManufacturerOfVehicle === "") {
                $("#input-manufacturer-of-vehicle").attr('placeholder', 'Внеси производител на возило').val('');
                $(".form-control#input-manufacturer-of-vehicle").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputTypeNumberOfEngine = $("#input-type-number-of-engine").val();
            if (inputTypeNumberOfEngine === "" || isNaN(inputTypeNumberOfEngine)) {
                $("#input-type-number-of-engine").attr('placeholder', 'Внеси тип/број на мотор').val('');
                $(".form-control#input-type-number-of-engine").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputVehicleCategory = $("#input-vehicle-category").val();
            if (inputVehicleCategory === "") {
                $("#input-vehicle-category").attr('placeholder', 'Внеси категорија на возило').val('');
                $(".form-control#input-vehicle-category").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            vehicleDate.inputManufacturerOfVehicle = inputManufacturerOfVehicle;
            vehicleDate.inputTypeNumberOfEngine = inputTypeNumberOfEngine;
            vehicleDate.inputVehicleCategory = inputVehicleCategory;

        } else if (chosenView === "АДР") {

            var inputManufacturerOfVehicle = $("#input-manufacturer-of-vehicle").val();
            if (inputManufacturerOfVehicle === "") {
                $("#input-manufacturer-of-vehicle").attr('placeholder', 'Внеси производител на возило').val('');
                $(".form-control#input-manufacturer-of-vehicle").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputTypeNumberOfEngine = $("#input-type-number-of-engine").val();
            if (inputTypeNumberOfEngine === "" || isNaN(inputTypeNumberOfEngine)) {
                $("#input-type-number-of-engine").attr('placeholder', 'Внеси тип/број на мотор').val('');
                $(".form-control#input-type-number-of-engine").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputVehicleCategory = $("#input-vehicle-category").val();
            if (inputVehicleCategory === "") {
                $("#input-vehicle-category").attr('placeholder', 'Внеси категорија на возило').val('');
                $(".form-control#input-vehicle-category").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputRegistrationNumberOfTheVehicle = $("#input-registration-number-of-the-vehicle").val();
            if (inputRegistrationNumberOfTheVehicle === "" || isNaN(inputRegistrationNumberOfTheVehicle)) {
                $("#input-registration-number-of-the-vehicle").attr('placeholder', 'Внеси регистарски број на возило').val('');
                $(".form-control#input-registration-number-of-the-vehicle").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputNumberOfAdrCertificate = $("#input-number-of-adr-certificate").val();
            if (inputNumberOfAdrCertificate === "" || isNaN(inputNumberOfAdrCertificate)) {
                $("#input-number-of-adr-certificate").attr('placeholder', 'Внеси број на АДР сертификат и институција која го издала').val('');
                $(".form-control#input-number-of-adr-certificate").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            vehicleDate.inputManufacturerOfVehicle = inputManufacturerOfVehicle;
            vehicleDate.inputTypeNumberOfEngine = inputTypeNumberOfEngine;
            vehicleDate.inputVehicleCategory = inputVehicleCategory;
            vehicleDate.inputRegistrationNumberOfTheVehicle = inputRegistrationNumberOfTheVehicle;
            vehicleDate.inputNumberOfAdrCertificate = inputNumberOfAdrCertificate;

        } else if (chosenView === "ЦЕМТ") {

            var inputTypeVehicle = $("#input-type-vehicle").val();
            if (inputTypeVehicle === "") {
                $("#input-type-vehicle").attr('placeholder', 'Внеси вид на возило').val('');
                $(".form-control#input-type-vehicle").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputTypeNumberOfEngine = $("#input-type-number-of-engine").val();
            if (inputTypeNumberOfEngine === "" || isNaN(inputTypeNumberOfEngine)) {
                $("#input-type-number-of-engine").attr('placeholder', 'Внеси тип/број на мотор').val('');
                $(".form-control#input-type-number-of-engine").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputMileage = $("#input-mileage").val();
            if (inputMileage === "" || isNaN(inputMileage)) {
                $("#input-mileage").attr('placeholder', 'Внеси километража').val('');
                $(".form-control#input-mileage").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            vehicleDate.inputTypeVehicle = inputTypeVehicle;
            vehicleDate.inputTypeNumberOfEngine = inputTypeNumberOfEngine;
            vehicleDate.inputMileage = inputMileage;

        } else if (chosenView === "Калибрација на тахографи") {

            var inputManufacturerOfVehicle = $("#input-manufacturer-of-vehicle").val();
            if (inputManufacturerOfVehicle === "") {
                $("#input-manufacturer-of-vehicle").attr('placeholder', 'Внеси производител на возило').val('');
                $(".form-control#input-manufacturer-of-vehicle").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputRegistrationMarkOfTheVehicle = $("#input-registration-mark-of-the-vehicle").val();
            if (inputRegistrationMarkOfTheVehicle === "") {
                $("#input-registration-mark-of-the-vehicle").attr('placeholder', 'Внеси регистерска ознака на возилото ').val('');
                $(".form-control#input-registration-mark-of-the-vehicle").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            vehicleDate.inputManufacturerOfVehicle = inputManufacturerOfVehicle;
            vehicleDate.inputRegistrationMarkOfTheVehicle = inputRegistrationMarkOfTheVehicle;

        } else if (chosenView === "ПТЕУ") {

            var inputManufacturerOfVehicle = $("#input-manufacturer-of-vehicle").val();
            if (inputManufacturerOfVehicle === "") {
                $("#input-manufacturer-of-vehicle").attr('placeholder', 'Внеси производител на возилото').val('');
                $("#input-manufacturer-of-vehicle").attr('placeholder', 'Внеси регистерска ознака на возилото ').val('');
                $(".form-control#input-manufacturer-of-vehicle").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputTypeOfVehicleShippingRequiringConfirmation = $("#input-type-of-vehicle-shipping-requiring-confirmation").val();
            if (inputTypeOfVehicleShippingRequiringConfirmation === "") {
                $("#input-type-of-vehicle-shipping-requiring-confirmation").attr('placeholder', 'Внеси вид на возило за превозот за кој се бара Потврда').val('');
                $(".form-control#input-type-of-vehicle-shipping-requiring-confirmation").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputClassOfTheVehicle = $("#input-class-of-the-vehicle").val();
            if (inputClassOfTheVehicle === "") {
                $("#input-class-of-the-vehicle").attr('placeholder', 'Внеси класа на возило').val('');
                $(".form-control#input-class-of-the-vehicle").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputModelOfTheVehicle = $("#input-model-of-the-vehicle").val();
            if (inputModelOfTheVehicle === "") {
                $("#input-model-of-the-vehicle").attr('placeholder', 'Внеси модел на возило (комерцијална ознака)').val('');
                $(".form-control#input-model-of-the-vehicle").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputNumberOfSeatsAccordingToVehicleLicense = $("#input-number-of-seats-according-to-vehicle-license").val();
            if (inputNumberOfSeatsAccordingToVehicleLicense === "" || isNaN(inputNumberOfSeatsAccordingToVehicleLicense)) {
                $("#input-number-of-seats-according-to-vehicle-license").attr('placeholder', 'Внеси број на седишта според сообраќајна дозвола').val('');
                $(".form-control#input-number-of-seats-according-to-vehicle-license").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputRegistrationNumberOfTheVehicle = $("#input-registration-number-of-the-vehicle").val();
            if (inputRegistrationNumberOfTheVehicle === "" || isNaN(inputRegistrationNumberOfTheVehicle)) {
                $("#input-registration-number-of-the-vehicle").attr('placeholder', 'Внеси регистарски број на возило').val('');
                $(".form-control#input-registration-number-of-the-vehicle").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputYearOfFirstRegistration = $("#input-year-of-first-registration").val();
            if (inputYearOfFirstRegistration === "" || isNaN(inputYearOfFirstRegistration)) {
                $("#input-year-of-first-registration").attr('placeholder', 'Внеси година на прва регистрација во РМ').val('');
                $(".form-control#input-year-of-first-registration").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputYearOfProduction = $("#input-year-of-production").val();
            if (inputYearOfProduction === "" || isNaN(inputYearOfProduction)) {
                $("#input-year-of-production").attr('placeholder', 'Внеси година на производство').val('');
                $(".form-control#input-year-of-production").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            vehicleDate.inputManufacturerOfVehicle = inputManufacturerOfVehicle;
            vehicleDate.inputTypeOfVehicleShippingRequiringConfirmation = inputTypeOfVehicleShippingRequiringConfirmation;
            vehicleDate.inputClassOfTheVehicle = inputClassOfTheVehicle;
            vehicleDate.inputModelOfTheVehicle = inputModelOfTheVehicle;
            vehicleDate.inputNumberOfSeatsAccordingToVehicleLicense = inputNumberOfSeatsAccordingToVehicleLicense;
            vehicleDate.inputRegistrationNumberOfTheVehicle = inputRegistrationNumberOfTheVehicle;
            vehicleDate.inputYearOfFirstRegistration = inputYearOfFirstRegistration;
            vehicleDate.inputYearOfProduction = inputYearOfProduction;

        } else if (chosenView === "АТП") {

            var inputTypeVehicle = $("#input-type-vehicle").val();
            if (inputTypeVehicle === "") {
                $("#input-type-vehicle").attr('placeholder', 'Внеси вид на возилото').val('');
                $(".form-control#input-type-vehicle").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            var inputExaminationForClass = $("#input-examination-for-class").val();
            if (inputExaminationForClass === "") {
                $("#input-examination-for-class").attr('placeholder', 'Внеси испитување за класа').val('');
                $(".form-control#input-examination-for-class").css("border-color", "#dd4b39");
                isFormValid = false;
            }

            vehicleDate.inputTypeVehicle = inputTypeVehicle;
            vehicleDate.inputExaminationForClass = inputExaminationForClass;

        }

        //return isFormValid;
        return true;
    }


    //Date picker
    $('#datepicker').datepicker({
        autoclose: true
    });

    $('#datepicker2').datepicker({
        autoclose: true
    });


    $('#datepicker3').datepicker({
        autoclose: true
    });
 
    $('a').tooltip();   

});
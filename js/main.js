$(document).ready(function () {
    //loading the html layout and add to the DOM
    //	$("#load-template").on("click", function() {
    //        $("#page-content-wrapper").load("page-content-template.html");
    //	});

    //show the proccess content on click
    $('#load-template').click(function (e) {
        $('#proccess-container').show();
    });

    $('.box-toggle').click(function (e) {
        $('.btn-menu1').removeClass('btn-info').addClass('btn-default');
        $('.btn-menu2').addClass('btn-info').removeClass('btn-default').blur();
    });

    //when click on a circle then that circle is blue
    $(document).on('click', '.btn-circle', function () {
    	hideErrorMessagesForValidation();
        $('.btn-circle.btn-info').removeClass('btn-info').addClass('btn-default');
        $(this).addClass('btn-info').removeClass('btn-default').blur();
    });

    //this is the behaviour when click on next or back buttons
    $(document).on('click', '.next-step, .prev-step', function (e) {
    	hideErrorMessagesForValidation();
    	clearSecondCircleForm();
    	var activeTab = $('.tab-pane.active');
    	var activeTabId = activeTab[0].id;
        
        // If this returns true we know that we are validating individual_person_form
        var embgFieldExist =  $('#embg-legal-entity').is(":visible"); 
        
        //if activeTab is div#menu2 we call a fucntion for sending a request to the backend with validation 
        //for ex. activeTab = <div id="menu2" class="tab-pane fade active in">
        if(activeTabId === "menu2" && $(e.target).hasClass('next-step')) {
        	
        	//validate the form and send a request
        	if(!validate_second_step_form(embgFieldExist)) {
        		//if validation not pass or the response is with error we do not go to the third step(cirlce)
        		return;
        	};
        }
        
        //if we are on the third circle then the active tab is <div id="menu3" class="tab-pane fade active in">
        if(activeTabId === "menu3" && $(e.target).hasClass('next-step')) {
        	var checkSubjectName = $("p#subject-type").text();
        	
        	//validate the form before going to the fourth cicrcle
        	if(!validate_third_step_form(checkSubjectName)) {
        		//if validation not pass or the response is with error we do not go to the fourth step(cirlce)
        		return;
        	};
        }

        $('.btn-circle.btn-info').removeClass('btn-info').addClass('btn-default');

        if ($(e.target).hasClass('next-step')) {
            var nextTab = activeTab.next('.tab-pane').attr('id');
            $('[href="#' + nextTab + '"]').addClass('btn-info').removeClass('btn-default');
            $('[href="#' + nextTab + '"]').tab('show');
            
            if(nextTab === "menu3") {
            	var checkSubjectName = $("p#subject-type").text();
            	//change the form layout depending of the clicked subject
            	changeFormLayout(checkSubjectName);
            }
            
        } else {
            var prevTab = activeTab.prev('.tab-pane').attr('id');
            $('[href="#' + prevTab + '"]').addClass('btn-info').removeClass('btn-default');
            $('[href="#' + prevTab + '"]').tab('show');
        }
    });

    //change the second step form layout depending on the checkbox state
    $("#individual-person-label, #legal-entity-label").change(function () {
    	var placeOfResidence = $(".input-place-of-residence-wrapper");
    	var embgLegalEntity = $(".embg-legal-entity-wrapper");
    	var nameLegalEntity = $(".name-legal-entity-wrapper");
    	var embLegalEntity = $(".emb-legal-entity-wrapper");
    	var taxIdentificationNumber = $(".input-tax-identification-number-wrapper");
    	
    	//hide all error messages for validation before switch to another form
    	hideErrorMessagesForValidation();
    	
        if ($("#legal-entity-radio-button").is(':checked')) { // for legal-entity 
            //change the input names in the form when individual-person 
        	embgLegalEntity.hide();
        	taxIdentificationNumber.show();
            embLegalEntity.show();
            nameLegalEntity.show();
            placeOfResidence.insertBefore(".state-of-residence");
        } else {
            //change the input names in the form when legal-entity 
        	taxIdentificationNumber.hide();
            embLegalEntity.hide();
            nameLegalEntity.hide();
            embgLegalEntity.show();
            placeOfResidence.insertAfter(".municipality-of-residence");
        }
    });
    
    function hideErrorMessagesForValidation() {
    	$('#input-name').removeAttr('placeholder','');
    	$("#input-surname").removeAttr('placeholder','');
    	$("#input-address").removeAttr('placeholder','');
    	$("#input-number").removeAttr('placeholder','');
    	$("#input-contact-person").removeAttr('placeholder','');
    	$("#input-fax").removeAttr('placeholder','');
    	$("#input-email").removeAttr('placeholder','');
    	$("#input-name-of-agent").removeAttr('placeholder','');
    	$("#input-embg").removeAttr('placeholder','');
    	$("#emb-legal-entity").removeAttr('placeholder','');
    	$("#name-legal-entity").removeAttr('placeholder','');
    	$("#input-tax-identification-number").removeAttr('placeholder','');
    	
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
    
    function clearSecondCircleForm(){
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
    	if(name === "") {
    		$('#input-name').attr('placeholder','Внеси Име').val('');
			$(".form-control#input-name").css("border-color", "#dd4b39");
			isFormSubmitted = false;
    	}
    	
    	var surname = $("#input-surname").val();
    	if(surname === "") {
    		$('#input-surname').attr('placeholder','Внеси Презиме').val('');
    		$(".form-control#input-surname").css("border-color", "#dd4b39");
			isFormSubmitted = false;
    	}
    	
    	var address = $("#input-address").val();
    	if(address === "") {
    		$("#input-address").attr("placeholder", "Внеси адреса").val("");
    		$(".form-control#input-address").css("border-color", "#dd4b39");
			isFormSubmitted = false;
    	}
    	
    	var phoneNumber = $("#input-number").val();
    	if(phoneNumber === "" || isNaN(phoneNumber)) {
    		$("#input-number").attr("placeholder", "Внеси контакт телефон").val("");
    		$(".form-control#input-number").css("border-color", "#dd4b39");
			isFormSubmitted = false;
    	}
    	
    	var personForContact = $("#input-contact-person").val();
    	if(personForContact === "") {
    		$("#input-contact-person").attr("placeholder", "Внеси контакт лице").val("");
    		$(".form-control#input-contact-person").css("border-color", "#dd4b39");
			isFormSubmitted = false;
    	}
    	
    	var fax = $("#input-fax").val();
    	if(fax === "" || isNaN(fax)) {
    		$("#input-fax").attr("placeholder", "Внеси факс").val("");
    		$(".form-control#input-fax").css("border-color", "#dd4b39");
			isFormSubmitted = false;
    	}
    	
    	var emailAddress = $("#input-email").val();
    	if(emailAddress === "" || !isEmail(emailAddress)) {
    		$("#input-email").attr("placeholder", "Внеси Е-маил").val("");
    		$(".form-control#input-email").css("border-color", "#dd4b39");
			isFormSubmitted = false;
    	}
    	
    	var applicant = $("#input-name-of-agent").val();
    	if(applicant === "") {
    		$("#input-name-of-agent").attr("placeholder", "Внеси име и презиме на агент - подносител на барањето").val("");
    		$(".form-control#input-name-of-agent").css("border-color", "#dd4b39");
			isFormSubmitted = false;
    	}
    	
    	//object with common input values
    	var inputValues = {'name': name, 'surname' : surname, 'address' : address, 'phoneNumber' : phoneNumber, 'personForContact' : personForContact,
    			           'fax' : fax, 'emailAddress' : emailAddress, 'applicant' : applicant};
    	
    	//validate fields for the first form
    	if(embgFieldExist) {
    		var embg = $("#input-embg").val();
    		inputValues.embg = embg;
    		
    		if(embg === "" || isNaN(embg)) {
    			$("#input-embg").attr("placeholder", "Внеси ЕМБГ").val("");
    			$(".form-control#input-embg").css("border-color", "#dd4b39");
    			isFormSubmitted = false;
        	}
    	} else {
    		//validate fields for the second form
    		var emb = $("#emb-legal-entity").val();
    		if(emb === "" || isNaN(emb)) {
    			$("#emb-legal-entity").attr("placeholder", "Внеси ЕМБ").val("");
    			$(".form-control#emb-legal-entity").css("border-color", "#dd4b39");
    			isFormSubmitted = false;
        	}
    		
    		var nameLegalEntity = $("#name-legal-entity").val();
    		if(nameLegalEntity === "") {
    			$("#name-legal-entity").attr("placeholder", "Внеси назив").val("");
    			$(".form-control#name-legal-entity").css("border-color", "#dd4b39");
    			isFormSubmitted = false;
        	}
    		
    		var taxNumber = $("#input-tax-identification-number").val();
    		if(taxNumber === "" || isNaN(taxNumber)) {
    			$("#input-tax-identification-number").attr("placeholder", "Внеси ЕДБ (даночен број)").val("");
    			$(".form-control#input-tax-identification-number").css("border-color", "#dd4b39");
    			isFormSubmitted = false;
        	}
    		
    		inputValues.emb = emb;
    		inputValues.nameLegalEntity = nameLegalEntity;
    		inputValues.taxNumber = taxNumber;
    	}
    	
    	//send the request if the validation pass
    	if(isFormSubmitted) {
    		//we do ajax call to backend with all form inputs as json for ex.
            inputValues = JSON.stringify(inputValues);
            
          //send request
    		$.ajax({
    			type: "POST",
    			url: "",
    			async: false,
    			cache: false,
    			Accept: 'application/json',
    			contentType:"application/json; charset=utf-8",
    			dataType: 'json',
    			data: inputValues,
    			success: function(response) {
    				//what we will do on success case?
    				hideErrorMessagesForValidation();
    				isFormSubmitted = true;
    			},
    			error: function(response) { 
    				//what we will do on error case?
    				isFormSubmitted = false;
    			}
    		});
    	}
    	return isFormSubmitted;
//    	return true;
    }
    
    function changeFormLayout(changeFormLayout) {
		//create the appropriate form layout
    	if(changeFormLayout === "Единечно одобрување и преправки") {
    		//add the needed fields and remove the ones that do not need
    	}
    	
    	if(changeFormLayout === "ПТЕУ") {
    		$(".input-type-vehicle-wrapper").show();
    	}
	}
    
    /*=========THIRD FORM VALIDATION=======*/
    
    //form validation
    function validate_third_step_form(checkSubjectName) {
    	if(checkSubjectName === "Единечно одобрување и преправки") {
    		//we have to validate 
    	}
    }
});
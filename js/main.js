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
        $('.btn-circle.btn-info').removeClass('btn-info').addClass('btn-default');
        $(this).addClass('btn-info').removeClass('btn-default').blur();
    });

    //this is the behaviour when click on next or back buttons
    $(document).on('click', '.next-step, .prev-step', function (e) {
        var activeTab = $('.tab-pane.active');
        
        // If this returns true we know that we are validating individual_person_form
        var embgFieldExist =  $('#embg-legal-entity').is(":visible"); 
        
        //if activeTab is div#menu2 we call a fucntion for sending a request to the backend with validation 
        //for ex. activeTab = <div id="menu2" class="tab-pane fade active in">
        if(activeTab[0].id === "menu2" && $(e.target).hasClass('next-step')) {
        	//validate the form and send a request
        	if(!validate_second_step_form(embgFieldExist)) {
        		//if validation not pass or the response is with error we do not go to the third step(cirlce)
        		return;
        	};
        }

        $('.btn-circle.btn-info').removeClass('btn-info').addClass('btn-default');

        if ($(e.target).hasClass('next-step')) {
            var nextTab = activeTab.next('.tab-pane').attr('id');
            $('[href="#' + nextTab + '"]').addClass('btn-info').removeClass('btn-default');
            $('[href="#' + nextTab + '"]').tab('show');
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

    //show menu on hover for every subject
    $('.main-subject-tab').hover(function () {
    	//stop() method we used to stop an animation or effect before it is finished
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
    }, function () {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
    });
    
    //form validation
    function validate_second_step_form(embgFieldExist) {
    	var isFormSubmitted = true;
    	var inputValues = {}; //empty object
    	
    	if(embgFieldExist) {
    		//validate fields for the first form
	    	var name = $("#input-name").val();
	    	var surname = $("#input-surname").val();
	    	inputValues = {'name': name, 'surname' : surname};
	    	
	    	if(name === "" || surname === "") {
	    		//here we can put some error message or make frame form red
//	    		$("#error-message").text("Ве молиме да ги пополните сите полиња");
	    		isFormSubmitted = false;
	    	}
    	} else {
    		//validate fields for the second form
    		var name = $("#input-name").val();
	    	var surname = $("#input-surname").val();
	    	inputValues = {'name': name, 'surname' : surname};
	    	
	    	if(name === "" || surname === "") {
	    		//here we can put some error message or make frame form red
//	    		$("#error-message").text("Ве молиме да ги пополните сите полиња");
	    		isFormSubmitted = false;
	    	}
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
    				isFormSubmitted = true;
    			},
    			error: function(response) { 
    				//what we will do on error case?
    				isFormSubmitted = false;
    			}
    		});
    	}
    	return isFormSubmitted;
    }
	
});
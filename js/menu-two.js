//## MENU TWO


$(document).ready(function () {
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
	    }
	});
	

	//second circle handle modal inputs to automaticaly fill form inputs for name surname
	$('#agent-podnositel-modal-button').click(function () {
	    //set the values from the modal to the input fields
	    var name = $('#input-name-modal-agent-podnositel').val();
	    var surname = $('#input-surname-modal-agent-podnositel').val();
	    var fullName = name + "  " + surname;
	    $('#input-name-of-agent').val(fullName);//set the agent name field

	    $('#input-name').val(name);
	    $('#input-surname').val(surname);
	    $('#input-embg').val($('#input-embg-modal-agent-podnositel').val());
	});
});

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

//regex for email validation
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

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
//## MENU THREE

$(document).ready(function () {
	/*==========================FIRST VIEW=======*/

	//going from first view to fifth view by clicking the link
	$("#potvrda-tehnicki-karakteristiki").click(function (e) {
	    e.preventDefault();
	    //hide all elements for the first view and show the table from the fifth view.
	    $(".data-entry-vehicle").hide();
	    $(".data-entry-vehicle-header").hide();
	    $(".content-header-recording-of-contributions").hide();
	    $(".content-recording-of-contributions-first-view").hide();
	    $(".confirmation-of-the-technical-characteristics-wrapper").show(); //show the table
	    $("a.sidebar-toggle").trigger("click"); // we trigger a click on the sidebar button in order to get all space for the table
	    $('#proccess-container').removeClass("container").addClass("container-fluid"); //get more space with fluid class
	    $("p#subject-type").text('Потврда за технички карактеристики');

	    //take all field values that we need for the fifth box view table
	    var name = $('#input-name').val();
	    var surname = $('#input-surname').val();
	    var inputChassisNumber = $("#input-chassis-number").val();
	    var tipNaVozilo = $("#input-type").val();
	    var markaNaVozilo = $('#description-podatoci-vozilo-modal').val();
	    

	    $('#broj-na-sasija-tabela-potvrda-tehnicki-karakteristiki').html(inputChassisNumber);
	    $("#vrednost-za-ime-tehnicki-karakteristiki").html(name);
	    $("#vrednost-za-prezime-tehnicki-karakteristiki").html(surname);
	    $("#tip-na-vozilo-tabela-potvrda-tehnicki-karakteristiki").html(tipNaVozilo);
	    $("#marka-na-vozilo-tabela-potvrda-tehnicki-karakteristiki").html(markaNaVozilo);

	    //broj na predmet se krie i se pojavuva broj na predmet od edinecno odobrenie - skrij edna kolona i pojavi druga kolona(po default skriena so css)
	    $('.br-na-predmet-tehnicki-karakteristiki').hide();
	    $('.br-na-predmet-edinecno-tehnicki-karakteristiki').show();
	});
	
	/*==========================FIFTH VIEW=======*/

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
	
	//make custom columns to be editable
	$('#table-potvrda-za-tehnicki-karakteristiki').editableTableWidget({ editor: $('<input>'), preventColumns: [1, 10, 11, 14, 15, 16] });


	//only one row can be checked from the first table from the first box view
	$('.grupa1-tabela-vid-na-prepravka-checkbox').on('change', function() {
	    $('.grupa1-tabela-vid-na-prepravka-checkbox').not(this).prop('checked', false);
	});

	$('.grupa2-tabela-vid-na-prepravka-checkbox').on('change', function() {
	    $('.grupa2-tabela-vid-na-prepravka-checkbox').not(this).prop('checked', false);
	});

	$('.grupa3-tabela-vid-na-prepravka-checkbox').on('change', function() {
	    $('.grupa3-tabela-vid-na-prepravka-checkbox').not(this).prop('checked', false);
	});

	$('.grupa4-tabela-vid-na-prepravka-checkbox').on('change', function() {
	    $('.grupa4-tabela-vid-na-prepravka-checkbox').not(this).prop('checked', false);
	});

	//only one checkbox can be checked from the tachograph-data form from the seventh box view, menu 3
	$('.grupa1-vid-na-tahograf-checkbox').on('change', function() {
	    $('.grupa1-vid-na-tahograf-checkbox').not(this).prop('checked', false);
	});

	$('.grupa2-vid-na-inspekcija-checkbox').on('change', function() {
	    $('.grupa2-vid-na-inspekcija-checkbox').not(this).prop('checked', false);
	});

	$('.grupa3-samo-digitalni-tahografi-checkbox').on('change', function() {
	    $('.grupa3-samo-digitalni-tahografi-checkbox').not(this).prop('checked', false);
	});
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
    } else if (chosenView === "Калибрација на тахографи") {
        $(".content-header.content-header-tachograph-data").show();
        $(".content-tachograph-data-seven-view").show();
        $(".box-primary-seven-view-wrapper").show();
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

function clearThirdCircleForm() {
	$("#input-manufacturer-of-vehicle").val('');
    $("#input-mark-vehicle").val('');
    $("#input-type").val('');
    $("#input-chassis-number").val('');
    $("#input-input-type-of-engine").val('');
    $("#input-number-of-engine").val('');
    $("#input-vehicle-category").val('');
    $("#input-number-of-adr-certificate").val('');
    $("#input-type-vehicle").val('');
    $("#input-mileage").val('');
    $("#input-examination-for-class").val('');
    $("#input-registration-mark-of-the-vehicle").val('');
//    $("#input-type-of-vehicle-shipping-requiring-confirmation").val('');
//    $("#input-class-of-the-vehicle").val('');
    $("#input-model-of-the-vehicle").val('');
    $("#input-number-of-seats-according-to-vehicle-license").val('');
    $("#input-registration-number-of-the-vehicle").val('');
    $("#input-year-of-first-registration").val('');
    $("#input-year-of-production").val('');
    $("#checkbox-vozilo-na-uvid").prop('checked', false);
    $("#checkbox-vozilo-na-lice-mesto").prop('checked', false);
    $("#input-other-documentation").val('');
    $("#input-number-approval-for-embossing").val('');
    $("#input-number-orders").val('');
    $("#input-number-individual-approval").val('');
    $("#datepicker").val('');
    $('#datepicker-approval-for-embossing').datepicker('setDate', null);
    $("#datepicker-orders-of-authority").datepicker('setDate', null);
    $("#datepicker-individual-approval").datepicker('setDate', null);
    clearAllTablesFromFirstView();
}

//Clear na 4-te tabeli Odberi Prepravka od prvoto view, menu 3
function clearAllTablesFromFirstView(){
	$('.grupa1-tabela-vid-na-prepravka-checkbox').prop("checked", false);
	$('.grupa2-tabela-vid-na-prepravka-checkbox').prop("checked", false);
	$('.grupa3-tabela-vid-na-prepravka-checkbox').prop("checked", false);
	$('.grupa4-tabela-vid-na-prepravka-checkbox').prop("checked", false);
}

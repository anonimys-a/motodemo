
    // Komercijalna Oznaka Promise
    var SaveKomercijalnaOznaka = function () {
        var ModKomOznaka = {
            vidVozilo: $('#modal-vid-vozilo').val(),
            komMarka: $('#modal-marka').val(),
            komOznaka: $('#modal-kom-oznaka').val(),
            tipVozilo: $('#modal-tip-vozilo').val(),
            varijanta: $('#modal-varijanta').val(),
            izvedba: $('#modal-izvedba').val(),
            forma: $('#modal-forma').val(),
            namena: $('#modal-namena').val()
        }

        return $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Home/NovaKomOznaka',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(ModKomOznaka)
        });
    }

// Novo Vozilo Promise
var SaveNovoVozilo = function () {
    var vozilo = {
        VoziloSasija: $('#vin').val(),
        VoziloGodinaProizvodstvo: $('#year').val(),
        VoziloSnaga: $('#engine-power').val(),
        VoziloMasa: $('#vehicle-mass').val(),
        ECEID: $('#category').val(),
        BrojNaOski: $('#axles').val(),
        MestaSedenje: $('#seats-number').val(),
        MestaStoenje: $('#mesta-stoenje').val(),
        MestaLezenje: $('#mesta-lezenje').val(),

    }

    return $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/Home/NovoVozilo',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(vozilo)
    });
}

var optionAnimateSearchStart = {
    'opacity': .2,
    'backgroundColor': '#00c0ef',
    'color': '#f0ffff'
};

var optionAnimateSearchEnd = {
    'backgroundColor': '#fff',
    'color': '#555',
    'opacity': 1
};

function clearTipVoziloInputs() {
    $("#kom-oz-mod :input").each(function () {
        $(this).val('');
    });
}

function clearTipMotorInputs() {
    $("#mod-tip-motor :input").each(function () {
        $(this).val('');
    });
}

function SearchResponse (kom) {
    $('#input-name').animate(optionAnimateSearchStart, 200).val(kom.KomintentIme).animate(optionAnimateSearchEnd, 200);
    $('#input-surname').animate(optionAnimateSearchStart, 200).val(kom.KomintentPrezime).animate(optionAnimateSearchEnd, 200);
    $('#input-embg').animate(optionAnimateSearchStart, 200).val(kom.KomintentEmb).animate(optionAnimateSearchEnd, 200);
    $('#input-address').animate(optionAnimateSearchStart, 200).val(kom.KomintentAdresa).animate(optionAnimateSearchEnd, 200);
    $('#input-municipality-of-residence').animate(optionAnimateSearchStart, 200).val(kom.OpstinaId).animate(optionAnimateSearchEnd, 200);
    $('#input-place-of-residence').animate(optionAnimateSearchStart, 200).val(kom.MestoId).animate(optionAnimateSearchEnd, 200);
    $('#input-country-of-residence').animate(optionAnimateSearchStart, 200).val(kom.KomintentEmb).animate(optionAnimateSearchEnd, 200);
    $('#input-number').animate(optionAnimateSearchStart, 200).val(kom.KomintentEmb).animate(optionAnimateSearchEnd, 200);
    $('#input-contact-person').animate(optionAnimateSearchStart, 200).val(kom.KomintentEmb).animate(optionAnimateSearchEnd, 200);
    $('#input-fax').animate(optionAnimateSearchStart, 200).val(kom.KomintentFaks).animate(optionAnimateSearchEnd, 200);
    $('#input-email').animate(optionAnimateSearchStart, 200).val(kom.KomintentEmb).animate(optionAnimateSearchEnd, 200);
    $('#input-name-of-agent').animate(optionAnimateSearchStart, 200).val(kom.KomintentEmb).animate(optionAnimateSearchEnd, 200);
}




function SearchMessage() {
    var messageFailedTest;
    $('#searchBox input').each(function () {
        var searchBoxInput = $(this);
        if (searchBoxInput.is(':focus')) {
            messageFailedTest = searchBoxInput.attr('data-amerit-message');
            return false;
        }
        // return messageFailedTest;
    });
    return messageFailedTest;
}

function SearchFailed() {
    var messageTest = SearchMessage();


    $('#alertSuccess').fadeIn(500, function () {
        $(this).removeClass('hide').addClass('alert-danger');
        $('#spanIconDanger').removeClass('hide');
        $('#spanMessage').text(messageTest);
    }).fadeOut(4000, function () {
        $('#spanIconDanger').addClass('hide');
        $(this).addClass('hide').removeClass('alert-danger');
    });
}

function SasijaSearch() {
    var sasija = $('#sasijaSearch').val();
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/Home/SelectKomintent',
        contentType: 'application/json; charset=UTF-8',
        data: { ime: sasija }
    })
    .done(function (kom) {
        SearchResponse(kom);
    })
    .fail(
         function () {
             SearchFailed();
         }
    );
}

function RegistracijaSearch() {
    var registracija = $('#registracijaSearch').val();

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/Home/SelectKomintent',
        contentType: 'application/json; charset=UTF-8',
        data: { ime: registracija }
    })
    .done(
    function (kom) {
        SearchResponse(kom);
    })
    .fail(
         function () {
             SearchFailed();
         }
    );
}

// TABELA

// Naod naslov
function ShowHeading() {
    var naslov = $('#naodi option:selected').text();
    $('.naod-header').text(naslov);
}

// Show naod CRST
function ShowNaodCRST() {
    var hideCRST = $('.naod-NMO-body, .naod-L-body, .naod-ML-body, .naod-SV-body');
    hideCRST.hide();
    $('.naod-CRST-body').show();
}

// Show Naod L
function ShowNaodL() {
    var hideL = $('.naod-NMO-body, .naod-CRST-body, .naod-ML-bodyL, .naod-SV-body');
    hideL.hide();
    $('.naod-L-body').show();
}

// Show Naod NMO
function ShowNaodNMO() {
    var hideNMO = $('.naod-L-body, .naod-CRST-body, .naod-ML-body, .naod-SV-body');
    hideNMO.hide();
    $('.naod-NMO-body').show();
}

function ShowNaodML() {
    ShowHeading();
    var hideML = $('.naod-NMO-body, .naod-CRST-body, .naod-L-body, .naod-SV-body');
    hideML.hide();
    $('.naod-ML-body').show();
}
function SelectSpecVozila() {
    ShowHeading();
    var hideSV = $('.naod-NMO-body, .naod-CRST-body, .naod-L-body, .naod-ML-body');
    hideSV.hide();
    $('.naod-SV-body').show();
}

// Select Naod C1
function SelectCEden() {
    ShowHeading();
    ShowNaodCRST();

    var cEdenShow = $('#tcb408, #tcb416, #tcb417, #tcb401-4, #tcb403, #tcb403, #tcb416, #tcb119, #tcb401-3, #tcb401-5, #tcb401-6, #tcb402-t1, #tcb402-t2, #tcb404, #tcb405, #tcb406, #tcb409, #tcb409, #tcb410, #tcb411, #tcb412, #tcb415, #tcb418, #tcb420, #tcb422-21, #tcb422-22, #tcb422-3, #tcb423');

    var cEdenHide = $('#tcb419, #tcb421, #tcbpnevmatici, #tcb-134, #tcbzastita, #tcb-142, #tcbptnp, #tcbfarovi, #tcbfarovi, #tcbsilina, #tcbstabilnost, #tcb131, #tcb117, #tcb147');

    cEdenShow.show();
    cEdenHide.hide();
    //$('#tcb419').hide();
    //$('#tcb421').hide();
    //$('#tcbpnevmatici').hide();
    //$('#tcb-134').hide();
    //$('#tcbzastita').hide();
    //$('#tcb-142').hide();
    //$('#tcbptnp').hide();
    //$('#tcb408').show();
    //$('#tcb416').show();
    //$('#tcb417').show();
    //$('#tcb401-4').show();
    //$('#tcb403').show();
    //$('#tcb416').show();
    //$('#tcb119').show();
    //$('#tcb401-3').show();
    //$('#tcb401-5').show();
    //$('#tcb401-6').show();
    //$('#tcb402-t1').show();
    //$('#tcb402-t2').show();
    //$('#tcb404').show();
    //$('#tcb405').show();
    //$('#tcb406').show();
    //$('#tcb409').show();
    //$('#tcb410').show();
    //$('#tcb411').show();
    //$('#tcb412').show();
    //$('#tcb415').show();
    //$('#tcb418').show();
    //$('#tcb420').show();
    //$('#tcb422-21').show();
    //$('#tcb422-22').show();
    //$('#tcb422-3').show();
    //$('#tcb423').show();
    //$('#tcbfarovi').hide();
    //$('#tcbsilina').hide();
    //$('#tcbstabilnost').hide();
    //$('#tcb131').hide();
    //$('#tcb117').hide();
    //$('#tcb147').hide();
}


// Select Naod C2

function SelectCDva() {
    ShowHeading();
    ShowNaodCRST();

    var cDvaShow = $('#tcb401-4, #tcb403, #tcb419, #tcb421, #tcb119, #tcb401-3, #tcb401-5, #tcb401-6, #tcb402-t1, #tcb402-t2, #tcb404, #tcb405, #tcb406, #tcb409, #tcb410, #tcb411, #tcb412, #tcb415, #tcb418, #tcb420, #tcb422-21, #tcb422-22, #tcb422-3, #tcb423');

    var cDvaHide = $('#tcb408, #tcb416, #tcb417, #tcbpnevmatici, #tcb-134, #tcbzastita, #tcb-142, #tcbptnp, #tcbfarovi, #tcbsilina, #tcbstabilnost, #tcb131, #tcb117, #tcb147');

    cDvaShow.show();
    cDvaHide.hide();

    // $('#tcb401-4').show();
    // $('#tcb403').show();
    // $('#tcb419').show();
    // $('#tcb421').show();
    // $('#tcb119').show();
    // $('#tcb408').hide();
    // $('#tcb416').hide();
    // $('#tcb417').hide();
    // $('#tcbpnevmatici').hide();
    // $('#tcb-134').hide();
    // $('#tcbzastita').hide();
    // $('#tcb-142').hide();
    //  $('#tcbptnp').hide();
    // $('#tcbfarovi').hide();
    // $('#tcbsilina').hide();
    // $('#tcbstabilnost').hide();
    // $('#tcb131').hide();
    // $('#tcb117').hide();
    // $('#tcb147').hide();//
    // $('#tcb401-3').show();
    // $('#tcb401-5').show();
    // $('#tcb401-6').show();
    // $('#tcb402-t1').show();
    // $('#tcb402-t2').show();
    // $('#tcb404').show();
    // $('#tcb405').show();
    // $('#tcb406').show();
    // $('#tcb409').show();
    // $('#tcb410').show();
    // $('#tcb411').show();
    // $('#tcb412').show();
    // $('#tcb415').show();
    // $('#tcb418').show();
    // $('#tcb420').show();
    // $('#tcb422-21').show();
    // $('#tcb422-22').show();
    // $('#tcb422-3').show();
    // $('#tcb423').show();
}



// Select Naod C3
function SelectCTri() {
    ShowHeading();
    ShowNaodCRST();

    var cTriShow = $('#tcb417, #tcb421, #tcb119, #tcb401-3, #tcb401-5, #tcb401-6, #tcb402-t1, #tcb402-t2, #tcb404, #tcb405, #tcb406, #tcb408, #tcb409, #tcb410, #tcb411, #tcb412, #tcb415, #tcb418, #tcb420, #tcb422-21, #tcb422-22, #tcb422-3, #tcb423');

    var cTriHide = $('#tcb401-4, #tcb403, #tcb416, #tcb419, #tcb131, #tcb117, #tcb-134, #tcb-142, #tcb147, #tcbpnevmatici, #tcbzastita, #tcbptnp, #tcbfarovi, #tcbsilina, #tcbstabilnost');

    cTriShow.show();
    cTriHide.hide();

    // $('#tcb401-4').hide();
    // $('#tcb403').hide();
    //  $('#tcb416').hide();
    // $('#tcb417').show();
    // $('#tcb421').show();
    // $('#tcb419').hide();
    // $('#tcb119').show();
    // $('#tcbpnevmatici').hide();
    //  $('#tcb-134').hide();
    //  $('#tcbzastita').hide();
    // $('#tcb-142').hide();
    // $('#tcbptnp').hide();
    // $('#tcb401-3').show();
    // $('#tcb401-5').show();
    // $('#tcb401-6').show();
    // $('#tcb402-t1').show();
    // $('#tcb402-t2').show();
    // $('#tcb404').show();
    // $('#tcb405').show();
    // $('#tcb406').show();
    // $('#tcb408').show();
    // $('#tcb409').show();
    // $('#tcb410').show();
    // $('#tcb411').show();
    // $('#tcb412').show();
    // $('#tcb415').show();
    // $('#tcb418').show();
    // $('#tcb420').show();
    // $('#tcb422-21').show();
    // $('#tcb422-22').show();
    // $('#tcb422-3').show();
    // $('#tcb423').show();
    //  $('#tcbfarovi').hide();
    // $('#tcbsilina').hide();
    //  $('#tcbstabilnost').hide();
    //  $('#tcb131').hide();
    //  $('#tcb117').hide();
    //  $('#tcb147').hide();
}



// Select Naod C4
function SelectCCetiri() {
    ShowHeading();
    ShowNaodCRST();

    var cCetiriShow = $('#tcb408, #tcb416, #tcb417, #tcb401-4, #tcb403, #tcb401-3, #tcb401-5, #tcb401-6, #tcb402-t1, #tcb402-t2, #tcb404, #tcb405, #tcb406, #tcb409, #tcb410, #tcb411, #tcb412, #tcb415, #tcb418, #tcb420, #tcb422-21, #tcb422-22, #tcb422-3, #tcb423');

    var cCetiriHide = $('#tcb419, #tcb421, #tcb119, #tcbpnevmatici, #tcb-134, #tcbzastita, #tcb-142, #tcbptnp, #tcbfarovi, #tcbsilina, #tcbstabilnost, #tcb131, #tcb117, #tcb147');

    cCetiriShow.show();

    cCetiriHide.hide();

    // $('#tcb419').hide();
    // $('#tcb421').hide();
    //$('#tcb408').show();
    //$('#tcb416').show();
    // $('#tcb417').show();
    // $('#tcb401-4').show();
    // $('#tcb403').show();
    // $('#tcb119').hide();
    // $('#tcbpnevmatici').hide();
    // $('#tcb-134').hide();
    // $('#tcbzastita').hide();
    // $('#tcb-142').hide();
    // $('#tcbptnp').hide();
    //  $('#tcb401-3').show();
    //  $('#tcb401-5').show();
    //  $('#tcb401-6').show();
    //  $('#tcb402-t1').show();
    //  $('#tcb402-t2').show();
    //  $('#tcb404').show();
    //  $('#tcb405').show();
    //  $('#tcb406').show();
    //  $('#tcb409').show();
    //  $('#tcb410').show();
    //  $('#tcb411').show();
    //  $('#tcb412').show();
    //  $('#tcb415').show();
    //  $('#tcb418').show();
    //  $('#tcb420').show();
    //  $('#tcb422-21').show();
    //  $('#tcb422-22').show();
    //  $('#tcb422-3').show();
    //  $('#tcb423').show();
    //  $('#tcbfarovi').hide();
    //  $('#tcbsilina').hide();
    //  $('#tcbstabilnost').hide();
    //  $('#tcb131').hide();
    //  $('#tcb117').hide();
    //  $('#tcb147').hide();
}



// Select Naod R1, R2, R3, R4
function SelectR() {
    ShowHeading();
    ShowNaodCRST();

    var rShow = $('#tcbpnevmatici, #tcb-134, #tcbzastita, #tcb-142, #tcbptn');
    var rHide = $('#tcb401-3, #tcb401-4, #tcb401-5, #tcb401-6, #tcb402-t1, #tcb402-t2, #tcb403, #tcb404, #tcb405, #tcb406, #tcb408, #tcb409, #tcb410, #tcb411, #tcb412, #tcb415, #tcb416, #tcb417, #tcb418, #tcb420, #tcb422-21, #tcb422-22, #tcb422-3, #tcb423, #tcb119, #tcbptnp, #tcbfarovi, #tcbsilina, #tcbstabilnost, #tcb131, #tcb117, #tcb147, #tcb157');

    rShow.show();
    rHide.hide();

    // $('#tcb401-3').hide();
    // $('#tcb401-4').hide();
    // $('#tcb401-5').hide();
    // $('#tcb401-6').hide();
    // $('#tcb402-t1').hide();
    // $('#tcb402-t2').hide();
    // $('#tcb403').hide();
    // $('#tcb404').hide();
    // $('#tcb405').hide();
    // $('#tcb406').hide();
    // $('#tcb408').hide();
    // $('#tcb409').hide();
    // $('#tcb410').hide();
    // $('#tcb411').hide();
    // $('#tcb412').hide();
    // $('#tcb415').hide();
    // $('#tcb416').hide();
    // $('#tcb417').hide();
    // $('#tcb418').hide();
    // $('#tcb420').hide();
    // $('#tcb422-21').hide();
    // $('#tcb422-22').hide();
    // $('#tcb422-3').hide();
    // $('#tcb423').hide();
    // $('#tcb119').hide();
    // $('#tcbpnevmatici').show();
    // $('#tcb-134').show();
    // $('#tcbzastita').show();
    // $('#tcb-142').show();
    // $('#tcbptnp').show();
    // $('#tcbfarovi').hide();
    // $('#tcbsilina').hide();
    // $('#tcbstabilnost').hide();
    // $('#tcb131').hide();
    // $('#tcb117').hide();
    // $('#tcb147').hide();
    // $('#tcb157').hide();
}



// Select Naod S1,S2
function SelectS() {
    ShowHeading();
    ShowNaodCRST();

    var sShow = $('#tcbpnevmatici, #tcbptnp, #tcb422-21, #tcb422-22, #tcb422-3');
    var sHide = $('#tcb419, #tcb421, #tcb-134, #tcbzastita, #tcb-142, #tcb408, #tcb416, #tcb417, #tcb401-4, #tcb403, #tcb416, #tcb119, #tcb401-3, #tcb401-5, #tcb401-6, #tcb402-t1, #tcb402-t2, #tcb404, #tcb405, #tcb406, #tcb409, #tcb410, #tcb411, #tcb412, #tcb415, #tcb418, #tcb420, #tcb423, #tcbfarovi, #tcbsilina, #tcbstabilnost, #tcb131, #tcb117, #tcb147, #tcb157');

    sShow.show();
    sHide.hide();

    // $('#tcb419').hide();
    // $('#tcb421').hide();
    //  $('#tcbpnevmatici').show();
    //  $('#tcb-134').hide();
    //  $('#tcbzastita').hide();
    //  $('#tcb-142').hide();
    //  $('#tcbptnp').show();
    //  $('#tcb408').hide();
    //  $('#tcb416').hide();
    //  $('#tcb417').hide();
    //  $('#tcb401-4').hide();
    //  $('#tcb403').hide();
    //  $('#tcb416').hide();
    //  $('#tcb119').hide();
    //  $('#tcb401-3').hide();
    //  $('#tcb401-5').hide();
    //  $('#tcb401-6').hide();
    //  $('#tcb402-t1').hide();
    //  $('#tcb402-t2').hide();
    //  $('#tcb404').hide();
    //  $('#tcb405').hide();
    //  $('#tcb406').hide();
    //  $('#tcb409').hide();
    //  $('#tcb410').hide();
    //  $('#tcb411').hide();
    //  $('#tcb412').hide();
    //  $('#tcb415').hide();
    //  $('#tcb418').hide();
    //  $('#tcb420').hide();
    //  $('#tcb422-21').show();
    //  $('#tcb422-22').show();
    //  $('#tcb422-3').show();
    //  $('#tcb423').hide();
    //  $('#tcbfarovi').hide();
    //  $('#tcbsilina').hide();
    //  $('#tcbstabilnost').hide();
    //  $('#tcb131').hide();
    //  $('#tcb117').hide();
    //  $('#tcb147').hide();

    //  $('#tcb157').hide();
}



// Select Naod T1
function SelectTEden() {
    ShowHeading();
    ShowNaodCRST();
    SelectCEden();

    var tEdenShow = $('#tcbpnevmatici, #tcbptnp, #tcbfarovi, #tcbsilina');
    tEdenShow.show();

    // $('#tcbpnevmatici').show();
    // $('#tcbptnp').show();
    // $('#tcbfarovi').show();
    // $('#tcbsilina').show();
}



// Select Naod T2
function SelectTDva() {
    ShowHeading();
    ShowNaodCRST();
    SelectCDva();

    var tDvaShow = $('#tcbpnevmatici, #tcbptnp, #tcbfarovi, #tcbsilina');
    tDvaShow.show();

    $('#tcb410').hide();
    //  $('#tcbpnevmatici').show();
    //  $('#tcbptnp').show();
    //  $('#tcbfarovi').show();
    //  $('#tcbsilina').show();
}



// Select Naod T3
function SelectTTri() {
    ShowHeading();
    ShowNaodCRST();
    SelectCTri();

    var tTriShow = $('#tcbpnevmatici, #tcbptnp, #tcbfarovi, #tcbsilina');
    tTriShow.show();

    $('#tcb410').hide();
    // $('#tcbpnevmatici').show();
    // $('#tcbptnp').show();
    // $('#tcbfarovi').show();
    // $('#tcbsilina').show();
}



// Select Naod T4
function SelectTCetiri() {
    ShowHeading();
    ShowNaodCRST();
    SelectCCetiri();

    var tCetiriShow = $('#tcbpnevmatici, #tcbptnp, #tcbfarovi, #tcbsilina');
    tCetiriShow.show();

    // $('#tcbpnevmatici').show();
    // $('#tcbptnp').show();
    // $('#tcbfarovi').show();
    // $('#tcbsilina').show();
}



// Select Naod T5
function SelectTPet() {
    ShowHeading();
    ShowNaodCRST();
    SelectCEden();

    $('#tcbpnevmatici').show();
    $('#tcbptnp').show();
    $('#tcbfarovi').show();
    $('#tcbsilina').show();
    $('#tcb419').show();
    $('#tcb421').show();
    $('#tcb-134').show();
    $('#tcb-142').show();
    $('#tcbstabilnost').show();
    $('#tcb131').show();
    $('#tcb117').show();
    $('#tcb147').show();
}


// Select Naod N1
function SelectNEden() {
    ShowHeading();
    ShowNaodNMO();

    $('#tcb106').show();
    $('#tcb114').show();
    $('#tcb139').show();
    $('#tcb148').show();
    $('#tcb149').show();
    $('#tcb154').show();
    $('#tcb156').show();
    $('#tcb158').show();
    $('#tcb159').show();
    $('#tcb160').show();
    $('#tcb161').show();
    $('#tcbreppnev').show();
    $('#tcbrepmot').hide();

    $('#tcb112').hide();
    $('#tcb116').hide();
    $('#tcb132').hide();
    $('#tcb134').hide();
    $('#tcb135').hide();
    $('#tcb138').hide();
    $('#tcb142').hide();
    $('#tcb143').hide();
    $('#tcb144').hide();
    $('#tcb147bt').hide();
    $('#tcb151').hide();
    $('#tcb152').hide();
    $('#tcb153').hide();
    $('#tcb152p').hide();
    $('#tcb157').hide();
    $('#tcbkusspoj').hide();
    $('#tcbrefoznaki').hide();
    $('#tcbvozper').show();
    $('#tcbstabcisterni').hide();
    $('#tcbprisistemi').show();

    $('#tcb101').show();
    $('#tcb102').show();
    $('#tcb107').show();
    $('#tcb108').show();
    $('#tcb111').show();
    $('#tcb113').show();
    $('#tcb115').show();
    $('#tcb117bt').show();
    $('#tcb119bt').show();
    $('#tcb125').show();
    $('#tcb126').show();
    $('#tcb127').show();
    $('#tcb130').show();
    $('#tcb131bt').show();
    $('#tcb133').show();
    $('#tcb140').show();
    $('#tcb141').show();

    $('#tcbspsvetla').show();
    $('#tcbnafgas').show();
    $('#tcbzemgas').show();
    $('#tcbtngkzg').show();
    $('#tcbsvvrtenje').show();
    $('#tcbbris').show();
}



// Select Naod N23
function SelectNDva() {
    ShowHeading();
    ShowNaodNMO();

    $('#tcb112').hide();
    $('#tcb114').hide();
    $('#tcb116').hide();
    $('#tcb132').hide();
    $('#tcb134').hide();
    $('#tcb135').hide();
    $('#tcb138').hide();
    $('#tcb139').hide();
    $('#tcb144').hide();
    $('#tcb151').hide();
    $('#tcb152').hide();
    $('#tcb153').hide();
    $('#tcb152p').hide();
    $('#tcb154').hide();
    $('#tcb158').hide();
    $('#tcb159').hide();
    $('#tcb160').hide();
    $('#tcb161').hide();
    $('#tcbrepmot').hide();
    $('#tcbprisistemi').hide();
    $('#tcb106').show();
    $('#tcb142').show();
    $('#tcb143').show();
    $('#tcb147bt').show();
    $('#tcb148').show();
    $('#tcb149').show();
    $('#tcb156').show();
    $('#tcb157').show();
    $('#tcbkusspoj').show();
    $('#tcbreppnev').show();
    $('#tcbrefoznaki').show();
    $('#tcbstabcisterni').show();
    $('#tcbprisistemi').hide();
    $('#tcbvozper').hide();

    $('#tcb101').show();
    $('#tcb102').show();
    $('#tcb107').show();
    $('#tcb108').show();
    $('#tcb111').show();
    $('#tcb113').show();
    $('#tcb115').show();
    $('#tcb117bt').show();
    $('#tcb119bt').show();
    $('#tcb125').show();
    $('#tcb126').show();
    $('#tcb127').show();
    $('#tcb130').show();
    $('#tcb131bt').show();
    $('#tcb133').show();
    $('#tcb140').show();
    $('#tcb141').show();


    $('#tcbspsvetla').show();
    $('#tcbnafgas').show();
    $('#tcbzemgas').show();
    $('#tcbtngkzg').show();
    $('#tcbsvvrtenje').show();
    $('#tcbbris').show();
}



// Select Naod M1
function SelectMEden() {
    ShowHeading();
    ShowNaodNMO();

    $('#tcb106').show();
    $('#tcb112').show();
    $('#tcb114').show();
    $('#tcb116').show();
    $('#tcb132').show();
    $('#tcb134').show();
    $('#tcb135').show();
    $('#tcb138').show();
    $('#tcb139').show();
    $('#tcb144').show();
    $('#tcb154').show();
    $('#tcb158').show();
    $('#tcb159').show();
    $('#tcb160').show();
    $('#tcb161').show();
    $('#tcbvozper').show();
    $('#tcbreppnev').show();
    $('#tcbprisistemi').show();

    $('#tcb142').hide();
    $('#tcb143').hide();
    $('#tcb147bt').hide();
    $('#tcb148').hide();
    $('#tcb149').hide();
    $('#tcb151').hide();
    $('#tcb152').hide();
    $('#tcb153').hide();
    $('#tcb152p').hide();
    $('#tcb156').hide();
    $('#tcb157').hide();
    $('#tcbkusspoj').hide();
    $('#tcbrefoznaki').hide();
    $('#tcbstabcisterni').hide();
    $('#tcbrepmot').hide();

    $('#tcbspsvetla').show();
    $('#tcbnafgas').show();
    $('#tcbzemgas').show();
    $('#tcbtngkzg').show();
    $('#tcbsvvrtenje').show();
    $('#tcbbris').show();

    $('#tcb101').show();
    $('#tcb102').show();
    $('#tcb107').show();
    $('#tcb108').show();
    $('#tcb111').show();
    $('#tcb113').show();
    $('#tcb115').show();
    $('#tcb117bt').show();
    $('#tcb119bt').show();
    $('#tcb125').show();
    $('#tcb126').show();
    $('#tcb127').show();
    $('#tcb130').show();
    $('#tcb131bt').show();
    $('#tcb133').show();
    $('#tcb140').show();
    $('#tcb141').show();
}



// Select Naod M2
function SelectMDva() {
    ShowHeading();
    ShowNaodNMO();

    $('#tcb106').hide();
    $('#tcb112').hide();
    $('#tcb114').hide();
    $('#tcb116').hide();
    $('#tcb132').hide();
    $('#tcb134').hide();
    $('#tcb135').hide();
    $('#tcb138').hide();
    $('#tcb139').hide();
    $('#tcb142').hide();
    $('#tcb143').hide();
    $('#tcb144').hide();
    $('#tcb147bt').hide();
    $('#tcb149').hide();
    $('#tcb154').hide()
    $('#tcb151').hide();
    $('#tcb156').hide();
    $('#tcb157').hide();
    $('#tcb158').hide();
    $('#tcb159').hide();
    $('#tcb160').hide();
    $('#tcb161').hide();
    $('#tcbprisistemi').hide();
    $('#tcbvozper').hide();
    $('#tcbreppnev').hide();
    $('#tcbkusspoj').hide();
    $('#tcbrefoznaki').hide();
    $('#tcbstabcisterni').hide();
    $('#tcbrepmot').hide();

    $('#tcbspsvetla').show();
    $('#tcbnafgas').show();
    $('#tcbzemgas').show();
    $('#tcbtngkzg').show();
    $('#tcbsvvrtenje').show();
    $('#tcbbris').show();

    $('#tcb119bt').show();
    $('#tcb148').show();
    $('#tcb152').show();
    $('#tcb153').show();
    $('#tcb152p').show();

    $('#tcb101').show();
    $('#tcb102').show();
    $('#tcb107').show();
    $('#tcb108').show();
    $('#tcb111').show();
    $('#tcb113').show();
    $('#tcb115').show();
    $('#tcb117bt').show();
    $('#tcb125').show();
    $('#tcb126').show();
    $('#tcb127').show();
    $('#tcb130').show();
    $('#tcb131bt').show();
    $('#tcb133').show();
    $('#tcb140').show();
    $('#tcb141').show();
}



// Select Naod M3
function SelectMTri() {
    ShowHeading();
    ShowNaodNMO();

    $('#tcb106').hide();
    $('#tcb112').hide();
    $('#tcb114').hide();
    $('#tcb116').hide();
    $('#tcb132').hide();
    $('#tcb134').hide();
    $('#tcb135').hide();
    $('#tcb138').hide();
    $('#tcb139').hide();
    $('#tcb142').hide();
    $('#tcb143').hide();
    $('#tcb144').hide();
    $('#tcb149').hide();
    $('#tcb153').hide();
    $('#tcb154').hide();
    $('#tcb156').hide();
    $('#tcb157').hide();
    $('#tcb158').hide();
    $('#tcb159').hide();
    $('#tcb160').hide();
    $('#tcb161').hide();
    $('#tcbprisistemi').hide();
    $('#tcbprisistemi').hide();
    $('#tcbvozper').hide();
    $('#tcbreppnev').hide();
    $('#tcbkusspoj').hide();
    $('#tcbrefoznaki').hide();
    $('#tcbstabcisterni').hide();
    $('#tcbrepmot').hide();

    $('#tcbspsvetla').show();
    $('#tcbnafgas').show();
    $('#tcbzemgas').show();
    $('#tcbtngkzg').show();
    $('#tcbsvvrtenje').show();
    $('#tcbbris').show();

    $('#tcb119bt').show();
    $('#tcb147bt').show();
    $('#tcb148').show();
    $('#tcb151').show();
    $('#tcb152').show();
    $('#tcb152p').show();

    $('#tcb101').show();
    $('#tcb102').show();
    $('#tcb107').show();
    $('#tcb108').show();
    $('#tcb111').show();
    $('#tcb113').show();
    $('#tcb115').show();
    $('#tcb117bt').show();
    $('#tcb125').show();
    $('#tcb126').show();
    $('#tcb127').show();
    $('#tcb130').show();
    $('#tcb131bt').show();
    $('#tcb133').show();
    $('#tcb140').show();
    $('#tcb141').show();
}



// Select Naod O1, O2
function SelectOEdenDva() {
    ShowHeading();
    ShowNaodNMO();

    $('#tcb112').hide();
    $('#tcb114').hide();
    $('#tcb116').hide();
    $('#tcb132').hide();
    $('#tcb134').hide();
    $('#tcb135').hide();
    $('#tcb138').hide();
    $('#tcb139').hide();
    $('#tcb144').hide();
    $('#tcb151').hide();
    $('#tcb152').hide();
    $('#tcb153').hide();
    $('#tcb152p').hide();
    $('#tcb154').hide();
    $('#tcb158').hide();
    $('#tcb159').hide();
    $('#tcb160').hide();
    $('#tcb161').hide();

    $('#tcb148').show();
    $('#tcb149').show();
    $('#tcb156').show();

    $('#tcbrepmot').show();
    $('#tcbkusspoj').hide();
    $('#tcbreppnev').show();
    $('#tcbrefoznaki').hide();
    $('#tcbstabcisterni').hide();
    $('#tcbprisistemi').hide();
    $('#tcbvozper').hide();
    $('#tcbspsvetla').hide();
    $('#tcbnafgas').hide();
    $('#tcbzemgas').hide();
    $('#tcbtngkzg').hide();
    $('#tcbsvvrtenje').hide();
    $('#tcbbris').hide();

    $('#tcb101').hide();
    $('#tcb102').hide();
    $('#tcb106').hide();
    $('#tcb107').hide();
    $('#tcb108').hide();
    $('#tcb111').hide();
    $('#tcb113').hide();
    $('#tcb115').hide();
    $('#tcb117bt').hide();
    $('#tcb119bt').hide();
    $('#tcb125').hide();
    $('#tcb126').hide();
    $('#tcb127').hide();
    $('#tcb130').hide();
    $('#tcb131bt').hide();
    $('#tcb133').hide();
    $('#tcb140').hide();
    $('#tcb141').hide();
    $('#tcb142').hide();
    $('#tcb143').hide();
    $('#tcb147bt').hide();
    $('#tcb149').hide();
    $('#tcb151').hide();
    $('#tcb157').hide();
}



// Select Naod O3, O4

function SelectO34() {
    ShowHeading();
    ShowNaodNMO();
    SelectOEdenDva();

    $('#tcb142').show();
    $('#tcb143').show();

    $('#tcbkusspoj').show();
    $('#tcbstabcisterni').show();
    $('#tcbrefoznaki').show();
    $('#tcbreppnev').hide();
}



//Select Naod L1, L3
function SelectLEdenDTri() {
    ShowHeading();
    ShowNaodL();

    $('#tcb304').show();
    $('#tcb305').show();
    $('#tcb312-7').show();
}



// Select Naod L2, L4, L5, L6, L7
function SelectLOstanati() {

    ShowNaodL();
    ShowHeading();

    $('#tcb304').hide();
    $('#tcb305').hide();
    $('#tcb312-7').hide();
}


$(function () {
    $('.dropdown-toggle').dropdown();

    // prebaruvanje - prikazi na box
    $('.show-search-box').on('click', function (e) {
        e.preventDefault();


        $('#searchBox').toggleClass('hidden');
    });

    // Podatoci za baratelot - prebaruvanje po broj na dokument
    $('#dokumentSearch').autocomplete({
        source: '/Home/RegistracijaSearch',
        selectFirst: true,
        autoFocus: true
    });

    $('#dokumentSearch').on('keydown', function (e) {

        if (e.which == 13) {//Enter key pressed
            e.preventDefault();
            RegistracijaSearch();
        }
    });

    $('#dokumentIcSearch').on('click', RegistracijaSearch);

    // Podatoci za baratelot - prebaruvanje po broj na dokument
    $('#arhivaSearch').autocomplete({
        source: '/Home/RegistracijaSearch',
        selectFirst: true,
        autoFocus: true
    });

    $('#arhivaSearch').on('keydown', function (e) {

        if (e.which == 13) {//Enter key pressed
            e.preventDefault();
            RegistracijaSearch();
        }
    });

    $('#arhivaIcSearch').on('click', RegistracijaSearch);

    // Podatoci za baratelot - prebaruvanj po registracija
    $('#registracijaSearch').autocomplete({
        source: '/Home/RegistracijaSearch',
        selectFirst: true,
        autoFocus: true
    });

    $('#registracijaSearch').on('keydown', function (e) {

        if (e.which == 13) {//Enter key pressed
            e.preventDefault();
            RegistracijaSearch();
        }
    });

    $('#registracijaIcSearch').on('click', RegistracijaSearch);


    // Podatoci za baratelot - prebaruvanje po sasija
    $('#sasijaSearch').autocomplete({
        source: '/Home/SasijaSearch',
        selectFirst: true,
        autoFocus: true
    });

    $('#sasijaSearch').on('keydown', function (e) {

        if (e.which == 13) {//Enter key pressed
            e.preventDefault();
            SasijaSearch();
        }
    });

    $('#sasijaIcSearch').on('click', SasijaSearch);

    // Izdavac na Potvrda
    $('#izdavacNaPotvrda').autocomplete({
        source: '/Home/IzdavacNaPotvrdi',
        selectFirst: true,
        autoFocus: true
    });

    // Podatoci za baratelot - prebaruvanje po ime
    $('#input-name').on('keydown', function (e) {

        if (e.which == 13) {//Enter key pressed
            e.preventDefault();
            var name = $('#input-name').val();
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: '/Home/SelectKomintent',
                contentType: 'application/json; charset=UTF-8',
                data: { ime: name }
            }).done(
                function (kom) {
                    $('#input-name').val(kom.KomintentIme);
                    $('#input-surname').val(kom.KomintentPrezime);
                    $('#input-embg').val(kom.KomintentEmb);
                    $('#input-address').val(kom.KomintentAdresa);
                    $('#input-municipality-of-residence').val(kom.OpstinaId);
                    $('#input-place-of-residence').val(kom.MestoId);
                    $('#input-country-of-residence').val(kom.KomintentEmb);
                    $('#input-number').val(kom.KomintentEmb);
                    $('#input-contact-person').val(kom.KomintentEmb);
                    $('#input-fax').val(kom.KomintentFaks);
                    $('#input-email').val(kom.KomintentEmb);
                    $('#input-name-of-agent').val(kom.KomintentEmb);
                }
            ).fail(
                 function () {
                     alert('Грешка');
                 }
            );
        }
    });

    //Podatoci za baratelot - nov baratel
    $('#next').on('click', function (e) {
        e.preventDefault();

        var baratel = {
            imeBaratel: $('#input-name').val(),
            prezimeBaratel: $('#input-surname').val(),
            embg: $('#input-embg').val(),
            adresa: $('#input-address').val(),
            opstina: $('#input-municipality-of-residence').val(),
            mesto: $('#input-place-of-residencer').val(),
            drzava: $('#input-country-of-residence').val(),
            telefon: $('#input-number').val(),
            kontaktLice: $('#input-contact-person').val(),
            faks: $('#input-fax').val(),
            email: $('#input-email').val(),
            imeAgent: $('#input-name-of-agent').val()
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Home/NovBaratel',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(baratel)
        }).done(function (data) {
            alert(data.msg);
        });
    });


    // Modal namena - novi podatoci

    $('#save-nam-modal').on('click', function (e) {
        e.preventDefault();

        var namData = {
            namSifra: $('#nam-sifra').val(),
            namOpis: $('#nam-opis').val()
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Home/NovaNamena',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(namData)
        }).done(function (data) {
            alert(data);
        });
    });

    // Modal marka - snimanje nov tip na marka
    $('#mark-save').on('click', function (e) {
        e.preventDefault();

        var markData = {
            markSifra: $('#mark-sifra').val(),
            markOpis: $('#mark-opis').val()
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Home/NovaMarka',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(markData)
        }).done(function (data) {
            alert(data);
        });
    });

        


    // Modal komercijalna oznaka - vnesuvanje novi podatoci
    $('#save-kom-oz').on('click', function (e) {
        e.preventDefault();

        SaveKomercijalnaOznaka().done(function (data) {
            $('#modal-vid-vozilo').val(data.vidVozilo);
            $('#mark').val(data.komMarka);
            $('#designation').val(data.komOznaka);
            $('#type').val(data.tipVozilo);
            $('#varijanta').val(data.varijanta);
            $('#izvedba').val(data.izvedba);
            $('#form').val(data.forma);
            $('#form-and-purpose').val(data.namena);

            //    clearTipVoziloInputs();
            $('#alertSuccess').fadeIn(500, function () {
                $(this).removeClass('hide').addClass('alert-success');
                $('#spanMessage').text("Новата комерцијална ознака е зачувана.");
                $('#spanIconSuccess').removeClass('hide');
            }).fadeOut(4000, function () {
                $('spanIconSuccess').addClass('hide');
                $(this).addClass('hide').removeClass('alert-success');
            });
        });
    });

    // Modal tip na motor - novi podatoci
    $('#save-mod-tip').on('click', function (e) {
        e.preventDefault();

        var ModTipVozilo = {
            tipVoziloMod: $('#modal-tip-motor').val(),
            snagaMod: $('#modal-snaga').val(),
            zafatninaMod: $('#modal-zafatnina').val()
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Home/NovaMarka',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(ModTipVozilo)
        }).done(function (data) {
            $('#engine-type').val(data.tipVoziloMod);
            $('#engine-capacity').val(data.snagaMod);
            $('#engine-power').val(data.zafatninaMod);

            clearTipMotorInputs();
            alert("Bravo!!!");
        }).fail(function (status) {
            alert(status.statusCode);
        });
    });

    // Modal boja na vozilo - novi podatoci
    $('#save-mod-boja').on('click', function (e) {
        e.preventDefault();

        var ModBojaVozilo = {
            bojaSifra: $('#modal-sifra-boja').val(),
            grupaBoja: $('#modal-grupa-boja').val(),
            bojaOpis: $('#modal-opis-boja').val()
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Home/NovaKomOznaka',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(ModBojaVozilo)
        }).done(function (data) {
            alert(data.msg);
        });
    });

    // Vozilo novi podatoci
    $('#next').on('click', function (e) {
        e.preventDefault();

        SaveNovoVozilo().done(function (data) {
            $('#alertSuccess').fadeIn(500, function () {
                $(this).removeClass('hide').addClass('alert-success');
                $('#spanMessage').text("Податоците за новото возило се зачувани.");
                $('#spanIconSuccess').removeClass('hide');
            }).fadeOut(4000, function () {
                $('spanIconSuccess').addClass('hide');
                $(this).addClass('hide').removeClass('alert-success');
            });
        });
    });

    // Vozilo dodatni podatoci
    $('#next').on('click', function (e) {
        e.preventDefault();

        var voziloDodatniPodatoci = {
            nvkm: $('#constructive-total-weight').val(),
            nvkmkp: $('#nkvmkp').val(),
            nkvmnp: $('#nkvmnp').val(),
            nkopp: $('#nkopp').val(),
            nlvmvr: $('#nlvmvr').val(),
            nlvmgvr: $('#nlvmgvr').val(),
            dolzinaVozilo: $('#vehicle-length').val(),
            sirinaVozilo: $('#vehicle-width').val(),
            visinaVozilo: $('#vehicle-height').val(),
            pnevmatici: $('#tires').val(),
            brojVrtezi: $('#rpm').val(),
            maxBrzina: $('#max-speed').val(),
            co2: $('#co2').val(),
            stacionarnaBucavost: $('#stationary-noise').val(),
            brzinaVrtenje: $('#rotation-speed').val(),
            rnkvmOska1: $('#rnkvm-axis1').val(),
            rnkvmOska2: $('#rnkvm-axis2').val(),
            rnkvmOska3: $('#rnkvm-axis3').val(),
            rnkvmOska4: $('#rnkvm-axis4').val(),
            rnkvmOska5: $('#rnkvm-axis5').val(),
            nkooptOska1: $('#nkoopt-axis1').val(),
            nkooptOska2: $('#nkoopt-axis2').val(),
            nkooptOska3: $('#nkoopt-axis3').val(),
            nkooptOska4: $('#nkoopt-axis4').val(),
            nkooptOska5: $('#nkoopt-axis5').val(),
            oznakaOdodruvanje: $('#mark-approval').val(),
            oopu: $('#hitch-approval').val(),
            coc: $('#coc').val(),
            zabeleski: $('#notes').val(),
            brojOdobruvanjeMetrologoja: $('#approval-number').val()
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/Home/NovoVozilo',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(voziloDodatniPodatoci)
        }).done(function (data) {
            $('<div/>').text(data.msg);
        });
    });


    $('#startDateSearch').datepicker({
        autoclose: true
    });

    $('#endDateSearch').datepicker({
        autoclose: true
    });

    // Select Naod
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "C1") {
            SelectCEden();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "C2") {
            SelectCDva();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "C3") {
            SelectCTri();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "C4") {
            SelectCCetiri();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "R") {
            SelectR();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "S") {
            SelectS();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "T1") {
            SelectTEden();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "T2") {
            SelectTDva();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "T3") {
            SelectTTri();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "T4") {
            SelectTCetiri();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "T5") {
            SelectTPet();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "N1") {
            SelectNEden();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "N2") {
            SelectNDva();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "M1") {
            SelectMEden();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "M2") {
            SelectMDva();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "M3") {
            SelectMTri();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "O1") {
            SelectOEdenDva();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "O3") {
            SelectO34();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "L1") {
            SelectLEdenDTri();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "L2") {
            SelectLOstanati();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "ML") {
            ShowNaodML();
        }
    });
    $('#naodi').on('change', function () {
        $('.box-naodi').show();
        var val = $(this).val();
        if (val === "SV") {
            SelectSpecVozila();
        }
    });

    $('#next').on('click', function (e) {
        e.preventDefault();
        $('.box-naodi').hide();

        SaveNovoVozilo().done(function (data) {
            $('#izvestajVin').val(data.VoziloSasija);
            $('#izvestajKategorija').val(data.ECEID);
        });

        SaveKomercijalnaOznaka().done(function (data) {
            $('#izvestajMarkaVozilo').val(data.komMarka);
            $('#izvestajTipVozilo').val(data.tipVozilo);
            $('#izvestajKomOznaka').val(data.komOznaka);
        });
    });

    $('#next').on('click', function () {
        $('#tabelaAdr').load('tabelaAdr.html');
    });
});




var asignatura = 'cs';
var animGen = 'fadeIn';
var animSec = 'fadeIn';
var numSeccion = 0;
var dataPag = {};
var numSecTotal, secVisible, numSec, nomSec, numPag, disabled, classPag, numSec, numVista;
$(function(){
    $.getJSON('data/datos.json', function(data){
        dataPag = data;
        cargaVista('portada');
    });
});
// Funciones Portada
function iniciaPortada() {
    $('#botonera a').each(function(i,e){
        $(e).off().click(function(ev){
            ev.preventDefault();
            numVista = 'pag' + dosDigitos(i + 1);
            cargaVista(numVista);
        })
    });
    $('#inicial').show().addClass('animated ' + animGen).on('animationend', function(){
        $('#inicial').off().removeClass('animated ' + animGen);
    });
    for (var i = 0;i < dataPag.contenido.length;i++) {
        $('#botonera #btn' + dosDigitos(i+1) + ' .texto').html(dataPag.contenido[i].titulo);
    }
}

// Funciones Página
function iniciaPag(vista) {
    if ($('#inicial .contenido .seccion').length > 1) {
        ocultaSecciones();
    } else {
        $('.anterior').hide();
        $('.siguiente').hide();
    }
    $('#inicial').show().addClass('animated ' + animGen).on('animationend', function(){
        $('#inicial').removeClass('animated ' + animGen);
        $('.volver').off().click(function(){
            numSeccion = 0;
            cargaVista('portada');
        });
    });
    cargaContPagina(vista);
}
function cargaContPagina(vista) {
    var num = Number(vista.substr(-2,2)) - 1;
    var dpa = dataPag.contenido[num];
    $('.barra>.titulo>.icono>img').attr('src', './int/' + dpa.icono);
    $('.barra>.titulo>.texto').html(dpa.titulo);
    switch (vista) {
        case 'pag01':
            $('.contenido .sec01 .video-youtube iframe.embed-responsive-item').attr('src', dpa.videoYoutube + '?controls=0');
            $('.contenido .sec02 .preg-detona .texto').html(dpa.pregDetona);
            break;
        case 'pag02':
            $('.contenido .sec01 .texto-inicial').html(dpa.textoInicial);
            $('.contenido .sec01 .texto-resaltado').html(dpa.textoResaltado);
            break;
        case 'pag03':
            $('.contenido .sec01 .texto-resaltado').html(dpa.textoResaltado);
            break;
    }
}
function cargaSeccion(num) {
    numSeccion = num;
    ocultaSecciones();
}
function ocultaSecciones() {
    numSecTotal = $('#inicial .contenido .seccion').length - 1;
    secVisible = dosDigitos(numSeccion + 1);
    $('#inicial .contenido .seccion').each(function(i,e){
        $.each($(e).attr('class').split(/\s+/), function(index, elemento) {
            if (elemento.substr(0,3) == 'sec' && elemento.length == 5) {
                numSec = elemento.substr(3,2);
                nomSec = elemento;
            }
        });
        if (numSec == secVisible) {
            $(this).show().addClass('animated ' + animSec).on('animationend', function(){
                $('#inicial .contenido .seccion.' + nomSec).removeClass('animated ' + animSec);
            });
        } else {
            $(this).hide();
        }
        cargaTitulos();
    });
    if (numSeccion > 0) {
        $('.anterior').off().removeClass('disabled').click(function(ev){
            ev.preventDefault();
            cargaSeccion(numSeccion - 1);
        });
    } else {
        $('.anterior').addClass('disabled').off();
    }
    if (numSeccion >= numSecTotal) {
        $('.siguiente').addClass('disabled').off();
    } else {
        $('.siguiente').off().removeClass('disabled').click(function(ev){
            ev.preventDefault();
            cargaSeccion(numSeccion + 1);
        });
    }
}
// Funciones Generales
function cargaVista(vista) {
    $.get('views/' + vista + '.html', function(html){
        $.each($('#inicial').attr('class').split(/\s+/), function(i, e) {
            if (e !== 'container-fluid') {
                $('#inicial').removeClass(e);
            }
        });
        $('#inicial').addClass('view-' + vista).html(html).hide();
        if (vista !== 'portada') {
            $('#inicial').addClass('pagina');
            iniciaPag(vista);
        } else {
            iniciaPortada();
        }
        cargaTitulos();
    });
}
function cargaTitulos() {
    $('#titulo>#desafio').html(dataPag.desafio);
    $('#titulo>#tema').html(dataPag.tema);
}
function dosDigitos(num) {
    return num < 10 ? '0' + num : String(num);
}

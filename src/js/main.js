var idioma = 'es';
var asignatura = 'cs';
var tema = 'La civilización romana';
var animGen = 'fadeIn';
var animSec = 'fadeIn';
var numSeccion = 0;
var dataPag = {};
var numSecTotal, secVisible, numSec, nomSec, numPag, disabled, classPag, numSec, numVista;
$(function(){
    cargaVista('portada');
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
}

// Funciones Página
function iniciaPag() {
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
            $.getJSON('data/pag.json', function(data){
                dataPag = data;
                iniciaPag();
            });
        } else {
            $.getJSON('data/portada.json', function(data){
                dataPag = data;
                iniciaPortada();
            });
        }
        cargaTitulos();
    });
}
function cargaTitulos() {
    $('#titulo>#tema').html(tema);
}
function dosDigitos(num) {
    return num < 10 ? '0' + num : String(num);
}

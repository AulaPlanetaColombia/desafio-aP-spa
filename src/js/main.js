var idioma = 'es';
var animGen = 'fadeInRightBig';
var animBotones = 'bounceInRight';
var animSec = 'fadeIn';
var numSeccion = 0;
var dataPag = {};
var botones = [];
var numBoton = 0;
var numSecTotal, secVisible, numLink, numSec, nomSec, numPag, disabled, classPag, numSec, numVista;
$(function(){
    cargaVista('portada');
});
// Funciones Portada
function iniciaPortada() {
    $('#botonera a').each(function(i,e){
        $(e).off().hide().click(function(ev){
            ev.preventDefault();
            numVista = 'pag' + dosDigitos(i + 1);
            cargaVista(numVista);
        }).on('mouseover', function(){
            $(this).addClass('animated pulse').on('animationend', function(){
                $(this).removeClass('animated pulse');
            });
        });
        botones[i] = e;
    });
    $('#inicial').show().addClass('animated ' + animGen).on('animationend', function(){
        $('#inicial').off().removeClass('animated ' + animGen);
        numBoton = 0;
        iniciaAnimPortada();
    });
}
function iniciaAnimPortada() {
    var el = botones[numBoton];
    $(el).show();
    $(el).addClass('animated ' + animBotones);
    if (numBoton < botones.length) {
        numBoton++;
        window.setTimeout(function(){
            iniciaAnimPortada();
        },200);
    }
    $(el).on('animationend', function(){
        $(el).removeClass('animated ' + animBotones);
    });
}
// Funciones Página

function iniciaPag() {
    if ($('#inicial .contenido .seccion').length > 1) {
        ocultaSecciones();
        generaPaginacion();
    } else {
        $('#navbarNav .pagination').html('');
    }
    $('#inicial').show().addClass('animated ' + animGen).on('animationend', function(){
        $('#inicial').removeClass('animated ' + animGen);
        $('.volver>button').off().click(function(){
            numSeccion = 0;
            cargaVista('portada');
        });
    });
}
function cargaSeccion(num) {
    numSeccion = num;
    ocultaSecciones();
    accionesEspeciales();
}
function ocultaSecciones() {
    numSecTotal = $('#inicial .contenido .seccion').length - 1;
    secVisible = dosDigitos(numSeccion + 1);
    numLink = 'link-' + String(numSeccion + 1);
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
    });
    $('#navbarNav .pagination li.page-item').removeClass('disabled');
    if (numSeccion > 0) {
        $('#navbarNav .pagination li.page-item.prev').removeClass('disabled');
    } else {
        $('#navbarNav .pagination li.page-item.prev').addClass('disabled');
    }
    if (numSeccion >= numSecTotal) {
        $('#navbarNav .pagination li.page-item.sig').addClass('disabled');
    } else {
        $('#navbarNav .pagination li.page-item.sig').removeClass('disabled');
    }
    $('#navbarNav .pagination li.page-item.' + numLink).addClass('disabled');
}
function generaPaginacion() {
    $('#navbarNav .pagination').html('<li class="page-item prev disabled"><a class="page-link" href="#" aria-label="previo"><span aria-hidden="true">&laquo;</span></a></li>');
    $('#inicial .contenido .seccion').each(function(i,e){
        numPag = String(i + 1);
        disabled = (i == numSeccion) ? ' disabled' : '';
        classPag = 'link-' + numPag;
        $('#navbarNav .pagination').append('<li class="page-item' + disabled + ' ' + classPag + '"><a class="page-link" href="#' + numPag + '">' + numPag + '</a></li>');
    });
    $('#navbarNav .pagination').append('<li class="page-item sig"><a class="page-link" href="#" aria-label="siguiente"><span aria-hidden="true">&raquo;</span></a></li>');
    $('#navbarNav .pagination li.page-item a.page-link').off().click(function(ev){
        numSec = Number($(this).attr('href').substr(1)) - 1;
        ev.preventDefault();
        cargaSeccion(numSec);
    });
    $('#navbarNav .pagination li.page-item.prev a.page-link').off().click(function(ev){
        ev.preventDefault();
        cargaSeccion(numSeccion - 1);
    });
    $('#navbarNav .pagination li.page-item.sig a.page-link').off().click(function(ev){
        ev.preventDefault();
        cargaSeccion(numSeccion + 1);
    });
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
    });
}
function accionesEspeciales() {
    switch (numVista) {
        case 'pag04':
            switch (numSeccion) {
                case 2:
                    $('.contenido').css('height', 'auto').css('padding', '5rem 0 3rem');
                    break;
                default:
                    $('.contenido').css('height', '100vh').css('padding', '0');
            }
            break;
    }
}
function dosDigitos(num) {
    return num < 10 ? '0' + num : String(num);
}
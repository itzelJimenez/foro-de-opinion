(function(){
//Declaración de variables generales 
	var url_api = 'http://examen-laboratoria-sprint-5.herokuapp.com/topics';
	var $btnCrear = $('#crearTema');
	var $contForm = $("#contenedorForm");
	var $cerrarCrear = $("#cerrarCrear");
	var $contTemas = $('#temas');
	var $verRespuestas = $('.verRespuestas');

//Función cargarPagina. Cargará toda la funcionalidad de la página
	var cargarPagina = function(){
		cargarDatos();
		$btnCrear.click(mostrarFormulario);
		$cerrarCrear.click(cerrarFormulario);
	};

//Función que muestra el formulario para agregar contenido
	var mostrarFormulario = function(){
		$contForm.removeClass("hide");
	}
//Función que cierra el formulario para crear tema.
	var cerrarFormulario = function(){
		$contForm.addClass("hide");
	}
//Plantilla para crear los temas en el dom.
	var plantillaDom = '<div class="row">'+
              				'<div class="card white col s10 offset-s1 hoverable">'+
                				'<div class="card-content ">'+
                  					'<div class="row">'+
                   				 		'<span class="card-title teal-text col s10">**tema**</span>'+
                    					'<p class="col s2"> <small>Respuestas: **no.Respuestas**</small></p>'+
                    					'<label for="card-title" class="col s12"><strong>Escrito por: </strong>**autor**</label>'+
                    					'<a href="" class="teal-text col s12 verRespuestas">Ver más...</a>'+
                 					'</div>'+
              					'</div>'+
            				'</div>';
//Función que obtiene los datos principales de API
	var cargarDatos = function(){
		$.getJSON(url_api, function (temas) {
    	temas.forEach(crearTema);
  		});
	}
//Función que creará los temas en el html
	var crearTema = function(response){
		var autor = response.author_name;
		var tema = response.content;

		var plantillaNueva = plantillaDom.replace("**tema**", tema).replace("**no.Respuestas**", 0)
							.replace("**autor**", autor);

		$contTemas.append(plantillaNueva);
	}
$(document).ready(cargarPagina);
})();
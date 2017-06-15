(function(){
//Declaración de variables generales 
	var url_api = 'http://examen-laboratoria-sprint-5.herokuapp.com/topics';
	var $btnCrear = $('#crearTema');
	var $contForm = $("#contenedorForm");
	var $cerrarCrear = $("#cerrarCrear");
	var $contTemas = $('#temas');
	var $verRespuestas = $('.verRespuestas');
	var $form = $('#search-form');
	var $btnCrearNvo = $('#crearNuevoTema');


//Función cargarPagina. Cargará toda la funcionalidad de la página
	var cargarPagina = function(){
		cargarDatos();
		$btnCrear.click(mostrarFormulario);
		$cerrarCrear.click(cerrarFormulario);
		$form.submit(filtrarTemas);
		$btnCrearNvo.click(agregarTema);
		$('#form-crear').submit(prevent);

	};

//Función que MUESTRA el formulario para agregar contenido
	var mostrarFormulario = function(){
		$contForm.removeClass("hide");
	}
//Función que CIERRA el formulario de crear tema.
	var cerrarFormulario = function(){
		$contForm.addClass("hide");
	}
//Plantilla para CREA los temas en el dom.
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
//Función que OBTIENE DATOS  principales de API
	var cargarDatos = function(){
		$.getJSON(url_api, function (temas) {
    	temas.forEach(crearTema);
  		});
	}
//Función que CREA los temas en el html
	var crearTema = function(response){
		var autor = response.author_name;
		var tema = response.content;
		var respuestas = response.responses_count;
		var plantillaNueva = plantillaDom.replace("**tema**", tema).replace("**no.Respuestas**", respuestas)
							.replace("**autor**", autor);

		$contTemas.append(plantillaNueva);
	}
//Función AGREGAR TEMA
	var agregarTema = function(){
		var autor = $('#input_text').val();
		var tema = $('#input_text2').val();
		$.post(url_api, {
		    author_name: autor,
		    content: tema
		  }, function (tema) {
		    cargarDatos(tema);
		    cerrarFormulario();
		  });
	}

//Función prevent Default
	var prevent = function(e){
		e.preventDefault();
	}
//Función que FILTRA búsqueda de temas NO FUNCIONAN
	var filtrarTemas = function(e){
		e.preventDefault();
		var criterio = $('#search').val().toLowerCase();
		$.getJSON(url_api, function (temas) {
    	temas.filter(function(response){
    		var temas = response.content.toLowerCase();
    			return temas == criterio;
    		});
  		});
  	}
//Función que muestra los restaurantes Filtrados NO FUNCIONAN
  	var mostrarTemas = function(temas, criterio){
  		console.log(temas, criterio);
  		var temasFiltrados = temas.filter(function(tema){
  			restaurante.indexOf(criterio)>=0;
  		})

  	}
$(document).ready(cargarPagina);
})();
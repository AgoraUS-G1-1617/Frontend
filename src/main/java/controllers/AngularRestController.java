package controllers;

import java.util.ArrayList;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import controllers.map.Tuple;

import services.EncuestaService;
import services.PreguntaService;
import domain.Encuesta;
import domain.Pregunta;

@Controller
@RequestMapping("/api/resultados")
public class AngularRestController {

	@Autowired
	private EncuestaService encuestaService;

	@RequestMapping(value = "/encuestas", method = RequestMethod.GET)
	public @ResponseBody
	Object encuestas(
			@RequestParam(value = "encuesta", required = false) Integer encuestaId) {
		if (encuestaId == null) {
			// Nos devuelve todas las encuestas
			List<Encuesta> result = new ArrayList<Encuesta>();
			Collection<Encuesta> encuestas = encuestaService.findAll();
			result.addAll(encuestas);
			return result;
		} else {
			// Nos devuelve la encuesta dependiendo del id
			Encuesta result;
			result = encuestaService.findOne(encuestaId);
			return result;
		}
	}

	@Autowired
	private PreguntaService preguntaService;

	// Index ------------------------------------------------------------------

//	@RequestMapping(value = "/mapa")
//	public @ResponseBody
//	Object mapa() {
//
//		// Esto es para crear un mapa en el que la clave es la ciudad y el
//		// valor, el numero de encuenstas que se han hecho en dicha ciudad
//		// Esto es lo que vamos a pintar
//		Integer frecuenciaCP = 1;
//		List<Tuple> tuplas = new LinkedList<Tuple>();
//		Collection<Pregunta> preguntas;
//		preguntas = preguntaService.findAll();
//		//HashMap<String, Integer> preguntasPorCiudad = new HashMap<>();
//		for (Pregunta p : preguntas) {
//			String cp = p.getCp();
//			// metodo en el que dado un codigo postal, te dice que ciudad es
//			String ciudad = preguntaService.cpToCiudadString(cp);
//			Tuple tuplaAux=new Tuple(ciudad);
//			if (tuplas.contains(tuplaAux)) {
//				tuplaAux = tuplas.get(tuplas.indexOf(tuplaAux));
//				tuplaAux.setZ(tuplaAux.getZ()+1);
//			} else {
//				tuplaAux.setZ(1);
//				tuplas.add(tuplaAux);
//			}
//
//		}
//
//		return tuplas;
//	}

	@RequestMapping(value = "/mapa")
	public @ResponseBody
	Object mapa() {

		
		List<Tuple> tuplas = new LinkedList<Tuple>();
		Collection<Pregunta> preguntas;
		preguntas = preguntaService.findAll();
		//HashMap<String, Integer> preguntasPorCiudad = new HashMap<>();
		for (Pregunta p : preguntas) {
			String cp = p.getCp();
			// metodo en el que dado un codigo postal, te dice que ciudad es
			String ciudad = preguntaService.cpToCiudadString(cp);
			Tuple tuplaAux=new Tuple(ciudad);
			if (tuplas.contains(tuplaAux)) {
				tuplaAux = tuplas.get(tuplas.indexOf(tuplaAux));
				tuplaAux.setZ(tuplaAux.getZ()+1);
			} else {
				tuplaAux.setZ(1);
				tuplas.add(tuplaAux);
			}

		}

		return tuplas;
	}


	

	@RequestMapping(value = "/preguntas/votadas")
	public @ResponseBody
	Object preguntasMasVotada() {

		
				Collection<Pregunta> preguntas;
		preguntas = preguntaService.findPreguntasMasVotadas();
		

		return preguntas;
	}

	
}
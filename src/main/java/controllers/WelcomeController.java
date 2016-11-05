/* WelcomeController.java
 *
 * Copyright (C) 2013 Universidad de Sevilla
 * 
 * The use of this project is hereby constrained to the conditions of the 
 * TDG Licence, a copy of which you may download from 
 * http://www.tdg-seville.info/License.html
 * 
 */

package controllers;

import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import services.PreguntaService;

import domain.Pregunta;

@Controller
@RequestMapping("/welcome")
public class WelcomeController extends AbstractController {

	
	
	
	// Constructors -----------------------------------------------------------
	
	public WelcomeController() {
		super();
	}
	
	
	
	@Autowired
	private PreguntaService preguntaService;
	// Index ------------------------------------------------------------------		

	@RequestMapping(value = "/index")
	public ModelAndView index(@RequestParam(required=false, defaultValue="John Doe") String name) {
		ModelAndView result;
		SimpleDateFormat formatter;
		String moment;
		
		formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		moment = formatter.format(new Date());
				
		result = new ModelAndView("welcome/index");
		Collection<Pregunta> preguntas;
		preguntas = preguntaService.findAll();
		HashMap<String, Integer> preguntasPorCiudad = new HashMap<>();
		for (Pregunta p: preguntas){
			String cp = p.getCp();
			//metodo en el que dado un codigo postal, te dice que ciudad es
			String ciudad = preguntaService.cpToCiudadString(cp);
			if(preguntasPorCiudad.containsKey(ciudad)){
				Integer contador = preguntasPorCiudad.get(ciudad);
				preguntasPorCiudad.put(ciudad, contador+1);
			}else{
				preguntasPorCiudad.put(ciudad, 1);
			}
			
		}
		result.addObject("preguntasPorCiudad",preguntasPorCiudad);
		result.addObject("name", name);
		result.addObject("moment", moment);

		return result;
	}
}
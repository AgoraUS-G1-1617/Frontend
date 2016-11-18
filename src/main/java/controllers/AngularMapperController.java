package controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
//No ponemos @RequestMapping porque si no el redirect de los métodos no funcionan
public class AngularMapperController{
	
	//Hay que poner el @RequestMapping completo en cada método
	@RequestMapping(value="/resultados/encuestas", method=RequestMethod.GET)
	public String resultadosEncuestas(@RequestParam(value = "encuesta", required = false) Integer encuesta){
		String redirectUrl;
		redirectUrl = "/#/error.do";
		if(encuesta==null){
			redirectUrl = "/#/resultados/encuestas.do";
		}else{
			redirectUrl = "/#/resultados/encuestas.do?encuesta="+encuesta;
		}
		return "redirect:"+redirectUrl;
	}
	@RequestMapping(value="/resultados/encuestas/ver", method=RequestMethod.GET)
	public String resultadosEncuesta(@RequestParam(value = "encuesta", required = false) Integer encuesta){
		String redirectUrl;
		redirectUrl = "/#/error.do";
		if(encuesta==null){
			redirectUrl = "/#/resultados/encuestas.do";
		}else{
			redirectUrl = "/#/resultados/encuestas/ver.do?encuesta="+encuesta;
		}
		return "redirect:"+redirectUrl;
	}
	
	@RequestMapping(value="/resultados/mapa", method=RequestMethod.GET)
	public String resultadosMapa(){
		String redirectUrl;
	
		
		redirectUrl = "/#/resultados/mapa.do";
		
		return "redirect:"+redirectUrl;
	}
	
	
	///resultados/preguntas/estadistica.do'
	
	
	@RequestMapping(value="/resultados/preguntas/estadistica", method=RequestMethod.GET)
	public String preguntasEstadistica(){
		String redirectUrl;
	
		
		redirectUrl = "/#/resultados/preguntas/estadistica.do";
		
		return "redirect:"+redirectUrl;
	}
	
	
	@RequestMapping(value="/error.do",method = RequestMethod.GET)
	public String errorToIndex(){
		return "redirect:/#/";
	}

}

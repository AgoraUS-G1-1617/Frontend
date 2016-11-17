package services;

import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import repositories.PreguntaRepository;
import domain.Encuesta;
import domain.Pregunta;

@Transactional
@Service
public class PreguntaService {

	// Managed repository

	@Autowired
	private PreguntaRepository preguntaRepository;

	public void save(Pregunta pregunta) {

		preguntaRepository.save(pregunta);
	}

	public Pregunta findOne(Integer id) {

		return preguntaRepository.findOne(id);
	}

	public Collection<Pregunta> findPreguntaByEncuesta(Encuesta encuesta) {
		Collection<Pregunta> result;
		result = preguntaRepository.getPreguntaByEncuestaId(encuesta.getId());
		return result;
	}
	
	public Collection<Pregunta> findAll(){
		Collection<Pregunta> result;
		result = preguntaRepository.findAll();
		return result;
	}
	public Collection<Pregunta> findPreguntasMasVotadas(){
		Collection<Pregunta> result;
		result = preguntaRepository.getPreguntaMasVotos();
		return result;
	}

	public String cpToCiudadString(String codigoPostal){
		String res = "caca";
		
		//char[]cp=codigoPostal.toCharArray();
		String cp = codigoPostal.substring(0,2);
		System.out.println("------->"+cp);
		
		
		if(cp.equals("01")){
			res="Alava";
		}
		else if(cp.equals("02")){
			res="Albacete";
		}else if(cp.equals("03")){
			res="Alicante";
		}else if(cp.equals("04")){
			res="Almeria";
		}else if(cp.equals("05")){
			res="Avila";
		}else if(cp.equals("06")){
			res="Badajoz";
		}else if(cp.equals("07")){
			res="Islas Baleares";
		}else if(cp.equals("08")){
			res="Barcelona";
		}else if(cp.equals("09")){
			res="Burgos";
		}else if(cp.equals("10")){
			res="Caceres";
		}else if(cp.equals("11")){
			res="Cadiz";
		}else if(cp.equals("12")){
			res="Castellon";
		}else if(cp.equals("13")){
			res="Ciudad Real";
		}else if(cp.equals("14")){
			res="Cordoba";
		}else if(cp.equals("15")){
			res="A Coruña";
		}else if(cp.equals("16")){
			res="Cuenca";
		}else if(cp.equals("17")){
			res="Gerona";
		}else if(cp.equals("18")){
			res="Granada";
		}else if(cp.equals("19")){
			res="Guadalajara";
		}else if(cp.equals("20")){
			res="Guipuzcua";
		}else if(cp.equals("21")){
			res="Huelva";
		}else if(cp.equals("22")){
			res="Huesca";
		}else if(cp.equals("23")){
			res="Jaen";
		}else if(cp.equals("24")){
			res="Leon";
		}else if(cp.equals("25")){
			res="LLeida";
		}else if(cp.equals("26")){
			res="La Rioja";
		}else if(cp.equals("27")){
			res="Lugo";
		}else if(cp.equals("28")){
			res="Madrid";
		}else if(cp.equals("29")){
			res="Malaga";
		}else if(cp.equals("30")){
			res="Murcia";
		}else if(cp.equals("31")){
			res="Navarra";
		}else if(cp.equals("32")){
			res="Orense";
		}else if(cp.equals("33")){
			res="Asturias";
		}else if(cp.equals("34")){
			res="Palencia";
		}else if(cp.equals("35")){
			res="Las Palmas";
		}else if(cp.equals("36")){
			res="Pontevedra";
		}else if(cp.equals("37")){
			res="Salamanca";
		}else if(cp.equals("38")){
			res="Tenerife";
		}else if(cp.equals("39")){
			res="Cantabria";
		}else if(cp.equals("40")){
			res="Segovia";
		}else if(cp.equals("41")){
			res="Sevilla";
		}else if(cp.equals("42")){
			res="Soria";
		}else if(cp.equals("43")){
			res="Tarragona";
		}else if(cp.equals("44")){
			res="Teruel";
		}else if(cp.equals("45")){
			res="Toledo";
		}else if(cp.equals("46")){
			res="Valencia";
		}else if(cp.equals("47")){
			res="Valladolid";
		}else if(cp.equals("48")){
			res="Vizcaya";
		}else if(cp.equals("49")){
			res="Zamora";
		}else if(cp.equals("50")){
			res="Zaragoza";
		}else if(cp.equals("51")){
			res="Ceuta";
		}else if(cp.equals("52")){
			res="Melilla";
		}else{
			res = "Codigo postal incorrecto";
				}

		
		
		
			return res;
	}
	
	
}

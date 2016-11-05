package services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import repositories.EncuestaRepository;
import domain.Encuesta;

@Transactional
@Service
public class EncuestaService {

	// Managed repository

	@Autowired
	private EncuestaRepository encuestaRepository;

	public void save(Encuesta encuesta) {

		encuestaRepository.save(encuesta);
	}

	public Encuesta findOne(Integer id) {

		return encuestaRepository.findOne(id);
	}

	public Collection<Encuesta> findAll() {
		Collection<Encuesta> result;
		result = encuestaRepository.findAll();
		return result;
	}
	


	public Collection<Encuesta> findEncuestaByKeyord(String keyword){
		Collection<Encuesta> res;
		res = encuestaRepository.findEncuestasByKeyword(keyword);
		return res;
	}
	
	
	
	
	

}

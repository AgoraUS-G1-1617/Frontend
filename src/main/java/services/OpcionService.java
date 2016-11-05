package services;

import java.util.Collection;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import repositories.OpcionRepository;
import domain.Opcion;
import domain.Pregunta;

@Transactional
@Service
public class OpcionService {

	// Managed repository

	@Autowired
	private OpcionRepository opcionRepository;

	public void save(Opcion opt) {

		opcionRepository.save(opt);
	}

	public Opcion findOne(Integer id) {

		return opcionRepository.findOne(id);
	}

	public Collection<Opcion> opcionesPregunta(Pregunta pregunta) {
		Collection<Opcion> result;
		result = opcionRepository.getOpcionesByPreguntaId(pregunta.getId());
		return result;
	}

}

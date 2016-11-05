package repositories;

import java.util.Collection;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import domain.Encuesta;

@Repository
public interface EncuestaRepository extends JpaRepository<Encuesta, Integer> {
	//select p.encuesta from Pregunta p  join p.opcions o where p.encuesta.nombre like %?1% or p.pregunta like %?1% or p.cp like %?1% or o.texto like %?1%
	//select p from Pregunta p where p.pregunta like %?1%
	@Query("select p.encuesta from Pregunta p  join p.opcions o where p.encuesta.nombre like %?1% or p.pregunta like %?1% or p.cp like %?1% or o.texto like %?1%")
	Collection<Encuesta> findEncuestasByKeyword(String palabra);

	
	

}

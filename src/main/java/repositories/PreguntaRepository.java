package repositories;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import domain.Pregunta;

@Repository
public interface PreguntaRepository extends JpaRepository<Pregunta, Integer> {
	
	@Query("select p from Pregunta p where p.encuesta.id=?1")
	Collection<Pregunta> getPreguntaByEncuestaId(Integer id);
	
	@Query("select p from Pregunta p join p.opcions o group by p having sum(o.recuento) >= all(select sum(o.recuento) from Pregunta p join p.opcions o group by p)")
	Collection<Pregunta> getPreguntaMasVotos();
	
}

package repositories;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import domain.Opcion;

@Repository
public interface OpcionRepository extends JpaRepository<Opcion, Integer> {
	
	@Query("select o from Opcion o where o.pregunta.id=?1")
	Collection<Opcion> getOpcionesByPreguntaId(Integer id);
	
}

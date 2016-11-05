package domain;

import java.util.Collection;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;



@Entity
@Access(AccessType.PROPERTY)
public class Encuesta extends DomainEntity{
	private String nombre;
	
	public Encuesta(){
		super();
	}
	
	private Collection<Pregunta> preguntas;
	
	@JsonManagedReference
	@OneToMany(mappedBy="encuesta")
	public Collection<Pregunta> getPreguntas() {
		return preguntas;
	}


	public void setPreguntas(Collection<Pregunta> preguntas) {
		this.preguntas = preguntas;
	}


	public String getNombre() {
		return nombre;
	}


	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	

}

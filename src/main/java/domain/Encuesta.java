package domain;

import java.util.Collection;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;



import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;


 
@XmlRootElement(name = "Encuesta")
@Entity
@Access(AccessType.PROPERTY)
public class Encuesta extends DomainEntity{
	private String nombre;
	
	public Encuesta(){
		super();
	}
	
	private Collection<Pregunta> preguntas;
	
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy="encuesta", cascade=CascadeType.ALL)
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

package domain;

import java.util.Collection;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.SafeHtml;
import org.hibernate.validator.constraints.SafeHtml.WhiteListType;

import com.fasterxml.jackson.annotation.JsonIgnore;


import javax.xml.bind.annotation.XmlRootElement;
 
@XmlRootElement(name = "Pregunta")
@Entity
@Access(AccessType.PROPERTY)
public class Pregunta extends DomainEntity{
	
	public Pregunta(){
		super();
		
	}
	
	private String pregunta;
	private String cp;
	
	@SafeHtml(whitelistType = WhiteListType.NONE)
	@NotBlank
	public String getPregunta() {
		return pregunta;
	}
	public void setPregunta(String pregunta) {
		this.pregunta = pregunta;
	}
	
	@SafeHtml(whitelistType = WhiteListType.NONE)
	@NotBlank
	public String getCp() {
		return cp;
	}
	public void setCp(String cp) {
		this.cp = cp;
	}
	
	private Encuesta encuesta;
	private Collection<Opcion> opcions;

	@JsonIgnore
	@ManyToOne(optional=false)
	public Encuesta getEncuesta() {
		return encuesta;
	}
	public void setEncuesta(Encuesta encuesta) {
		this.encuesta = encuesta;
	}
	@LazyCollection(LazyCollectionOption.FALSE)
	@OneToMany(mappedBy="pregunta", cascade=CascadeType.ALL)
	public Collection<Opcion> getOpcions() {
		return opcions;
	}
	public void setOpcions(Collection<Opcion> opcions) {
		this.opcions = opcions;
	}

}

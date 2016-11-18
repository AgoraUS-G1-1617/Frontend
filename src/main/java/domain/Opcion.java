package domain;
import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.Range;
import org.hibernate.validator.constraints.SafeHtml;
import org.hibernate.validator.constraints.SafeHtml.WhiteListType;

import com.fasterxml.jackson.annotation.JsonIgnore;


import javax.xml.bind.annotation.XmlRootElement;
 
@XmlRootElement(name = "Opcion")
@Entity
@Access(AccessType.PROPERTY)
public class Opcion extends DomainEntity{
	
	
	public Opcion(){
		super();
	}
	
	private String texto;
	private Integer recuento;
	
	@SafeHtml(whitelistType = WhiteListType.NONE)
	@NotBlank
	public String getTexto() {
		return texto;
	}
	
	public void setTexto(String texto) {
		this.texto = texto;
	}
	
	
	
	@Range(min = 0)
	public Integer getRecuento() {
		return recuento;
	}
	public void setRecuento(Integer recuento) {
		this.recuento = recuento;
	}
	
	private Pregunta pregunta;
	@JsonIgnore
	@ManyToOne(optional=false)
	public Pregunta getPregunta() {
		return pregunta;
	}
	public void setPregunta(Pregunta pregunta) {
		this.pregunta = pregunta;
	}

}

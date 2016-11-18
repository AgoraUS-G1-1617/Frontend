package testPositivos;

import java.util.Collection;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import domain.Encuesta;
import domain.Opcion;
import domain.Pregunta;

import services.EncuestaService;
import services.OpcionService;
import services.PreguntaService;
import utilities.AbstractTest;

@ContextConfiguration(locations = { "classpath:spring/datasource.xml",
"classpath:spring/config/packages.xml" })
@RunWith(SpringJUnit4ClassRunner.class)
@Transactional
@TransactionConfiguration(defaultRollback = false)
public class PreguntaPositiveTest extends AbstractTest{
	
	@Autowired
	private PreguntaService preguntaService;
	
	@Autowired
	private OpcionService opcionService;
	
	@Autowired
	private EncuestaService encuestaService;
	
	
	
	@Test
	public void testAllPreguntas(){
		
		Collection<Pregunta>preguntas;
		preguntas = preguntaService.findAll();
		Assert.isTrue(preguntas.size()==7);
		
	}
	
	@Test
	public void testPreguntaContainsOpciones(){
		Pregunta p;
		p=preguntaService.findOne(2);
		
	Assert.isTrue(p.getOpcions().size()>0);
	}

	
	@Test
	public void testPreguntaContainsOpciones2(){
		Pregunta p;
		p=preguntaService.findOne(2);
		Opcion opcion;
		opcion = opcionService.findOne(5);
		
	Assert.isTrue(p.getOpcions().contains(opcion));
	}
	
	
	@Test
	public void testFindOnePregunta(){
		Pregunta pregunta;
		pregunta = preguntaService.findOne(2);
		Assert.isTrue(pregunta.getPregunta().equals("¿Quién debe de ser el presidente de la comunidad?"));
	}
	
	
	@Test
	public void testCPCorrecto(){
		Pregunta pregunta;
		pregunta = preguntaService.findOne(2);
		String codigoPostal = preguntaService.cpToCiudadString(pregunta.getCp());
		Assert.isTrue(codigoPostal.equals("Sevilla"));
		
	}
	

	@Test
	public void testFindPreguntaByEncuesta(){
		Pregunta p1;
		p1=preguntaService.findOne(2);
		
		Encuesta e;
		e= encuestaService.findOne(1);
		
		Collection<Pregunta> p2;
		p2=preguntaService.findPreguntaByEncuesta(e);
		
		Assert.isTrue(p2.contains(p1));
	}
	
	
	

	
}

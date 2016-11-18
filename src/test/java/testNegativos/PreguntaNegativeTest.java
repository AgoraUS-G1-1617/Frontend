package testNegativos;

import java.util.Collection;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.util.Assert;

import domain.Encuesta;
import domain.Pregunta;

import services.EncuestaService;
import services.PreguntaService;
import utilities.AbstractTest;



@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring/datasource.xml",
		"classpath:spring/config/packages.xml" })
@TransactionConfiguration(defaultRollback = true)
public class PreguntaNegativeTest extends AbstractTest{
	
	
	
	@Autowired
	private PreguntaService preguntaService;
	
	@Autowired
	private EncuestaService encuestaService;
	
	
	
	@Test(expected=IllegalArgumentException.class)
	public void testAllPreguntas(){
		
		Collection<Pregunta>preguntas;
		preguntas = preguntaService.findAll();
		Assert.isTrue(preguntas.size()==8);
		
	}
	
	
	@Test(expected=IllegalArgumentException.class)
	public void testCPIncorrecto(){
		Pregunta pregunta;
		pregunta = preguntaService.findOne(2);
		String codigoPostal = preguntaService.cpToCiudadString(pregunta.getCp());
		Assert.isTrue(codigoPostal.equals("Malaga"));
		
	}
	
	
	
	
	@Test(expected=IllegalArgumentException.class)
	public void testFindOnePregunta(){
		Pregunta pregunta;
		pregunta = preguntaService.findOne(2);
		Assert.isTrue(pregunta.getPregunta()=="Prueba Mala");
	}
	
	
	@Test(expected=NullPointerException.class)
	public void testPreguntaContainsOpciones(){
		Pregunta p;
		p=preguntaService.findOne(40);
		
	Assert.isTrue(p.getOpcions().size()>0);
	}
	
	

	@Test(expected=IllegalArgumentException.class)
	public void testPreguntasMasVotadas(){
		Collection<Pregunta>preguntas;
		preguntas = preguntaService.findPreguntasMasVotadas();
		Assert.isTrue(preguntas.size()==20);
	}
	
	
	@Test(expected=IllegalArgumentException.class)
	public void testPreguntasMasVotadas2(){
		Collection<Pregunta>preguntas;
		preguntas = preguntaService.findPreguntasMasVotadas();
		Pregunta pregunta;
		pregunta = preguntaService.findOne(5);
		Assert.isTrue(preguntas.contains(pregunta));
	}
	
	

	@Test(expected=NullPointerException.class)
	public void testFindPreguntaByEncuesta(){
		Pregunta p1;
		p1=preguntaService.findOne(5);
		
		Encuesta e;
		e= encuestaService.findOne(56);
		
		Collection<Pregunta> p2;
		p2=preguntaService.findPreguntaByEncuesta(e);
		
		Assert.isTrue(p2.contains(p1));
	}

	

}

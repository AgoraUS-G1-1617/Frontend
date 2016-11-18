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

import domain.Opcion;
import domain.Pregunta;

import services.OpcionService;
import services.PreguntaService;
import utilities.AbstractTest;



@ContextConfiguration(locations = { "classpath:spring/datasource.xml",
"classpath:spring/config/packages.xml" })
@RunWith(SpringJUnit4ClassRunner.class)
@Transactional
@TransactionConfiguration(defaultRollback = false)
public class OpcionesPositiveTest extends AbstractTest{
	
	@Autowired
	private OpcionService opcionService;
	@Autowired
	private PreguntaService preguntaService;
	
	
	@Test
	public void testFindOneOpciones(){
		Opcion opcions;
		opcions = opcionService.findOne(8);
		Assert.notNull(opcions);
		
	}
	
	@Test
	public void testFindOpcioneByPregunta(){
		Pregunta pregunta;
		pregunta = preguntaService.findOne(2);
		Collection<Opcion>opcions;
		opcions = opcionService.opcionesPregunta(pregunta);
		Opcion opcion;
		opcion= opcionService.findOne(3);
		
		Opcion opcion1;
		opcion1= opcionService.findOne(4);
		
		Opcion opcion2;
		opcion2= opcionService.findOne(5);
		
		Assert.isTrue(opcions.contains(opcion));
		Assert.isTrue(opcions.contains(opcion1));
		Assert.isTrue(opcions.contains(opcion2));
	}
	
	

	@Test
	public void testFindOneOpciones1(){
		Opcion opcions;
		opcions = opcionService.findOne(3);
		Assert.isTrue(opcions.getTexto().equals("Manuel"));
		
	}

	
	

}

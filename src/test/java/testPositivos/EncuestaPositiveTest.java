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

import services.EncuestaService;
import utilities.AbstractTest;


@ContextConfiguration(locations = { "classpath:spring/datasource.xml",
"classpath:spring/config/packages.xml" })
@RunWith(SpringJUnit4ClassRunner.class)
@Transactional
@TransactionConfiguration(defaultRollback = false)
public class EncuestaPositiveTest extends AbstractTest{
	
	@Autowired
	private EncuestaService encuestaService;
	
	
	@Test
	public void testAllEncuesta(){
		Collection<Encuesta>encuestas;
		encuestas = encuestaService.findAll();
		Assert.isTrue(encuestas.size()==3);
	}
	
	@Test
	public void testFindEncuestaByKeyword(){
		Collection<Encuesta>encuestas;
		encuestas = encuestaService.findEncuestaByKeyord("presidente");
		Assert.isTrue(encuestas.size()>0);
	}
	
	@Test
	public void testFindOneEncuesta(){
		Encuesta encuesta;
		encuesta =encuestaService.findOne(1);
		Assert.notNull(encuesta);
	}
	
	@Test
	public void testFindOneEncuesta1(){
		Encuesta encuesta;
		encuesta =encuestaService.findOne(1);
		Assert.isTrue(encuesta.getNombre().equals("Encuesta 1"));
	}
	

}

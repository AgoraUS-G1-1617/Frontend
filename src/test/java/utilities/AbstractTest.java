/* AbstractTest.java
 *
 * Copyright (C) 2015 Universidad de Sevilla
 * 
 * The use of this project is hereby constrained to the conditions of the 
 * TDG Licence, a copy of which you may download from 
 * http://www.tdg-seville.info/License.html
 * 
 */

package utilities;

import org.junit.After;
import org.junit.Before;


public abstract class AbstractTest {
	
	// Set up and tear down -------------------------------
	
	@Before
	public void setUp() throws Throwable {
		PopulateDatabase.main(null);
	}
	
	@After
	public void tearDown() {
	}
	
}

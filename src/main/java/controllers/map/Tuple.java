package controllers.map;



public class Tuple{
	private String code;
	private int z;
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public int getZ() {
		return z;
	}
	public void setZ(int z) {
		this.z = z;
	}
	public Tuple(String code){
		this.code=code;
		this.z=0;
	
		
	}
	public String toString(){
		
		return "code:"+getCode()+","+"z:"+getZ();
	}
	public boolean equals(Object o){
		boolean result=false;
		if (o instanceof Tuple){
		Tuple t=(Tuple)o;
		result=this.getCode().equals(t.getCode());
			
		}
		return result;
	}
	public int hashCode(){
		return this.getCode().hashCode()*7;
	}
}
package edu.thu.rlab.server;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;



import org.apache.commons.lang.StringUtils;

public class QueryCreator 
{	
	public static String getInsertQuery(String dbname,String type, List keylist,List valuelist)
	{
		String query =   "INSERT INTO " + dbname + "."+ type + " ";
		String key   = "(" + StringUtils.join(keylist,",") + ")";
		String value = "(" + StringUtils.join(valuelist,",") + ")";
		query += key + " VALUES " + value + ";";       
		return query;
	}
	
	
	public static String getSelectQueryAll(String dbname,String type)
	{
		return "SELECT * from " + dbname + "." + type;
	}
	
	public static String getRebuilding(String dbname)
	{
		String query = null;
		try {
			query = new String(Files.readAllBytes(Paths.get("rlab.sql")));
			query = query.replaceAll("mydb", dbname);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(query);
		
		return query;
		
		
	}
}

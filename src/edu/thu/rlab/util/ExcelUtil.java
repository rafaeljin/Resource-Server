package edu.thu.rlab.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;

public class ExcelUtil {
	public static String[][] readContent(File file) {
		POIFSFileSystem fs;
		HSSFWorkbook wb = null;
		HSSFSheet sheet;
		HSSFRow row;

		try {
			fs = new POIFSFileSystem(new FileInputStream(file));
			wb = new HSSFWorkbook(fs);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
		sheet = wb.getSheetAt(0);

		int rowNum = sheet.getLastRowNum() + 1;
		int colNum = sheet.getRow(0).getPhysicalNumberOfCells();
		int i, j;
		String[][] content = new String[rowNum][colNum];
		for (i = 0; i < rowNum; i++) {
			row = sheet.getRow(i);
			for (j = 0; j < colNum; j++) {
				content[i][j] = row.getCell(j).getStringCellValue();
			}
		}
		return content;
	}
}

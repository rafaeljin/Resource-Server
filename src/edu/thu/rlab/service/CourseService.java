package edu.thu.rlab.service;

import java.util.List;

import edu.thu.rlab.pojo.Course;

public interface CourseService {
	public int create(Course course);
	
	public List list();

}

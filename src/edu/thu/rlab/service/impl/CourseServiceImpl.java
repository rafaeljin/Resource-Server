package edu.thu.rlab.service.impl;

import java.util.List;

import edu.thu.rlab.dao.CourseDAO;
import edu.thu.rlab.pojo.Course;
import edu.thu.rlab.service.CourseService;

public class CourseServiceImpl implements CourseService {

	private CourseDAO courseDAO;
		
	public CourseDAO getCourseDAO() {
		return courseDAO;
	}
	public void setCourseDAO(CourseDAO courseDAO) {
		this.courseDAO = courseDAO;
	}

	public int create(Course course) {
		// TODO Auto-generated method stub
		this.courseDAO.save(course);
		return 0;
	}
	public List list() {
		// TODO Auto-generated method stub
		return this.courseDAO.findAll();
	}
	
}

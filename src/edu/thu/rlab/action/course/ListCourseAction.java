package edu.thu.rlab.action.course;

import java.util.List;

import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.pojo.Course;
import edu.thu.rlab.service.CourseService;

public class ListCourseAction extends BaseAction {

	private CourseService courseService;
	
	private List<Course> courses;
	
	public void setCourseService(CourseService courseService) {
		this.courseService = courseService;
	}
	public List<Course> getCourses() {
		return courses;
	}

	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		this.courses = this.courseService.list();
		return SUCCESS;
	}

}

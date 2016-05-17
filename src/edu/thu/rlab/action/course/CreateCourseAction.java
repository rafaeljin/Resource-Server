package edu.thu.rlab.action.course;

import org.apache.struts2.json.annotations.JSON;

import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.pojo.Course;
import edu.thu.rlab.server.Uploader;
import edu.thu.rlab.service.CourseService;

public class CreateCourseAction extends BaseAction {
	
	private Course course;
	
	private CourseService courseService;

	public void setCourse(Course course) {
		this.course = course;
	}
	//add this annonation work very well ,fuck strange
	@JSON(serialize=false)
	public Course getCourse() {
		return course;
	}

	public void setCourseService(CourseService courseService) {
		this.courseService = courseService;
	}
	@Override
	public String execute() throws Exception {
		this.courseService.create(course);
		Uploader.upload(course);
		success = true;		
		return INPUT;
	}
}

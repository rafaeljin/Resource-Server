package edu.thu.rlab.action.experiment;

import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.service.ExperimentService;

public class JudgeBySystemAction extends BaseAction {

	private String experimentName;
	
	private String path;
	
	private ExperimentService experimentService;
	
	public String getExperimentName() {
		return experimentName;
	}
	public void setExperimentName(String experimentName) {
		this.experimentName = experimentName;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}

	public void setExperimentService(ExperimentService experimentService) {
		this.experimentService = experimentService;
	}
	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		success = true;
		return SUCCESS;
	}

}

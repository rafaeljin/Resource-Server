package edu.thu.rlab.action.experiment;

import com.alibaba.fastjson.JSONArray;

import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.service.ExperimentService;

public class ListExperimentAction extends BaseAction {

	private JSONArray experiments;
	
	private ExperimentService experimentService;
	

	public JSONArray getExperiments() {
		return experiments;
	}

	public void setExperimentService(ExperimentService experimentService) {
		this.experimentService = experimentService;
	}

	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		this.experiments = this.experimentService.list(getCurrentUser());
		success = true;
		return SUCCESS;
	}
}

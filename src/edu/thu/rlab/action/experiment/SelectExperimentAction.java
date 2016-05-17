package edu.thu.rlab.action.experiment;

import org.apache.struts2.json.annotations.JSON;

import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.pojo.Experiment;
import edu.thu.rlab.service.ExperimentService;

public class SelectExperimentAction extends BaseAction {

	private Experiment experiment;
	
	private ExperimentService experimentService;
		
	@JSON(serialize=false)
	public Experiment getExperiment() {
		return experiment;
	}

	public void setExperiment(Experiment experiment) {
		this.experiment = experiment;
	}

	public void setExperimentService(ExperimentService experimentService) {
		this.experimentService = experimentService;
	}
	
	@Override
	public String execute() throws Exception {
		success = true;
		String path = this.experimentService.select(getCurrentUser(), experiment);
		if(null != path){
			deleteFile(path);
		}
		return SUCCESS;
	}
	

}

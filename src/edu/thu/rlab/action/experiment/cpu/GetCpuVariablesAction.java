package edu.thu.rlab.action.experiment.cpu;

import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.pojo.Cpu;
import edu.thu.rlab.service.ExperimentService;

public class GetCpuVariablesAction extends BaseAction {
	
	private Cpu cpu;
	
	private ExperimentService experimentService;
	
		
	public Cpu getCpu() {
		return cpu;
	}

	public void setCpu(Cpu cpu) {
		this.cpu = cpu;
	}

	public void setExperimentService(ExperimentService experimentService) {
		this.experimentService = experimentService;
	}

	@Override
	public String execute() throws Exception {
		cpu = experimentService.getCpuvariables(getCurrentUser(), cpu);
		cpu.setUser(null); //for return json string ,otherwise 500 server internal error
		success = true;
		return INPUT;
	}

}

package edu.thu.rlab.action.experiment.cpu;

import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.pojo.Cpu;
import edu.thu.rlab.service.ExperimentService;

public class SaveCpuVariablesAction extends BaseAction {

	private Cpu cpu;
	
	private ExperimentService experimentService;

	public Cpu getCpu(){
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
		experimentService.saveCpuVariables(getCurrentUser(), cpu);
		cpu.setUser(null);
		success = true;
		return INPUT;
	}

}

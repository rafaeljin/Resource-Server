RLab.Teacher = function(config) {
	config = config || {};
	Ext.apply(this, config);
	
	new RLab.User(this);

	var studentMenu = new RLab.Menu({
		items:[{
			text : 'Batch Import',
			activeClass : 'menuItemMouseOver',
			type : 'file',
			url : 'uploadFile',
			handler : this.batchImport,
			scope : this
		},{
			activeClass : 'menuItemMouseOver',
			text : 'New Student'
		},{
			activeClass : 'menuItemMouseOver',
			text : 'List Student'
		}]
	});
	
	new RLab.ToolBar({
		renderTo : Ext.get('toolBar'),
		items : [ {
			menu : studentMenu,
			text : "Student",
			width : 120
		}, {
			text : "Experiment",
			width : 120
		}, {
			text : "Student Interface",
			handler : this.redirectToStudentInterface,
			scope : this,
			width : 210
		}]
	});
	var me = this;
	Ext.Ajax.request({
		url : 'listExperiment',
		method : 'post',
		callback : (function(options,success, response){
			new RLab.Teacher.ExperimentInfoPanel({
				course : me.course,
				data : Ext.decode(response.responseText)
			});
		}).createInterceptor(RLab.Callback)
	});
};
RLab.Teacher.prototype = {
	batchImport : function(r){
		Ext.Ajax.request({
			url : 'batchImportStudent',
			method : 'post',
			params : {path : r.path},
			success : function(){
				alert("Success (cmttd2)");
			},
			failure : function(){
				alert("Failure");
			}
		});
	},
	redirectToStudentInterface : function(){
		window.open('index.jsp?stFlag=stFlag');
	}
};
RLab.Teacher.ExperimentInfoPanel = function(config){
	config = config || {};
	Ext.apply(this, config);


	this.displayPanel = Ext.get('displayPanel');
	var filterHtml = '<div><table><tr>'+
	    '<td>SchoolNo</td><td><input id="filter_schoolno" type="text" /></td>'+
	    '<td>Experiment Name</td><td><select id="filter_experimentname"></select></td>'+
		'<td><a href="#"><span class="rlab-experimentfilter">Filter</span></a></td>'+
		'</tr></table></div>';
	var filterEl = this.displayPanel.insertHtml('afterBegin', filterHtml, true);
	filterEl.child('.rlab-experimentfilter').on('click', this.filter, this);
	
	var experimentSelect = Ext.get("filter_experimentname");

	var o = document.createElement("option");
	experimentSelect.dom.options.add(document.createElement("option"));
	Ext.each(RLab.CourseInfo[this.course.name], function(exp){
		var o = document.createElement("option");
		o.text = RLab.Lang[exp];
		o.value = exp;
		experimentSelect.dom.options.add(o);
	});
	this.expPanel = this.displayPanel.createChild({tag:'div'});
	
	this.expTpl = new Ext.XTemplate('<table><thead>',
			'<tr align="center"><td>NO</td><td>SchoolNo</td><td>Student Name</td><td>Experiment Name</td><td>Done Time</td><td>Status</td></tr>',
			'</thead><tbody>',
			'<tpl for="experiments"><tr align="center"><td>{#}</td>',
			'<td><a href="#"><span id="{userId}" class="rlab-teacher-studentdetail">{schoolNo}</span></a></td>',
			'<td><a href="#"><span id="{userId}" class="rlab-teacher-studentdetail">{username}</span></a></td>',
			'<td>{name:this.formatName}</td><td>{doneTime}</td>',
			'<td><a href="#"><span id="{id}" class="rlab-teacher-experimentdetail">{grade:this.formatStatus}</span></td></tr>',
			'</tpl></tbody></table>');
	this.expTpl.formatName = this.formatName;
	this.expTpl.formatStatus = this.formatStatus;
	this.expTable = this.expTpl.append(this.expPanel, this.data, true);
	this.expPanel.on('click', this.onClick, this);
};
RLab.Teacher.ExperimentInfoPanel.prototype = {
	formatName : function(name){
		return RLab.Lang[name];
	},
	formatStatus : function(grade){
		return grade == null? 'Not Judge':'Detail';
	},
	filter : function(){
		var schoolNo = Ext.get('filter_schoolno').dom.value;
		var experimentName = Ext.get('filter_experimentname').dom.value;
		var data = {experiments : []};
		Ext.each(this.data.experiments, function(exp){
			if((''== schoolNo || schoolNo == exp.schoolNo)&&
					('' == experimentName || experimentName == exp.name)){
				data.experiments.push(exp);
			}
		});
		this.expTable.remove();
		this.expTable = this.expTpl.append(this.expPanel, data, true);
	},
	onClick : function(e){
		var el = null;
		var url;
		if(e.getTarget('.rlab-teacher-studentdetail')){
			el = e.getTarget('.rlab-teacher-studentdetail');
			alert("stduent" + el.id);
		}else if(e.getTarget('.rlab-teacher-experimentdetail')){
			el = e.getTarget('.rlab-teacher-experimentdetail');
			this.showExperimentDetail(el.id);
		}
		
	},
	showStudentDetail : function(){
	},
	showExperimentDetail : function(id){
		var e = this.getExperimentById(id);
		var tpl = new Ext.XTemplate('<form><input name="experiment.id" type="hidden" value="{id}"/><table>',
	    '<tr><td>School No</td><td>{schoolNo}</td></tr>',
	    '<tr><td>User Name</td><td>{username}</td></tr>',
	    '<tr><td>Experiment Name</td><td>{name}</td></tr>',
	    '<tr><td>Op Times</td><td>{opTimes}</td></tr>',
	    '<tr><td>Submit Times</td><td>{submitTimes}</td></tr>',
	    '<tr><td>Done Time</td><td>{doneTime}</td></tr>',
	    '<tr><td>Grade</td><td><input name="experiment.grade" type="text" value="{grade}"/></td></tr>',
	    '<tr><td>Remark</td><td><textarea  name="experiment.remark" cols="40" rows="5">{remark}</textarea></td></tr>',
	    '<tr><td>&nbsp;</td><td>',
	    '<table width="100%"><tr align="right"><td><a href="#" onclick=window.open("index.jsp?stFlag=stFlag&stSubmitPath={lastSubmitPath}&stExpName={name}")><span>Run</span></a></td>',
	    '<td><a href="#"><span>Judge By System</span></a></td><td>',
	    '<a href="#"><span class="rlab-clicktosubmit">Submit</span></a></td></tr></table></td></tr>',
	    '</table></form>');

		if(this.experimentDetailWin){
			this.experimentDetailWin.el.remove();
			delete this.experimentDetailWin;
		}
		this.experimentDetailWin = new RLab.Window({
			title : 'Experiemnt Detail',
			html : tpl.apply(e),
			url : 'judgeByTeacher',
			isForm : true,
			width : 500,
			height : 400
		})
		this.experimentDetailWin.show();
		
	},
	getExperimentById : function(id){
		var e = null;
		Ext.each(this.data.experiments, function(exp){
			if(exp.id == id){
				e = exp;
				return false;
			}
		});
		return e;
	}
};
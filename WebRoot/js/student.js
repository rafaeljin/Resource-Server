RLab.Student = function(config) {
	config = config || {};
	Ext.apply(this, config);
	RLab.Student.superclass.constructor.call(this);
	this.addEvents('selected', 'connected', 'disconnected');

	this.user = new RLab.User(this);

	this.led = new RLab.LedPanel();
	this.reg = new RLab.RegPanel();
	this.ram = new RLab.RamPanel();
	
	
	this.experimentMenuItems = [];
	

	if(!this.stSubmitPath || this.stSubmitPath == 'null'){
	//see the end of this function
		this.experiments = RLab.CourseInfo[this.course.name];
		
		//for(i in this.experiments){  it's not work in ie,fuck ie again
		for(var i = 0, length=this.experiments.length; i < length; i++){
			this.experimentMenuItems.push({
				text : RLab.Lang[this.experiments[i]],
				experimentName : this.experiments[i],
				activeClass : 'menuItemMouseOver',
				type : 'file',
				fileType : 'rbf',
				url : 'uploadFile',
				handler : this.selectedFile,
				scope : this
			});
		}
	}
	var experimentMenu = new RLab.Menu( {
		items : this.experimentMenuItems
	});
	this.deviceOpMenu = new RLab.Menu( {
		items : [ {
			name : 'connectDevice',
			text : RLab.Lang['connectDevice'],
			disabled : true,
			handler : this.connect,
			activeClass : 'menuItemMouseOver',
			scope : this
		}, {
			name : 'disconnectDevice',
			text : RLab.Lang['disconnectDevice'],
			disabled : true,
			activeClass : 'menuItemMouseOver',
			handler : this.disconnect,
			scope : this
		} ]
	});
	this.runMenu = new RLab.Menu( {
		items : [ {
			name : 'run',
			text : RLab.Lang['run'],
			disabled : true,
			activeClass : 'menuItemMouseOver',
			handler : this.run,
			
			//handler : this.connect,
			scope : this
			} ]
	});
	
	var toolBar = new RLab.ToolBar( {
		renderTo : Ext.get('toolBar'),
		items : [ {
			menu : experimentMenu,
			text : RLab.Lang['selectExperiment'],
			width : 120
		}, {
			menu : this.deviceOpMenu,
			text : RLab.Lang['deviceOperation'],
			width : 120
		}, {
			menu : this.runMenu,
			text : RLab.Lang['run'],
			width : 120
		}, {
			text : RLab.Lang['experimentRecord'],
			handler : this.testLayout,
			scope : this,
			width : 120
		} ]
	});
	
	//see the begin of this function
	if(this.stSubmitPath && this.stSubmitPath != 'null'){
		//teacher run for view the result
		this.path = this.stSubmitPath;
		this.name = this.stExpName;
		this.onSelected();
	}
};
Ext.extend(RLab.Student,Ext.util.Observable, {
	currentExperiment : null,
	testLayout : function(){
		var me = this;
		if(me.currentExperiment != null){
		me.currentExperiment.destroy();
		delete me.currentExperiment;
		}
		var name = 'caexp1';
		me.currentExperiment = new RLab.Experiment[name]({
					title : RLab.Lang[name],
					name : name,
					expanel : me
				});
		me.currentExperiment.show();
	
		
	},
	selectedFile : function(result, o){
		var path = result.path;
		var name = o.experimentName;
		var me = this;
		me.path = path;
		me.name = name;
		Ext.Ajax.request({
			url : 'selectExperiment',
			method : 'post',
			params : {'experiment.lastSubmitPath' : path, 
			'experiment.name' : name},
			callback : (function(o, s, obj){
				me.onSelected();
				}).createInterceptor(RLab.Callback)
				
				
		})
	},
	onSelected : function(){
		this.deviceOpMenu.enableItem('connectDevice');
		this.deviceOpMenu.disableItem('disconnectDevice');
		this.runMenu.disableItem('run');
		//this.currentExperiment.show();
		
		if(this.currentExperiment != null){
			//alert("connect");
			this.currentExperiment.destroy();
			delete this.currentExperiment;
		}
	},
	onConnected : function(){
		//alert("Connect Success");
		this.deviceOpMenu.disableItem('connectDevice');
		this.deviceOpMenu.enableItem('disconnectDevice');
		this.runMenu.enableItem('run');
		RLab.Device.reset();
		//alert("reset");
		//this.currentExperiment.show();
		//alert("afterreset");
		
		//if someone disconnect and then connect,and the device probably is changed because of that
		//so it need to download the rbf file again, 
		if(this.currentExperiment != null){
			//alert("bushan");
			this.currentExperiment.destroy();
			delete this.currentExperiment;
		}
	},
	onDisconnected : function(){
		this.deviceOpMenu.enableItem('connectDevice');
		this.deviceOpMenu.disableItem('disconnectDevice');
		this.runMenu.disableItem('run');
		
	},
	connect : function(){
		//alert("connect");
		var me = this;
		me.deviceOpMenu.disableItem('connectDevice');//repeat click
		RLab.Device.connect(me.onConnected, me, function(){
			me.deviceOpMenu.enableItem('connectDevice');
		});
	},
	disconnect : function(){
		RLab.Device.disconnect(this.onDisconnected, this);
	},
	run : function(){
		var me = this;
		//me.currentExperiment.show();
		
		if(me.currentExperiment != null){
			me.currentExperiment.reset();
			me.currentExperiment.show();
		}else {
			RLab.Device.downloadExamFromUsb({
				'deviceCmd.fileName' : me.path
			},(function(){
				
				me.currentExperiment = new RLab.Experiment[me.name]({
					title : RLab.Lang[me.name],
					name : me.name,
					expanel : me
				});
				
				me.currentExperiment.show();
				
			}));
			
		}
		
	},
	showExperimentStatus : function(){
		var me = this;
		Ext.Ajax.request({
			url : 'listExperiment',
			method : 'post',
			callback : (function(options, success, response){
				if(me.experimentStatusWin){
					me.experimentStatusWin.el.remove();
					delete me.experimentStatusWin;
				}
				
			}).createInterceptor(RLab.Callback)
		});
	}
});

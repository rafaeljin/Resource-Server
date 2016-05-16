RLab.Admin = function() {

	var user = new RLab.User();
	
	var courseMenu = new RLab.Menu({
		items:[{
			text : RLab.Lang['newCourse'],
			handler : this.showNewCourseWin,
			activeClass : 'menuItemMouseOver',
			scope : this
		},{
			activeClass : 'menuItemMouseOver',
			text : RLab.Lang['listCourse']
		}]
	});

	var teacherMenu = new RLab.Menu({
		items:[{
			text : RLab.Lang['newTeacher'],
			handler : this.showNewTeacherWin,
			activeClass : 'menuItemMouseOver',
			scope : this
		},{
			activeClass : 'menuItemMouseOver',
			text : RLab.Lang['listTeacher']
		}]
	});
	var deviceMenu = new RLab.Menu({
		items:[{
			text : RLab.Lang['writeCtrlToFlash'],
			activeClass : 'menuItemMouseOver',
			type : 'file',
			fileType : 'rbf',
			url : 'uploadFile',
			handler : this.writeCtrlToFlash,
			scope : this
		}]
	});
	
	new RLab.ToolBar({
		renderTo : Ext.get('toolBar'),
		items : [ {
			menu : courseMenu,
			text : RLab.Lang['course'],
			width : 120
		}, {
			menu : teacherMenu,
			text : RLab.Lang['teacher'],
			width : 120
		}, {
			menu : deviceMenu,
			text : RLab.Lang['device'],
			width : 120
		}]
	});
	new RLab.Admin.DevicePanel();
	return;
	var map = new Ext.util.MixedCollection();
	map.add("welcomeBtn", Ext.get("welcomePanel"));
	map.add("courseInfoBtn", Ext.get("courseInfoPanel"));
	map.add("teacherInfoBtn", Ext.get("teacherInfoPanel"))
	map.add("deviceInfoBtn", Ext.get("deviceInfoPanel"));

	function switchPanel(e, clicked) {
		var el = e.getTarget("div", null, true);
		map.eachKey(function(key, item) {
			if (key == el.id)
				item.show();
			else
				item.hide();
		});
	}

	var courseInfoBtn = Ext.get("courseInfoBtn");
	var teacherInfoBtn = Ext.get("teacherInfoBtn");
	var deviceInfoBtn = Ext.get("deviceInfoBtn");

	courseInfoBtn.on("click", switchPanel, this);
	teacherInfoBtn.on("click", switchPanel, this);
	deviceInfoBtn.on("click", switchPanel, this);
	
	
	var listCourseBtn = Ext.get("listCourseBtn");
	listCourseBtn.on('click',function(){new RLab.Admin.CoursePanel()}, this);
};
RLab.Admin.prototype = {
	showNewCourseWin : function(){
		var newCourseHtml = '<div><form><table>'+
			'<tr><td><label>Code</label></td><td><input name="course.code" type="text"/></td></tr>'+
			'<tr><td><label>Name</label></td><td><select name="course.name">'+
				'<option value="digitalLogic" selected="selected">Digital Logic</option>'+
				'<option value="principleofComputer">Principle of Computer</option>'+
				'<option value="computerArchitecture">Computer Architecture</option>'+
			'</select></td></tr>'+
			'<tr><td><label>Year</label></td><td><select name="course.year"><option value="2012" selected="selected">2012</option><option value="2013">2013</option><option value="2014">2014</option><option value="2015">2015</option><option value="2016">2016</option><option value="2017">2017</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option> </select></td></tr>'+
			'<tr><td><label>Season</label></td><td><select name="course.season">'+
				'<option value="Spring" selected="selected">Spring</option>'+
				'<option value="Summer">Summer</option>'+
				'<option value="Autumn">Autumn</option>'+
				'<option value="Winter">Winter</option>'+
			'</select></td></tr>'+
			'<tr><td></td><td><a href="#"><span class="rlab-clicktosubmit">Submit</span></a></td></tr></table></form></div>';

		if(!this.newCourseWin){
			this.newCourseWin = new RLab.Window({
				title : RLab.Lang['newCourse'],
				html : newCourseHtml,
				isForm : true,
				url : 'createCourse',
				width : 300,
				height : 200
			});
		}
		this.newCourseWin.show();
	},
	showNewTeacherWin : function(){
		var newTeacherHtml = '<div><form><table>'+
			'<tr><td><label>Username</label></td><td><input name="user.username" type="text" /></td></tr>'+
			'<tr><td><label>Password</label></td><td><input name="user.password" type="password" /></td></tr>'+
			'<tr><td><label>Name</label></td><td><input name="user.name" type="text" /></td></tr>'+
			'<tr><td><label>Email</label></td><td><input name="user.email" type="text" /></td></tr>'+
			'<tr><td><label>Phone</label></td><td><input name="user.phone" type="text" /></td></tr>'+
			'<input id="user.course.id" type="hidden" name="user.course.id" value=""/>' +
			'<tr><td><label>Course</label></td><td><select id="userCourseIdProxy"></select></td></tr>'+
			'<tr><td></td><td><a href="#"><span class="rlab-clicktosubmit">Submit</span></a></td></tr>'+
			'</table></form></div>';

		if(!this.newTeacherWin){
			this.newTeacherWin = new RLab.Window({
				title : RLab.Lang['newTeacher'],
				html : newTeacherHtml,
				isForm : true,
				url : 'createUser',
				selects : [{name:'select',url : 'listCourse',handler:this.setCourseOptions,scope:this}],
				beforeSubmit : {handler : this.beforeSubmitNewTeacher, scope : this},
				width : 300,
				height : 200
			});
		}
		this.newTeacherWin.show();
	},
	beforeSubmitNewTeacher : function(win){
		var courseid = Ext.get("user.course.id").dom;
		var courseIdProxy = Ext.get("userCourseIdProxy").dom;
		courseid.value = courseIdProxy.options[courseIdProxy.selectedIndex].value;
		return true;
	},
	setCourseOptions : function(dom, r){
		var courses = r.courses;
		dom.options.length = 0;
		Ext.each(courses, function(course){
			var o = document.createElement("option");
			o.text = course.code + ' ' + RLab.Lang[course.name] + ' '+course.year+' '+ course.season;
			o.value = course.id;
			dom.options.add(o);
		});
	},
	writeCtrlToFlash : function(result, o){
		
		RLab.Device.writeCtrlToFlash({
			'deviceCmd.fileName' : result.path
		});
	}
};

RLab.Admin.DevicePanel = function(){
	this.displayPanel = Ext.get("displayPanel");
	this.deviceTpl = new Ext.XTemplate('<table><thead><tr>',
			'<td>IP</td><td>Port</td><td>Location</td><td>LastHeartBeatTime</td><td>State</td>',
			'<td>UserIP</td><td>UserName</td><td>StartUseTime</td><td>LastOpTime</td>',
			'</tr></thead><tbody>',
			'<tpl for="devices">',
				'<tr><td>{ip}</td>',
				'<td>{port}</td>',
				'<td>{location}</td>',
				'<td>{lastHeartBeatTime}</td>',
				'<td>{state}</td>',
				'<td>{userip}</td>',
				'<td>{username}</td>',
				'<td>{startUseTime}</td>',
				'<td>{lastOpTime}</td></tr>',
			'</tpl>',
			'</tbody></table>');

	var me = this;
	Ext.TaskMgr.start({
		run : function(){
			Ext.Ajax.request({
				url : 'listDevice',
				method : 'post',
				callback : (function(options, success, response){
					var data = Ext.decode(response.responseText);
					me.deviceTpl.overwrite(me.displayPanel, data);
				}).createInterceptor(RLab.Callback)
			})
		},interval : 1500,
		scope : this
	});
};

RLab.Admin.CoursePanel = function() {
	var dataTest = {
		courses : [ {
			id : 1,
			name : 'test1',
			year : '2010',
			season : 'spring'
		}, {
			id : 2,
			name : 'test2',
			year : '2010',
			season : 'spring'
		}, {
			id : 3,
			name : 'test3',
			year : '2010',
			season : 'spring'
		},{
			id : 4,
			name : 'test4',
			year : '2010',
			season : 'spring'
		}]
	};
	var tpl = new Ext.XTemplate(
			'<table><tbody><tr><td>NO</td><td>Name</td><td>Year</td>',
			'<td>Season</td><td>Update</td><td>Delete</td></tr>',
			'<tpl for="courses">',
			'<tr id="{id}"><td>{#}</td><td>{name}</td><td>{year}</td><td>season</td>',
			'<td><a href="#">Update</a></td><td><a href="#">Delete</a></td>',
			'</tr></tpl></tbody></table>');
	tpl.append(Ext.get("courseInfoPanel"), dataTest);
}
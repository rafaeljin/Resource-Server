RLab.Admin = function() {

	var user = new RLab.User();

	var newCourseWin = null;
	var newCourseHtml = '<form><table><tr><td><label>Code</label></td><td><input name="course.code" type="text"/></td></tr><tr><td><label>Name</label></td><td><select name="course.name"><option value="Digital Logic" selected="selected">Digital Logic</option><option value="Principle of Computer">Principle of Computer</option><option value="Computer Architecture">Computer Architecture</option></select></td></tr><tr><td><label>Year</label></td><td><select name="course.year"><option value="2012" selected="selected">2012</option><option value="2013">2013</option><option value="2014">2014</option><option value="2015">2015</option><option value="2016">2016</option><option value="2017">2017</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option> </select></td></tr><tr><td><label>Season</label></td><td><select name="course.season"><option value="Spring" selected="selected">Spring</option><option value="Summer">Summer</option><option value="Autumn">Autumn</option><option value="Winter">Winter</option></select></td></tr><tr><td></td><td><a href="#"><span>Submit</span></a></td></tr></table></form></div>';
	function getNewCourseWin(){
		if(!newCourseWin){
			newCourseWin = new RLab.Window({
				title : 'New Course',
				html : newCourseHtml,
				isForm : true,
				url : 'createCourse',
				width : 300,
				height : 200
			});
		}
		return newCourseWin;
	};	
	
	var courseMenu = new RLab.Menu({
		items:[{
			text : 'New Course',
			window : getNewCourseWin()
		},{
			text : 'List Course'
		}]
	});
	//TODO
	var newTeacherHtml = '<form><table><tr><td><label>Username</label></td><td><input name="user.username" type="text" /></td></tr><tr><td><label>Password</label></td><td><input name="user.password" type="password" /></td></tr><tr><td><label>Name</label></td><td><input name="user.name" type="text" /></td></tr><tr><td><label>Email</label></td><td><input name="user.email" type="text" /></td></tr><tr><td><label>Phone</label></td><td><input name="user.phone" type="text" /></td></tr><tr><td><label>Course</label></td><td><select name="user.course.id"></select></td></tr><tr><td></td><td><a href="#"><span>Submit</span></a></td></tr></table></form>';
	var newTeacherWin = null;
	function setCourseOptions(dom, r){
		var courses = r.courses;
		dom.options.length = 0;
		Ext.each(courses, function(course){
			dom.add(new Option(course.code + ' ' + course.name + ' '+course.year+' '+ course.season, course.id));
		});
		
	}
	function getNewTeacherWin(){
		if(!newTeacherWin){
			newTeacherWin = new RLab.Window({
				title : 'New Teacher',
				html : newTeacherHtml,
				isForm : true,
				url : 'createUser',
				selects : [{name:'select',url : 'listCourse',handler:setCourseOptions,scope:this}],
				width : 300,
				height : 200
			});
		}
		return newTeacherWin;
	};	
	var teacherMenu = new RLab.Menu({
		items:[{
			text : 'New Teacher',
			window : getNewTeacherWin()
		},{
			text : 'List Teacher'
		}]
	});
	
	var adminToolBar = new RLab.ToolBar({
		renderTo : Ext.get('toolBar'),
		items : [ {
			menu : courseMenu,
			text : "Course"
		}, {
			menu : teacherMenu,
			text : "Teacher"
		}]
	});
//	var devicePanel = new RLab.Admin.DevicePanel();
	
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

RLab.Admin.DevicePanel = function(){
	var t = Ext.get("adminDisplayPanel");
	t.insertHtml('afterBegin', '<table><thead><tr>'+
			'<td>IP</td>'+
			'<td>Port</td>'+
			'<td>Location</td>'+
			'<td>LastHeartBeatTime</td>'+
			'<td>State</td>'+
			'<td>User IP</td>'+
			'<td>Username</td>'+
			'</tr></thead><tbody></tbody></table>');
	var devicePanel = t.child('tbody');
	
	var tableItemTpl = new Ext.XTemplate(
			'<tr><td>{ip}</td>',
			'<td>{port}</td>',
			'<td>{location}</td>',
			'<td>{lastHeartBeatTime}</td>',
			'<td>{state}</td>',
			'<td>{userip}</td>',
			'<td>{username}</td></tr>'
			);
	var deviceMap = new Ext.util.MixedCollection();
	function updateDevice(el, data){
	}
	function updateDevices(result){
		var r = Ext.decode(result.responseText);
		var ds = r.devices;
		var i, id, el;
		for(i = 0; i < ds.length; i++){
			id = ds[i].id;
			if(deviceMap.containsKey(id)){
				updateDevice(deviceMap.key(id), ds[i]);
			}else{
				el = tableItemTpl.insertFirst(devicePanel, ds[i], true);
				deviceMap.add(ds[i], el);
			}
		}
		
	}
	var poll = Ext.TaskMgr.start({
		run : function(){
			Ext.Ajax.request({
				url : 'listDevice.action',
				success : updateDevices,
				failure : function(){}
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
RLab = {
	version : "rlab-web1.0",
	author : "/ooooDong Wu",
	date : "2012-1-16"
};
RLab.CourseInfo = {
	courses : [ 'digitalLogic', 'principleofComputer', 'computerArchitecture' ],
	digitalLogic : [ 'dlexp0', 'dlexp1', 'dlexp2', 'dlexp3', 'dlexp4', 'dlexp5'],
	principleofComputer : [ 'pcexp1', 'pcexp2', 'pcexp3','pcexp4', 'pcexp5', 'pcexp6' ],
	computerArchitecture : [ 'caexp1', 'caexp2', 'caexp3' ]
};

RLab.User = function(user) {
	if (user != null) {
		var info = Ext.get("information");
		info.setInnerText(user.course.username + '@' + user.course.year + ' '
				+ RLab.Lang[user.course.name] + '(' + user.course.code + ')');
	}
	var userPanel = new RLab.ToolBar( {
		renderTo : Ext.get("userPanel"),
		items : [ {
			href : 'logout',
			text : RLab.Lang['logout'],
			width : 40
		} , {
			text : RLab.Lang['modifyPassword'],
			handler : this.modifyPassword,
			scope : this,
			width : 60
		},{
			text : RLab.Lang['myProfile'],
			handler : this.editMyProfile,
			scope : this,
			width : 60
		} ]
	});
	

};
RLab.User.prototype = {
	editMyProfile : function() {
		var tpl = new Ext.XTemplate(
				'<form><input name="user.id" type="hidden" value="{id}"/><table>',
				'<tr><td align="right">Name</td><td align="left">{name}</td></tr>',
				'<tpl if="userRole==\'ROLE_STUDENT\'">',
				'<tr><td align="right">School NO</td><td align="left">{schoolNo}</td></tr>',
				'<tr><td align="right">Class Name</td><td align="left">{clazzName}</td></tr>',
				'</tpl>',
				'<tr><td align="right">Create Time</td><td align="left">{createTime}</td></tr>',
				'<tr><td align="right">Login Count</td><td align="left">{loginCount}</td></tr>',
				'<tr><td align="right">Online Time</td><td align="left">{onlineTime}</td></tr>',
				'<tr><td align="right">Last Login Time</td><td align="left">{lastLoginTime}</td></tr>',
				'<tr><td align="right">Last Login IP</td><td align="left">{lastLoginIp}</td></tr>',
				'<tr><td align="right">Email</td><td align="left"><input type="text" name="user.email" value="{email}"/></td></tr>',
				'<tr><td align="right">Phone</td><td align="left"><input type="text" name="user.phone" value="{phone}"/></td></tr>',
				'<tr><td align="right" colspan="2"><a href="#"><span class="rlab-clicktosubmit">Save Changes</span></a></td></tr>',
				'</table></form>');
		var me = this;
		Ext.Ajax.request( {
			url : 'getProfile',
			method : 'post',
			params : {
				'toGet.id' : ''
			},
			callback : (function(options, success, response) {
				var data = Ext.decode(response.responseText);
				if (me.myProfileWin) {
					me.myProfileWin.el.remove();
					delete me.myProfileWin;
				}
				me.myProfileWin = new RLab.Window( {
					title : 'My Profile',
					html : tpl.apply(data.user),
					mask : true,
					isForm : true,
					url : 'updateProfile',
					width : 400,
					height : 350
				});
				me.myProfileWin.show();
			}).createInterceptor(RLab.Callback)
		});
	},

	modifyPassword : function() {
		var html = '<form><table>'
				+ '<tr><td align="right">Current</td><td align="left"><input type="password" name="currentPassword"/></td></tr>'
				+ '<tr><td align="right">New</td><td align="left"><input type="password" name="newPassword"/></td></tr>'
				+ '<tr><td align="right">Confirm</td><td align="left"><input type="password" name="confirmPassword"/></td></tr>'
				+ '<tr><td>&nbsp;</td><td align="right"><a href="#"><span class="rlab-clicktosubmit">Save Changes</span></a></td></tr>'
				+ '</table></form>';
		if (this.modifyPasswordWin == null) {
			this.modifyPasswordWin = new RLab.Window( {
				title : "Modify Password",
				html : html,
				mask : true,
				isForm : true,
				url : 'modifyPassword',
				width : 300,
				height : 200
			});
		}
		this.modifyPasswordWin.body.child('form', true).reset();
		this.modifyPasswordWin.show();
	}

};

RLab.Callback = function(options, success, response) {
	return true;
	if (success == true) {
		var r = Ext.decode(response.responseText);
		if (r.success == true) {
			return true;
		} else {
			if(options.failureHandler)
				options.failureHandler.call(window);
			alert("wrong with code:" + r.errorCode);
	}
	} else {
		if(options.failureHandler)
			options.failureHandler.call(window);
		
	alert("wrong with status:" + response.status + ":"
				+ response.responseText);

	}
	return false;
};
RLab.Device = function() {
	function execute(url, params, handler, scope) {
		Ext.Ajax.request( {
			url : url,
			method : 'POST',
			async : false,
			params : params,
			callback : (function(options, success, response) {
				if (handler) {
					handler.call(scope || window, Ext
							.decode(response.responseText));
				}
			}).createInterceptor(RLab.Callback)
		});
		//alert("execute");
	}
	return {
		connect : function(callback, scope, failureHandler) {
			Ext.Ajax.request( {
				url : 'connectDevice',
				method : 'post',
				failureHandler : failureHandler,
				callback : (function() {
					callback.call(scope);
				}).createInterceptor(RLab.Callback)
			});
		},
		disconnect : function(callback, scope) {
			Ext.Ajax.request( {
				url : 'disconnectDevice',
				method : 'post',
				callback : (function() {
					callback.call(scope);
				}).createInterceptor(RLab.Callback)
			});
		},
		reset : function(params, handler, scope) {
			RLab.Device.resetUsb();
			RLab.Device.resetCpld();
			RLab.Device.resetExam( {}, handler, scope);
		},
		resetExam : function(params, handler, scope) {
			params = Ext.apply(params || {}, {
				'deviceCmd.type' : 'ResetExam'
			});
			execute('executeDeviceCmdByUser', params, handler, scope);
		},
		resetCpld : function(params, handler, scope) {
			params = Ext.apply(params || {}, {
				'deviceCmd.type' : 'ResetCpld'
			});
			execute('executeDeviceCmdByUser', params, handler, scope);
		},
		resetUsb : function(params, handler, scope) {
			params = Ext.apply(params || {}, {
				'deviceCmd.type' : 'ResetUsb'
			});
			execute('executeDeviceCmdByUser', params, handler, scope);
		},
		// output : int[] regs
		getRegs : function(params, handler, scope) {
			//alert("getRegs");
			params = Ext.apply(params || {}, {
				'deviceCmd.type' : 'GetRegs'
			});
			//alert("getRegs1");
			execute('executeDeviceCmdByUser', params, handler, scope);
		},
		// output : byte dbStatus
		getDBStatus : function(params, handler, scope) {
			params = Ext.apply(params || {}, {
				'deviceCmd.type' : 'GetDBStatus'
			});
			execute('executeDeviceCmdByUser', params, handler, scope);
		},
		// input : byte dbStatus
		setDBStatus : function(params, handler, scope) {
			params = Ext.apply(params || {}, {
				'deviceCmd.type' : 'SetDBStatus'
			});
			execute('executeDeviceCmdByUser', params, handler, scope);
		},
		// input : int dataBus
		setDataBus : function(params, handler, scope) {
			params = Ext.apply(params || {}, {
				'deviceCmd.type' : 'SetDataBus'
			});
			execute('executeDeviceCmdByUser', params, handler, scope);
		},
		// input : int clocks
		sendCycles : function(params, handler, scope) {
			params = Ext.apply(params || {}, {
				'deviceCmd.type' : 'SendCycles'
			});
			execute('executeDeviceCmdByUser', params, handler, scope);
		},
		// input : int clocks
		flipCycles : function(params, handler, scope) {
			params = Ext.apply(params || {}, {
				'deviceCmd.type' : 'FlipCycles'
			});
			execute('executeDeviceCmdByUser', params, handler, scope);
		},
		/*
		 * 
		 * CtrlFpgaSelector = 0x00; ExamFpgaSelector = 0x01; CtrlFlashSelector =
		 * 0x00; ExamFlashSelector = 0x01; params : String fileName
		 * 
		 */
		downloadExamFromUsb : function(params, handler, scope) {
			params = Ext.apply(params || {}, {
				'deviceCmd.type' : 'DownloadFpgaFromUsb',
				'deviceCmd.fpgaSelector' : 1
			});
			execute('executeDeviceCmdByUser', params, handler, scope);
		},
		downloadCtrlFromUsb : function(params, handler, scope) {
			params = Ext.apply(params || {}, {
				'deviceCmd.type' : 'DownloadFpgaFromUsb',
				'deviceCmd.fpgaSelector' : 0
			});
			execute('executeDeviceCmdByUser', params, handler, scope);
		},
		downloadExamFromFlash : function(params, handler, scope) {
			params = Ext.apply(params || {}, {
				'deviceCmd.type' : 'DownloadFpgaFromFlash',
				'deviceCmd.fpgaSelector' : 1,
				'deviceCmd.flashSelector' : 1
			});
			execute('executeDeviceCmdByUser', params, handler, scope);
		},
		downloadCtrlFromFlash : function(params, handler, scope) {
			params = Ext.apply(params || {}, {
				'deviceCmd.type' : 'DownloadFpgaFromFlash',
				'deviceCmd.fpgaSelector' : 0,
				'deviceCmd.flashSelector' : 0
			});
			execute('executeDeviceCmdByUser', params, handler, scope);
		},
		writeCtrlToFlash : function(params, handler, scope) {
			params = Ext.apply(params || {}, {
				'deviceCmd.type' : 'WriteFpgaToFlash',
				'deviceCmd.flashSelector' : 0
			});
			execute('executeDeviceCmdByAdmin', params, handler, scope);
		},
		writeExamToFlash : function(params, handler, scope) {
			params = Ext.apply(params || {}, {
				'deviceCmd.type' : 'WriteFpgaToFlash',
				'deviceCmd.flashSelector' : 1
			});
			execute('executeDeviceCmdByAdmin', params, handler, scope);
		},

		/*
		 * input : int startAddress , endAddress, byte[]data or, fileName
		 * 
		 * 
		 * 
		 */
		writeRam : function(params, handler, scope) {
			params = Ext.apply(params || {}, {
				'deviceCmd.type' : 'WriteRam'
			});
			execute('executeDeviceCmdByUser', params, handler, scope);
		},
		/*
		 * params : int startAddress endAddress, boolean returnFile
		 * 
		 * return: file(returnFile == true) byte[]ram
		 * 
		 */
		readRam : function(params, handler, scope) {
			params = Ext.apply(params || {}, {
				'deviceCmd.type' : 'ReadRam'
			});

			execute('executeDeviceCmdByUser', params, handler, scope);
		}
	};
}();
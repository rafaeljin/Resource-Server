RLab.Teacher = function() {
	var user = new RLab.User();
	function batchImport(r){
		Ext.Ajax.request({
			url : 'batchImportStudent',
			method : 'post',
			params : {path : r.path},
			success : function(){
				alert("Success (cmttd3)");
			},
			failure : function(){
				alert("Failure");
			}
		});
	}
	
	
	var studentMenu = new RLab.Menu({
		items:[{
			text : 'Batch Import',
			type : 'file',
			url : 'uploadFile',
			handler : batchImport,
			scope : this
		},{
			text : 'New Student'
		},{
			text : 'List Student'
		}]
	});
	
	var toolBar = new RLab.ToolBar({
		renderTo : Ext.get('toolBar'),
		items : [ {
			menu : studentMenu,
			text : "Student"
		}, {
			text : "Experiment"
		}]
	});
};

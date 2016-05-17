RLab.SidePanel = Ext.extend(RLab.Component, {
	alignCls : '',
	reader : null,
	colModel : null,
	init : function(){
		var me = this;
		var el = document.createElement('div');
		me.el = Ext.get(el);
		me.el.setStyle({position:'absolute',width:180});
		Ext.getBody().appendChild(me.el);

		me.xy = me.el.adjustForConstraints(me.el.getAlignToXY(Ext.get("displayPanel"),me.alignCls));
		me.el.setXY(me.xy);
		

		var ds = new Ext.data.Store( {
			reader : me.reader,
			data : []
		});
		
		var view = new Ext.grid.GridView( {
			forceFit : true
		});
	
		me.grid = new Ext.grid.EditorGridPanel( {
			renderTo : me.el,
			height : me.getBrowserHeight() - me.xy[1],
			ds : ds,
			cm : me.colModel,
			view : view
		});
		Ext.EventManager.onWindowResize(me.onWindowResize, me);
	},
	onWindowResize : function(){
		var me = this;
		me.xy = me.el.adjustForConstraints(me.el.getAlignToXY(Ext.get("displayPanel"),me.alignCls));
		me.el.setXY(me.xy);
		me.grid.setHeight(me.getBrowserHeight() - me.xy[1]);
	}
});
RLab.RamPanel = Ext.extend(RLab.SidePanel, {
	alignCls : 'tl-tr',
	init : function(){
		this.reader = new Ext.data.ArrayReader( {}, ['address', 'value']);
		this.colModel = new Ext.grid.ColumnModel({
			columns : [ {
				header : RLab.Lang['ramAddress'],
				dataIndex : 'address'
			},{
				header : RLab.Lang['ramValue'],
				dataIndex : 'value',
				editor : new Ext.form.TextField()
			}],
			defaults : {
				sortable : false,
				width : 80,
				menuDisabled : true,
				resizable : false,
				fixed : true
			}
		});
		RLab.RamPanel.superclass.init.call(this);
	},
	
	getRam : function(){
		var store = this.grid.store;
		var records = store.getRange();
		var ram = new Array();
		for(var i= 0;i<store.getCount();i++){
			ram.push(records[i].data['value']);
		}		
		return ram;
	},
	
	onDataChanged : function(deviceCmd){
		var me = this;
		me.startAddress = deviceCmd.startAddress;
		me.endAddress = deviceCmd.endAddress;
		var store = me.grid.store;
		var RecordType = store.recordType;
		store.removeAll(true);
		var tv;
		for(var i = me.startAddress; i <= me.endAddress; i++){
			tv = parseInt(deviceCmd.ram[i - me.startAddress]);
			tv = (tv + 256) % 256;
			store.insert(store.getCount(), new RecordType({
				"address" : '0x' + i.toString(16),
				"value" : tv
			}));
		}
	}
});
RLab.RegPanel = Ext.extend(RLab.SidePanel, {
	alignCls : 'tr-tl',
	init : function(){
		this.reader = new Ext.data.ArrayReader( {}, ['name', 'value']);

		this.colModel = new Ext.grid.ColumnModel({
			columns : [ {
				header : RLab.Lang['regName'],
				dataIndex : 'name'
			},{
				header : RLab.Lang['regValue'],
				dataIndex : 'value'
			}],
			defaults : {
				sortable : false,
				width : 80,
				menuDisabled : true,
				resizable : false,
				fixed : true
			}
		});
		RLab.RegPanel.superclass.init.call(this);

		var store = this.grid.store;
		var RecordType = store.recordType;
		for(var i=0; i<256;i++){
			store.insert(store.getCount(), new RecordType({
				"name" : 'Reg' + i,
				"value" : 0
			}));
		}
		
	},
	onDataChanged : function(deviceCmd){
		var store = this.grid.store;
		var records = store.getRange();
		var reg = deviceCmd.reg;
		for(var i= 0;i<256;i++){
			records[i].data['value'] = reg[i];
		}
		store.fireEvent('datachanged', store);
		
	}
});
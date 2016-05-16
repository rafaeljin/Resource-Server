RLab.Grid = Ext.extend(Ext.grid.EditorGridPanel,{
	preEditValue : function(r, field){
		var value = r.data[field][0];
		return this.autoEncode && Ext.isString(value) ? Ext.util.Format.htmlDecode(value) : value
	},
	onEditComplete : function(ed, value, startValue){
	    this.editing = false;
	    this.lastActiveEditor = this.activeEditor;
	    this.activeEditor = null;
	
	    var r = ed.record,
	        field = this.colModel.getDataIndex(ed.col);
	    value = this.postEditValue(value, startValue, r, field);
	    if(this.forceValidation === true || String(value) !== String(startValue)){
	        var e = {
	            grid: this,
	            record: r,
	            field: field,
	            originalValue: startValue,
	            value: value,
	            row: ed.row,
	            column: ed.col,
	            cancel:false
	        };
	        if(this.fireEvent("validateedit", e) !== false && !e.cancel && String(value) !== String(startValue)){
	            r.set(field, [e.value,e.record.data[e.field][1]]);//change
	            delete e.cancel;
	            this.fireEvent("afteredit", e);
	        }
	    }
	    this.view.focusCell(ed.row, ed.col);
	}
})
RLab.Grid.Column = Ext.extend(Ext.grid.Column,{
	constructor: function(cfg){
		RLab.Grid.Column.superclass.constructor.call(this, cfg)
		this.renderer = function(v){
			return Ext.isEmpty(v[0])?'':(v[0] + ":" + v[1]);
		};
	}
});
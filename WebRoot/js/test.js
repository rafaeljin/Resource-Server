RLab.Experiment.dlexp3 = Ext.extend(RLab.Experiment.dlexp2, {
	input : [ 'a0', 'a1', 'a2', 'a3', 'b0', 'b1', 'b2', 'b3', 'cin', ],
	output : [ 'f0', 'f1', 'f2', 'f3', 'cout' ],
	onClick : function(e) {
		var me = this;
		var el = null;
		if (e.getTarget('.rlab-clickToReverse')) {
			el = e.getTarget('.rlab-clickToReverse', 10, true);
			me[el.id] = me[el.id] == 0 ? 1 : 0;
			if ((me['b3'] * 8 + me['b2'] * 4 + me['b1'] * 2 > 9)
					|| (me['a3'] * 8 + me['a2'] * 4 + me['a1'] * 2 > 9)) {
				me[el.id] = me[el.id] == 0 ? 1 : 0;
				alert("加数不能大于10");
			} else {
				el.setInnerText(me[el.id]);
				me.fireEvent('change', me);
			}
		}
	}
});


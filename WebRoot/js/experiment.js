RLab.Experiment = Ext.extend(RLab.Window, {
	input : [],
	output : [],
	init : function() {
		this.addEvents('reset', 'change');
		RLab.Experiment.superclass.init.call(this);
		this.toolBarEl = new RLab.ToolBar( {
			renderTo : Ext.get(this.id + "_ToolBar"),
			items : [ {
				text : RLab.Lang['reset'],
				handler : this.reset,
				scope : this,
				width : 60
			}, {
				text : RLab.Lang['judge'],
				handler : this.judge,
				scope : this,
				width : 60
			}, {
				text : RLab.Lang['guide'],
				width : 60
			} ]
		});
		this.body.on('click', this.onClick, this);
		this.on('change', this.onChange, this);
		if (this.input.length > 0)
			this.fireEvent('change', this);

		var downloadBtn;
		if ((downloadBtn = this.body.child('.rlab-setAllMemory')) != null) {
			new RLab.Button( {
				width : 90,
				renderTo : downloadBtn,
				text : "下载内存",
				type : 'file',
				url : 'uploadFile',
				handler : this.setAllMemory,
				scope : this
			});
		}

	},
	getSpecialMemory : function() {
		var me = this;
		var startAddress, endAddress;
		startAddress = parseInt(Ext.get('rlab_startAddress').dom.value, 16);
		endAddress = parseInt(Ext.get('rlab_endAddress').dom.value, 16);

		// TODO endAddress - startAddress should less than 1024
		if (endAddress - startAddress > 1024) {
			alert('长度应小于1024');
			return;
		}

		var dbStatus;
		RLab.Device.getDBStatus( {}, function(response) {
			dbStatus = response.deviceCmd.dbStatus
		});
		RLab.Device.setDBStatus( {
			'deviceCmd.dbStatus' : 0x2
		});
		RLab.Device.readRam( {
			'deviceCmd.startAddress' : startAddress,
			'deviceCmd.endAddress' : endAddress
		}, function(response) {
			me.expanel.ram.onDataChanged(response.deviceCmd);
		});
		RLab.Device.setDBStatus( {
			'deviceCmd.dbStatus' : dbStatus
		});
	},
	setSpecialMemory : function() {
		var startAddress, endAddress;
		startAddress = parseInt(Ext.get('rlab_startAddress').dom.value, 16);
		endAddress = parseInt(Ext.get('rlab_endAddress').dom.value, 16);

		var dbStatus;
		RLab.Device.getDBStatus( {}, function(response) {
			dbStatus = response.deviceCmd.dbStatus
		});
		RLab.Device.setDBStatus( {
			'deviceCmd.dbStatus' : 0x2
		});
		var ram = this.expanel.ram;
		RLab.Device.writeRam( {
			'deviceCmd.startAddress' : ram.startAddress,
			'deviceCmd.endAddress' : ram.endAddress,
			'deviceCmd.data' : Ext.encode(ram.getRam())
		});
		RLab.Device.setDBStatus( {
			'deviceCmd.dbStatus' : dbStatus
		});
	},
	getAllMemory : function() {
		var dbStatus;
		RLab.Device.getDBStatus( {}, function(response) {
			dbStatus = response.deviceCmd.dbStatus
		});
		RLab.Device.setDBStatus( {
			'deviceCmd.dbStatus' : 0x2
		});
		RLab.Device.readRam( {
			'deviceCmd.startAddress' : 0,
			'deviceCmd.endAddress' : 0x1FFFFF,
			'deviceCmd.returnFile' : true
		}, function(response) {
			window.location = "downloadFile?fileName="
					+ response.deviceCmd.fileName;

		});
		RLab.Device.setDBStatus( {
			'deviceCmd.dbStatus' : dbStatus
		});
	},
	setAllMemory : function(result, options) {
		var path = result.path;
		var dbStatus;

		RLab.Device.getDBStatus( {}, function(response) {
			dbStatus = response.deviceCmd.dbStatus
		});
		RLab.Device.setDBStatus( {
			'deviceCmd.dbStatus' : 0x2
		});
		RLab.Device.writeRam( {
			'deviceCmd.fileName' : path
		});
		RLab.Device.setDBStatus( {
			'deviceCmd.dbStatus' : dbStatus
		});
	},
	sendCycles : function() {
		var me = this;
		var clock = Ext.get('rlab_clock').dom.value;
		RLab.Device.sendCycles( {
			'deviceCmd.clock' : clock
		}, me.showResult, me);
	},
	reverseInput : function(el) {
		var me = this;
		me[el.id] = me[el.id] == 0 ? 1 : 0;
		el.setInnerText(me[el.id]);
		me.fireEvent('change', me);
	},

	onClick : function(e) {
		var me = this;
		var el = null;
		if (e.getTarget('.rlab-clickToReverse')) {
			el = e.getTarget('.rlab-clickToReverse', 10, true);
			me.reverseInput(el);
		}
		if ((el = e.getTarget('.rlab-getSpecialMemory')) != null) {
			me.getSpecialMemory();
		}
		if ((el = e.getTarget('.rlab-setSpecialMemory')) != null) {
			me.setSpecialMemory();
		}
		if ((el = e.getTarget('.rlab-sendClocks')) != null) {
			me.sendCycles();
		}
		var breakAddress, maxClocks;
		if ((el = e.getTarget('.rlab-clickToRunToBreak')) != null) {
			breakAddress = Ext.get('rlab_breakAddress').dom.value;
			maxClocks = Ext.get('rlab_maxClocks').dom.value;
			// TODO
		}
		if ((el = e.getTarget('.rlab-clickToStop')) != null) {
			// TODO
		}
		if ((el = e.getTarget('.rlab-getRegs')) != null) {
			// TODO
		}
		if ((el = e.getTarget('.rlab-setRegs')) != null) {
			// TODO
		}
		
		if ((el = e.getTarget('.rlab-getAllMemory')) != null) {
			me.getAllMemory();
		}
	},
	variablesToDBValue : function() {
		var value = 0;
		for ( var i = this.input.length - 1; i >= 0; i--) {
			value = (value << 1) + this[this.input[i]];
		}
		return value;
	},
	variablesToDBMask : function() {
		var mask = 0;
		for ( var i = this.input.length - 1; i >= 0; i--) {
			mask <<= 1;
			if (this.input[i] != '0') {
				mask += 1;
			}
		}
		return mask;
	},
	onChange : function() {
		var me = this;
		var value = me.variablesToDBValue();
		var mask = me.variablesToDBMask();
		RLab.Device.setDBStatus( {
			'deviceCmd.dbStatus' : 0x5
		});
		RLab.Device.setDataBus( {
			'deviceCmd.dataBus' : value,
			'deviceCmd.dataBusMask' : mask
		});
		
		me.showResult();
	},
	showResult : function(ret) {
		var me = this;
		
		var deviceCmd;
		RLab.Device.getRegs( {}, function(response) {
			deviceCmd = response.deviceCmd;
		});
		
		me.expanel.led.change(deviceCmd.regs[253], deviceCmd.regs[254]);
		me.expanel.reg.onDataChanged(deviceCmd);
		
		var addr = deviceCmd.regs[253];
		var el;
		for ( var i = 0, length = me.output.length; i < length; i++) {
		
			if (me.output[i] != 0) {
		
				el = Ext.get(me.output[i]);
				el.setInnerText(addr % 2);
			}
			addr = addr >> 1;
		}
	
	},
	reset : function() {
		var me = this;
		var el;
		for ( var i = 0, length = me.input.length; i < length; i++) {
			me[me.input[i]] = 0;
			el = Ext.get(me.input[i]);
			if (el)
				el.setInnerText('0');
		}
		RLab.Device.reset();
		
		if (me.input.length > 0)
			me.fireEvent('change', me);
		
	},
	destroy : function(){
		RLab.Experiment.superclass.destroy.call(this);
	},
	guide : function() {
	},
	judge : function() {
	}
});
RLab.Experiment.dlexp0 = Ext
		.extend(
				RLab.Experiment,
				{
					width : 500,
					height : 250,
					html : '<table width="100%"><tr valign="middle"><td align="right"><table width="51">'
							+ '<tr><td>A</td><td><a href="#"><span class="rlab-clickToReverse" id="A">0</span></a></td></tr>'
							+ '<tr><td>B</td><td><a href="#"><span class="rlab-clickToReverse" id="B">0</span></a></td></tr>'
							+ '<tr><td>C</td><td><a href="#"><span class="rlab-clickToReverse" id="C">0</span></a></td></tr>'
							+ '<tr><td>D</td><td><a href="#"><span class="rlab-clickToReverse" id="D">0</span></a></td></tr>'
							+ '</table></td><td width="140"><img src="images/dlexp0.jpg"/></td><td align="left"><table width="54">'
							+ '<tr><td width="57"><span id="a0">0</span></td><td width="38">a</td></tr>'
							+ '<tr><td width="57"><span id="b0">1</span></td><td width="38">b</td></tr>'
							+ '<tr><td width="57"><span id="c0">1</span></td><td width="38">c</td></tr>'
							+ '<tr><td width="57"><span id="d0">1</span></td><td width="38">d</td></tr>'
							+ '<tr><td width="57"><span id="e0">1</span></td><td width="38">e</td></tr>'
							+ '<tr><td width="57"><span id="f0">1</span></td><td width="38">f</td></tr>'
							+ '<tr><td width="57"><span id="g0">1</span></td><td width="38">g</td></tr>'
							+ '</table></td></tr></table>',
					A : 0,
					B : 0,
					C : 0,
					D : 0,
					input : [ 'D', 'C', 'B', 'A' ],
					output : [ 0, 0, 0, 'g0', 'f0', 'e0', 'd0', 'c0', 'b0',
							'a0' ]
				});
RLab.Experiment.dlexp1 = Ext
		.extend(
				RLab.Experiment,
				{
					width : 500,
					height : 250,
					html : '<table><tr><td><table width="51">'
							+ '<tr><td>S0</td><td><a href="#"><span class="rlab-clickToReverse" id="s0">0</span></a></td></tr>'
							+ '<tr><td>S1</td><td><a href="#"><span class="rlab-clickToReverse" id="s1">0</span></a></td></tr>'
							+ '<tr><td>&nbsp;</td><td>&nbsp;</td></tr>'
							+ '<tr><td>D</td><td><a href="#"><span class="rlab-clickToReverse" id="d">0</span></a></td></tr>'
							+ '<tr><td>C</td><td><a href="#"><span class="rlab-clickToReverse" id="c">0</span></a></td></tr>'
							+ '<tr><td>B</td><td><a href="#"><span class="rlab-clickToReverse" id="b">0</span></a></td></tr>'
							+ '<tr><td>A</td><td><a href="#"><span class="rlab-clickToReverse" id="a">0</span></a></td></tr>'
							+ '</table></td><td><img src="images/dlexp1.jpg"/></td><td>'
							+ '<table><tr><td>&nbsp;</td><td>&nbsp;</td></tr>'
							+ '<tr><td>&nbsp;</td><td>&nbsp;</td></tr>'
							+ '<tr><td>&nbsp;</td><td>&nbsp;</td></tr>'
							+ '<tr><td width="25"><span id="y">0</span></td><td>Y</td></tr></table>'
							+ '</td></tr></table>',
					s0 : 0,
					s1 : 0,
					d : 0,
					c : 0,
					b : 0,
					a : 0,
					y : 0,
					input : [ 's0', 's1', 'd', 'c', 'b', 'a' ],
					output : [ 'y' ]
				});
RLab.Experiment.dlexp2 = Ext
		.extend(
				RLab.Experiment,
				{
					width : 480,
					height : 440,
					html : '<table><tr><td><table width="51">'
							+ '<tr height="25"><td>&nbsp;</td><td>&nbsp;</td></tr>'
							+ '<tr height="23"><td>A3</td><td><a href="#"><span class="rlab-clickToReverse" id="a3">0</span></a></td></tr>'
							+ '<tr height="23"><td>A2</td><td><a href="#"><span class="rlab-clickToReverse" id="a2">0</span></a></td></tr>'
							+ '<tr height="23"><td>A1</td><td><a href="#"><span class="rlab-clickToReverse" id="a1">0</span></a></td></tr>'
							+ '<tr height="23"><td>A0</td><td><a href="#"><span class="rlab-clickToReverse" id="a0">0</span></a></td></tr>'
							+ '<tr height="98"><td>&nbsp;</td><td>&nbsp;</td></tr>'
							+ '<tr height="23"><td>B3</td><td><a href="#"><span class="rlab-clickToReverse" id="b3">0</span></a></td></tr>'
							+ '<tr height="23"><td>B2</td><td><a href="#"><span class="rlab-clickToReverse" id="b2">0</span></a></td></tr>'
							+ '<tr height="23"><td>B1</td><td><a href="#"><span class="rlab-clickToReverse" id="b1">0</span></a></td></tr>'
							+ '<tr height="23"><td>B0</td><td><a href="#"><span class="rlab-clickToReverse" id="b0">0</span></a></td></tr>'
							+ '<tr height="23"><td>Cin</td><td><a href="#"><span class="rlab-clickToReverse" id="cin">0</span></a></td></tr>'
							+ '</table></td><td><img src="images/dlexp2.jpg"/></td><td><table>'
							+ '<tr height="62"><td>&nbsp;</td><td>&nbsp;</td></tr>'
							+ '<tr height="23"><td width="25"><span id="cout">0</span></td><td>Cout</td></tr>'
							+ '<tr height="36"><td>&nbsp;</td><td>&nbsp;</td></tr>'
							+ '<tr height="23"><td width="25"><span id="f3">0</span></td><td>F3</td></tr>'
							+ '<tr height="23"><td width="25"><span id="f2">0</span></td><td>F2</td></tr>'
							+ '<tr height="23"><td width="25"><span id="f1">0</span></td><td>F1</td></tr>'
							+ '<tr height="23"><td width="25"><span id="f0">0</span></td><td>F0</td></tr>'
							+ '<tr height="122"><td>&nbsp;</td><td>&nbsp;</td></tr>'
							+ '</table></td></tr></table>',
					cin : 0,
					a3 : 0,
					a2 : 0,
					a1 : 0,
					a0 : 0,
					b3 : 0,
					b2 : 0,
					b1 : 0,
					b0 : 0,
					input : [ 'cin', 'a3', 'a2', 'a1', 'a0', 'b3', 'b2', 'b1',
							'b0' ],
					output : [ 'cout', 'f0', 'f1', 'f2', 'f3' ]
				});
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
RLab.Experiment.dlexp4 = Ext
		.extend(
				RLab.Experiment,
				{
					width : 500,
					height : 200,
					html : '<div id="dlexp6-panel"><div id="dlexp6-input">'
							+ '<input id="rlab_clock" value="1" type="hidden"/>'
							+ '<table>'
							+ '<tr><td"><label>时钟数:</label></td><td><span id="rlab_sendedClocks">0</span></td></tr>'
							+ '<tr><td colspan="2" align="right"><a href="#"><span class="rlab-sendClocks">Send Clock</span></a></td></tr>'
							+ '</table></div></div>',
					init : function() {
						RLab.Experiment.dlexp4.superclass.init.call(this);
						this.fireEvent('change', this);
					},
					showResult : function() {
						var deviceCmd;
						RLab.Device.getRegs( {}, function(response) {
							deviceCmd = response.deviceCmd;
						});
						
						this.expanel.led.change(deviceCmd.regs[253], deviceCmd.regs[254]);

						var el = Ext.get("rlab_sendedClocks");
						el.setInnerText(deviceCmd.regs[253]);
					},
					reset : function() {
						var el = Ext.get("rlab_sendedClocks");
						el.setInnerText('0');
						RLab.Device.reset();
					}
				});
RLab.Experiment.dlexp7 = Ext
		.extend(
				RLab.Experiment,
				{
					width : 500,
					height : 200,
					html : '<div id="dlexp7-panel"><div id="dlexp7-input"><table width="100%"><tr>'
							+ '<td width="20%" align="right"><input type="text" id="rlab_clock" value="1" size="3"/></td>'
							+ '<td width="50" align="left"><label>个时钟</label></td>'
							+ '<td width="30%"><a href="#"><span class="rlab-sendClocks">Run</span></a></td>'
							+ '</tr></table></div></div>',
					reset : function() {
						Ext.get("rlab_clock").dom.value = 0;
						RLab.Device.reset();
					}
				});
RLab.Experiment.dlexp5 = Ext
		.extend(
				RLab.Experiment,
				{
					width : 450,
					height : 200,
					html : '<div><input id="rlab_clock" value="1" type="hidden"/><table width="100%" height="100%"><tr>'
							+ '<td align="center"><table><tr><td><label>检测结果</label></td></tr><tr><td><span id="state_result">B</span></td></tr></table></td><td align="right"><table  width="70%">'
							+ '<tr><td colspan="8"><label>输入序列</label></td></tr><tr>'
							+ '<td><a href="#"><span id="seq7"class="rlab-clickToReverse">0</span></a></td>'
							+ '<td><a href="#"><span id="seq6"class="rlab-clickToReverse">0</span></a></td>'
							+ '<td><a href="#"><span id="seq5"class="rlab-clickToReverse">0</span></a></td>'
							+ '<td><a href="#"><span id="seq4"class="rlab-clickToReverse">0</span></a></td>'
							+ '<td><a href="#"><span id="seq3"class="rlab-clickToReverse">0</span></a></td>'
							+ '<td><a href="#"><span id="seq2"class="rlab-clickToReverse">0</span></a></td>'
							+ '<td><a href="#"><span id="seq1"class="rlab-clickToReverse">0</span></a></td>'
							+ '<td><a href="#"><span id="seq0"class="rlab-clickToReverse">0</span></a></td>'
							+ '</tr></table></td></tr>'
							+ '<tr><td colspan="2" align="right"><a href="#"><span class="rlab-sendClocks">Run</span></a></td>'
							+ '</tr></table></div>',
					seq7 : 0,
					seq6 : 0,
					seq5 : 0,
					seq4 : 0,
					seq3 : 0,
					seq2 : 0,
					seq1 : 0,
					seq0 : 0,
					seq : 0,
					input : [ "seq" ],
					output : [ "seq0", "seq1", "seq2", "seq3", "seq4", "seq5",
							"seq6", "seq7" ],
					reverseInput : function(el) {
						var me = this;
						me[el.id] = me[el.id] == 0 ? 1 : 0;
						el.setInnerText(me[el.id]);

					},
					sendCycles : function() {
						var me = this;
						me.seq = me.seq7;
						me.seq7 = me.seq6;
						me.seq6 = me.seq5;
						me.seq5 = me.seq4;
						me.seq4 = me.seq3;
						me.seq3 = me.seq2;
						me.seq2 = me.seq1;
						me.seq1 = me.seq0;
						me.seq0 = 0;

						var el;
						for ( var i = 0, length = me.output.length; i < length; i++) {
							el = Ext.get(me.output[i]);
							el.setInnerText('' + me[me.output[i]]);
						}
						me.fireEvent("change", me);
						RLab.Experiment.dlexp5.superclass.sendCycles.call(this);
					},
					showResult : function(ret) {
						var deviceCmd;
						RLab.Device.getRegs( {}, function(response) {
							deviceCmd = response.deviceCmd;
						});
						this.expanel.led.change(deviceCmd.regs[253], deviceCmd.regs[254]);

						var addr = deviceCmd.regs[253];
						var el = Ext.get("state_result");
						if (addr & 0x8) {
							el.setInnerText("A");
						} else {
							el.setInnerText("B");
						}
					}
				});
RLab.Experiment.caexp = Ext
		.extend(
				RLab.Experiment,
				{
					width : 700,
					height : 650,
					html : '<div><table><tr><td>'
							+ '<fieldset><legend><label>操作窗口</label></legend><table>'
							+ '<tr><td>'
							+ '<fieldset><legend><label>局部内存操作</label></legend><table>'
							+ '<tr><td><label>开始字节地址 0x</label></td><td><input type="text" id="rlab_startAddress" value="0"/></td>'
							+ '<td><a href="#"><span class="rlab-getSpecialMemory">获取当前内存</span></a></td></tr>'
							+ '<tr><td><label>线束字节地址 0x</label></td><td><input type="text" id="rlab_endAddress" value="F"/></td>'
							+ '<td><a href="#"><span class="rlab-setSpecialMemory">修改当前内存</span></a></td></tr>'
							+ '</table></fieldset>'
							+ '</td></tr><tr><td>'
							+ '<fieldset><legend><label>连续运行</label></legend><table>'
							+ '<tr><td><label>+</label></td><td><input type="text" id="rlab_clock" value="1"/></td>'
							+ '<td><label>个时钟>0</label></td><td><a href="#"><span class="rlab-sendClocks">连续运行</span></a></td></tr>'
							+ '</table></fieldset>'
							+ '</td></tr><tr><td>'
							+ '<fieldset><legend><label>运行到断点</label></legend><table>'
							+ '<tr><td><label>设置断点 0x</label></td><td><input type="text" id="rlab_breakAddress" value="0"/></td>'
							+ '<td><a href="#"><span class="rlab-runToBreak">运行到断点</span></a></td></tr>'
							+ '<tr><td><label>最大时钟个数 +</label></td><td><input type="text" id="rlab_maxClocks" value="1"/></td>'
							+ '<td><a href="#"><span class="rlab-stop">停止</span></a></td></tr>'
							+ '</table></fieldset>'
							+ '</td></tr><tr><td>'
							+ '<table width="100%"><tr><td>'
							+ '<fieldset><legend><label>寄存器操作</label></legend><table width="100%">'
							+ '<tr><td><a href="#"><span class="rlab-getRegs">加载寄存器</span></a></td>'
							+ '<td><a href="#"><span class="rlab-setRegs">修改寄存器</span></a></td></tr>'
							+ '</table></fieldset>'
							+ '</td><td>'
							+ '<fieldset><legend><label>内存操作</label></legend><table width="100%">'
							+ '<tr><td><div style="position:relative;top:0"><ul class="rlab-setAllMemory"></ul></div></td>'
							+ '<td><a href="#"><span class="rlab-getAllMemory">上传所有内存</span></a></td></tr>'
							+ '</table></fieldset>'
							+ '</td></tr></table>'
							+ '</td></tr><tr><td>'
							+ '<table width="100%"><tr><td>&nbsp;</td><td>&nbsp;</td></tr></table>'
							+ '</td></tr>'
							+ '</table></fieldset>'
							+ '</td><td>'
							+ '<fieldset><legend><label>观察窗口</label></legend><table>'
							+ '<tr><td><table><tr><td>'
							+ '<fieldset><legend><label>特殊寄存器</label></legend><table>'
							+ '<tr><td><label>标志位</label></td><td>C: Z: V: S:</td></tr>'
							+ '<tr><td>&nbsp;</td><td>'
							+ '<input id="flag_c" type="text" value="0" size="1" maxlength="1"/>'
							+ '<input id="flag_z" type="text" value="0" size="1" maxlength="1"/>'
							+ '<input id="flag_v" type="text" value="0" size="1" maxlength="1"/>'
							+ '<input id="flag_s" type="text" value="0" size="1" maxlength="1"/>'
							+ '</td></tr>'
							+ '<tr><td><label>状态寄存器</label></td><td><input id="reg250" type="text" readonly="readonly" /></td></tr>'
							+ '<tr><td>&nbsp;</td><td><label>=reg[250],用户输出</label></td></tr>'
							+ '<tr><td><label>PC寄存器</label></td><td><input id="reg251" type="text" readonly="readonly" /></td></tr>'
							+ '<tr><td>&nbsp;</td><td><label>=reg[251],用户输出</label></td></tr>'
							+ '<tr><td><label>IF寄存器</label></td><td><input id="reg252" type="text" readonly="readonly" /></td></tr>'
							+ '<tr><td>&nbsp;</td><td><label>=reg[252],用户输出</label></td></tr>'
							+ '</table></fieldset>'
							+ '</td></tr><tr><td>&nbsp;</td></tr>'
							+ '</table></td></tr><tr><td>'
							+ '<table><tr><td><label>内存地址线</label></td><td><input name="text" type="text" id="reg253" readonly="readonly" /></td></tr>'
							+ '<tr><td>&nbsp;</td><td><label>=reg[253],自动读取</label></td></tr>'
							+ '<tr><td><label>内存数据线</label></td><td><input id="reg254" type="text" readonly="readonly" /></td></tr>'
							+ '<tr><td>&nbsp;</td><td><label>=reg[254],自动读取</label></td></tr>'
							+ '<tr><td><label>实验状态</label></td><td><input id="reg255" type="text" readonly="readonly" /></td></tr>'
							+ '<tr><td>&nbsp;</td><td><label>=reg[255],自动读取</label></td></tr></table>'
							+ '</td></tr></table></fieldset>'
							+ '</td></tr></table>'
							+ '<fieldset><legend><label>调试窗口</label></legend>'
							+ '<table width="95%"><tr valign="top"><td><div id="debug_panel" width="100%"></div></td></tr>'
							+ '<tr><td align="right"><a href="#"><span class="rlab-generateCode">生成调试代码</span></a></td></tr></table>'
							+ '</fieldset></div>',
					initRow : null,
					emptyRow : null,
					reader : null,
					colModel : null,
					init : function() {
						var me = this;
						
						RLab.Experiment.caexp.superclass.init.call(this);
						this.reg = new Array(256);
						for ( var i = 0; i < 256; i++) {
							this.reg[i] = i;
						}
						Ext.Ajax.request( {
							url : 'getCpuVariables',
							method : 'post',
							async : false,
							params : {
								'cpu.experimentName' : me.name
							},
							callback : (function(options, success, response) {
								var r = Ext.decode(response.responseText);
								me.cpu = r.cpu;
							}).createInterceptor(RLab.Callback)
						});
						var data = new Array();
						if (Ext.isEmpty(me.cpu.variables)) {
							data = me.initRow;
						} else {
							data = Ext.decode(me.cpu.variables);
						}
						var ds = new Ext.data.Store( {
							reader : me.reader,
							data : data
						});

						var view = new Ext.grid.GridView( {
							forceFit : true
						});

						me.grid = new RLab.Grid( {
							renderTo : Ext.get("debug_panel"),
							height : 180,
							ds : ds,
							cm : me.colModel,
							view : view
						});

						me.assignCellValue();// data is old from database of
												// server

						me.grid.on("afteredit", me.afterEdit, me);
					// ds.load();
				},
				afterEdit : function() {
					this.clearEmptyRow();
					var grid = this.grid;

					var records = grid.store.getRange();
					var index = records.length - 1;
					if (index >= 0 && !this.isEmptyRow(records[index].data)) {
						var RecordType = grid.store.recordType;
						var row = Ext.apply( {}, this.emptyRow);
						var record = new RecordType(row);
						grid.store.insert(grid.store.getCount(), record);
					}
					this.assignCellValue();
					grid.syncSize();
					this.syncCpuVariables(); //save to server
				},
				clearEmptyRow : function() {
					// clear all empty rows except the last one
					var records = this.grid.store.getRange();
					var record;
					var i, len = records.length;
					for (i = len - 2; i >= 0; i--) {
						record = records[i];
						if (this.isEmptyRow(record.data) == true) {
							this.grid.store.remove(record);
						}
					}
				},
				isEmptyRow : function(data) {
					var columns = this.grid.getView().getColumnData();
					var emptyFlag = true;
					var j;
					for (j = 0; j < columns.length; j++) {
						if (!Ext.isEmpty(data[columns[j].name][0])) {
							emptyFlag = false;
							break;
						}
					}
					return emptyFlag;
				},
				syncCpuVariables : function() {
					var me = this;
					var records = me.grid.store.getRange();
					var columns = this.grid.getView().getColumnData();
					var cv = new Array();
					var row;
					var i, j, len = records.length;
					for(i = 0; i < len; i++){
						row = new Array();
						for (j = 0; j < columns.length; j++) {
							row.push(records[i].data[columns[j].name])
						}
						cv.push(row);
					}

					Ext.Ajax.request( {
						url : 'saveCpuVariables',
						method : 'post',
						async : false,
						params : {
							'cpu.id' : me.cpu.id,
							'cpu.experimentName' : me.name,
							'cpu.variables' : Ext.encode(cv)
						},
						callback : (function(options, success, response) {
						}).createInterceptor(RLab.Callback)
					});
				},
				assignCellValue : function() {
					var store = this.grid.store;
					var columns = this.grid.getView().getColumnData();
					var records = store.getRange();
					var i, j;
					var pair;
					var rowCount = records.length, colCount = columns.length;
					var regCount = 0;
					for (i = 0; i < colCount; i++) {
						for (j = 0; j < rowCount; j++) {
							pair = records[j].data[columns[i].name];
							if (!Ext.isEmpty(pair[0])) {
								pair[1] = this.reg[regCount++];
							}
						}
					}
					store.fireEvent('datachanged', store);
				},
				onClick : function(e){
					var el;
					if ((el = e.getTarget('.rlab-generateCode')) != null) {
						this.generateCode();
					}
					RLab.Experiment.caexp.superclass.onClick.call(this, e);
				},
				generateCode : function(){
					var to2String = function( x){
					    var x1 = [0,0,0,0,0,0,0,0,0,0,0,0,0];
					    var i=12;
					    while (x>0)
					    {
					       x1[i]=x % 2;
					       x=x>>1;
					       i--;
					    }
					    return x1.join('');
					}	
					var code = new Array();
					
					code.push('FPGAC_FPGAE_RegReset : in std_logic; -- pin 126');
					code.push('FPGAC_FPGAE_RegCLK : in std_logic;   -- pin 31');
					code.push('FPGAC_FPGAE_Reg1 : out std_logic;    -- pin 125');
					code.push('<br/>');
				    code.push("process (FPGAC_FPGAE_RegReset, FPGAC_FPGAE_RegCLK)");
				    code.push("&nbsp&nbspvariable regstate: std_logic_vector(12 downto 0);");
				    code.push("begin");
				    code.push("&nbsp&nbspif FPGAC_FPGAE_RegReset = '0' then");
				    code.push("&nbsp&nbsp&nbsp&nbspregstate := (others => '0');");
				    code.push("&nbsp&nbspelsif (FPGAC_FPGAE_RegCLK'event and FPGAC_FPGAE_RegCLK = '1')then");
				    code.push("&nbsp&nbsp&nbsp&nbspregstate := regstate + '1';");
				    
					var columns = this.grid.getView().getColumnData();
					var records = this.grid.store.getRange();
					var i, j, k;
					var pair;
					var rowCount = records.length, colCount = columns.length;
					var regIndex = 0;
					var name, width;
					var start, end;
					for (i = 0; i < colCount; i++) {
						for (j = 0; j < rowCount; j++) {
							pair = records[j].data[columns[i].name];
							if (!Ext.isEmpty(pair[0])) {
								k = pair[0].indexOf('(');
								if (k == -1){
									name = pair[0];
									width = 32;
								}else{
									name = pair[0].substring(0, k);
									width = pair[0].substring(k + 1, pair[0].indexOf(')'));
								}
								width = parseInt(width);
								start = to2String(regIndex * 32);
								end = to2String(regIndex * 32 + width);
								if(regIndex == 0){
									code.push('&nbsp&nbsp&nbsp&nbspif (regstate < "' + end + '") and (regstate >= "'+ start + '") then');
								}else if(regIndex == 255){
									code.push('&nbsp&nbsp&nbsp&nbspelsif (regstate >= "'+ start + '") then');
								}else {
									code.push('&nbsp&nbsp&nbsp&nbspelsif (regstate < "' + end + '") and (regstate >= "'+ start + '") then');
								}
								if(width > 1){
									code.push('&nbsp&nbsp&nbsp&nbsp&nbsp&nbspFPGAC_FPGAE_Reg1 <= ' + name + '(conv_integer(regstate - "'+ start + '"));');	
								}else{
									code.push('&nbsp&nbsp&nbsp&nbsp&nbsp&nbspFPGAC_FPGAE_Reg1 <= ' + name + ';');
								}
								regIndex += ((width -1)>>5) + 1;
							}
						}
					}
					if(regIndex > 0){
						code.push("&nbsp&nbsp&nbsp&nbspelse");
						code.push("&nbsp&nbsp&nbsp&nbsp&nbsp&nbspFPGAC_FPGAE_Reg1 <= '0';");
						code.push("&nbsp&nbsp&nbsp&nbspend if;");
					}
				    code.push("&nbsp&nbspend if;");
				    code.push("end process;");	  
				    
				    var codeWin = window.open('','','status=no,toolbar=no,location=no,menubar=no');
				    //second parameter never use otherwise bug under IE
				    if(!codeWin){
				    	alert("请不要启用弹出式窗口拦截");
				    }else{
				    	codeWin.document.write(code.join('<br/>'));
				    }
				},
				destroy : function(){
					this.grid.destroy();
					delete this.grid;
					RLab.Experiment.caexp.superclass.destroy.call(this);
					
				}
			});

RLab.Experiment.caexp1 = Ext.extend(RLab.Experiment.caexp, {
	init : function(){
		this.initRow = [['','']];
		this.emptyRow = {variables : [ '', '' ]};
		this.reader = new Ext.data.ArrayReader( {}, ['variables']);
		this.colModel = new Ext.grid.ColumnModel({
			columns : [ new RLab.Grid.Column( {
				header : RLab.Lang['variables'],
				dataIndex : 'variables',
				editor : new Ext.form.TextField()
			})],
			defaults : {
				sortable : false,
				menuDisabled : true,
				isColumn : true
			}
		});
		RLab.Experiment.caexp1.superclass.init.call(this);
	}
});
RLab.Experiment.caexp2 = Ext.extend(RLab.Experiment.caexp, {
	init : function(){
		this.initRow = [[[ '', '' ],[ '', '' ],[ '', '' ],[ '', '' ],[ '', '' ],[ '', '' ]]];
		this.emptyRow = {
			first : [ '', '' ],
			second : [ '', '' ],
			third : [ '', '' ],
			fourth : [ '', '' ],
			fifth : [ '', '' ],
			other : [ '', '' ]
		};
		this.reader = new Ext.data.ArrayReader( {}, ['first', 'second','third', 'fourth', 'fifth', 'other']);
		this.colModel =  new Ext.grid.ColumnModel({
			columns : [ new RLab.Grid.Column( {
				header : RLab.Lang['firstPhase'],
				dataIndex : 'first',
				editor : new Ext.form.TextField()
			}), new RLab.Grid.Column( {
				header : RLab.Lang['secondPhase'],
				dataIndex : 'second',
				editor : new Ext.form.TextField()
			}), new RLab.Grid.Column( {
				header : RLab.Lang['thirdPhase'],
				dataIndex : 'third',
				editor : new Ext.form.TextField()
			}), new RLab.Grid.Column( {
				header : RLab.Lang['fourthPhase'],
				dataIndex : 'fourth',
				editor : new Ext.form.TextField()
			}), new RLab.Grid.Column( {
				header : RLab.Lang['fifthPhase'],
				dataIndex : 'fifth',
				editor : new Ext.form.TextField()
			}), new RLab.Grid.Column( {
				header : RLab.Lang['other'],
				dataIndex : 'other',
				editor : new Ext.form.TextField()
			}) ],
			defaults : {
				sortable : false,
				menuDisabled : true,
				width : 110,
				isColumn : true
			}
		});
		RLab.Experiment.caexp1.superclass.init.call(this);
	}
});
RLab.Experiment.caexp3 = RLab.Experiment.caexp2;
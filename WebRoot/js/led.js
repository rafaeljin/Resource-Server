RLab.LedPanel = function(config){
	config = config || {};
	Ext.apply(this, config);
	var dsTpl = new Ext.Template('<div id="ds_{index}" class="ds-unit" align="center"><table width="90"><tr><td colspan="3">DS{index}</td></tr>'+
		'<tr><td width="10" height="10"></td><td width="65" class="ds-2"></td><td width="10"></td></tr>'+
		'<tr><td height="65" class="ds-4"></td><td></td><td class="ds-0"></td></tr>'+
		'<tr><td height="10"></td><td class="ds-6"></td><td></td></tr>'+
		'<tr><td height="65" class="ds-5"></td><td></td><td class="ds-1"></td></tr>'+
		'<tr><td height="10"></td><td class="ds-3"></td><td></td></tr>'+
		'</table></div>');
	var faTpl = new Ext.Template('<div id="fa_{index}" class="fa-unit" align="center"><table width="128" border="0">'+
			'<tr><td colspan="8">FA{index}</td></tr><tr>'+
			'<td class="led-7" width="16" height="16"></td><td class="led-6" width="16" height="16"></td>'+
			'<td class="led-5" width="16" height="16"></td><td class="led-4" width="16" height="16"></td>'+
			'<td class="led-3" width="16" height="16"></td><td class="led-2" width="16" height="16"></td>'+
			'<td class="led-1" width="16" height="16"></td><td class="led-0" width="16" height="16"></td></tr></table></div>');
	var displayPanel = Ext.get("displayPanel");
	var dsPanel = displayPanel.insertHtml("afterBegin", '<div id="dsPanel"><table width="960"><tr></tr></table></div>', true);
	var index;
	var tr, td;
	tr = dsPanel.child('tr');
	for(index = 1; index <= 8; index++){
		td = document.createElement('td');
		td = Ext.get(td);
		dsTpl.append(td, {'index':index});
		tr.appendChild(td);
	}
	var faPanel = displayPanel.insertHtml("beforeEnd", '<div id="faPanel"><table width="960"><tr></tr></table></div>', true);
	tr = faPanel.child('tr');
	for(index = 1; index <= 7; index++){
		td = document.createElement('td');
		td = Ext.get(td);
		faTpl.append(td, {'index':index});
		tr.appendChild(td);
	}
	this.change(0, 0);
	
}
RLab.LedPanel.prototype = {
	change : function(addr, data){
		var i, tv;
		//first change led-fa
		tv = data;
		//alert(data);
		for(i = 7; i >= 4; i--){
			this.changeFA(i, tv & 0xFF);
			tv = tv >> 8;
		}
		tv = addr;
		for(i = 3; i >= 1; i--){
			this.changeFA(i, tv & 0xFF);
			tv = tv >> 8;
		}
		//chnage ds
		tv = data;
		for(i = 8; i >= 5; i--){
			this.changeDS(i, tv & 0x7F);
			tv = tv >> 7;
		}
		tv = (addr<< 4) | ((data>>28) & 0xF);
		for(i = 4; i >= 1; i--){
			this.changeDS(i, tv & 0x7F);
			tv = tv >> 7;
		}
	},
	changeFA : function(index, value){
		var el = Ext.get("fa_" + index);
		var child;
		for(var i = 0; i < 8; i++){
			child = el.child(".led-" + i, true);
			if((value & 1) == 1)
				child.style.backgroundImage = 'url(images/led-on.png)';
			else
				child.style.backgroundImage = 'url(images/led-off.png)';
			value = value >> 1;
		}
	},
	changeDS : function(index, value){
		var el = Ext.get("ds_" + index);
		var child;
		for(var i = 0; i < 7; i++){
			child = el.child(".ds-" + i, true);
			if((value & 1) == 1)
				child.style.backgroundColor = '#FF0000';
			else
				child.style.backgroundColor = '#666666';
			value = value >> 1;
		}
	}
}
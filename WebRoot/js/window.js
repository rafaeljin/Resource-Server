RLab.Window = Ext.extend(RLab.Component,
				{
					height : 0,
					width : 0,
					title : '',
					html : '',
					init : function() {
						var me = this;
						var tplStr = '<div id="{id}_Window" class="window" style="position:absolute;background-color:#FFFFFF;display:none;z-Index:21000">' 
							+ '<div id="{id}_Header" class="window-header"><span id="{id}_Title" class="window-header-title">&nbsp;{title}</span><div id="{id}_Close" class="x-tool x-tool-close"></div></div>'
							+ '<div id="{id}_ToolBar" class="window-toolbar"></div>' 
							+ '<div id="{id}_Body" align="center" class="window-body"></div>'
							+ '</div>';
						var tpl = new Ext.XTemplate(tplStr);
						tpl.append(Ext.getBody(), this);
						delete tplStr;
						delete tpl;
						this.el = Ext.get(this.id+"_Window");
						this.setSize(this.width, this.height);
						var x = Math.floor((this.getBrowserWidth() - this.width)/2);
						var y = Math.floor((this.getBrowserHeight()-this.height)/2);
						x = x < 0 ? 0 : x;
						y = y < 0 ? 0 : y;
						this.setPosition(x, y);
						
						if(this.mask == true){
							this.maskEl = document.createElement('div');
							this.maskEl = Ext.get(this.maskEl);
							this.maskEl.addClass('rlab-mask');
							this.maskEl.appendTo(Ext.getBody());
						}else{
							this.dragMgr = RLab.DragMgr;
							Ext.EventManager.on(this.id+"_Header", "mousedown", this.handleDrag, this);
						}
						Ext.EventManager.on(this.id+'_Close', 'click', this.close, this);
						this.body = Ext.get(this.id+"_Body");
						if(this.html){
							this.body.insertHtml('afterBegin',this.html);
							if(this.isForm){
								this.body.child('.rlab-clicktosubmit').on('click', this.onSubmit, this);
							}
						}
							
					},
					onGetSelectOptions : function(result){
						var r = Ext.decode(result.responseText);
					},
					onSubmit : function(){
						var me = this;
						if(me.beforeSubmit){
							if(me.beforeSubmit.handler.call(me.beforeSubmit.scope, this)== false)
								return;
						}
						Ext.Ajax.request({
							form : me.body.child('form', true),
							url : me.url,
							method : 'post',
							callback : (function(result){
							//TODO
								me.body.child('form', true).reset();
								me.close();
								alert('Success (cmttd1)');
							}).createInterceptor(RLab.Callback)
						});
					},
					show : function(){
						var me = this;
						me.el.show();
						if(me.mask)
							me.maskEl.show();
							
						if(me.html&& me.isForm && me.selects){
							Ext.each(me.selects, function(select){
								Ext.Ajax.request({
									url : select.url,
									method : 'post',
									success : function(result){
										var r = Ext.decode(result.responseText);
										select.handler.call(select.scope, me.body.child(select.name, true), r);
									},
									failure : function(){}
								});
							});					
						}
					},
					hide : function(){
						this.el.hide();
					},
					close : function(){
					//	if(this.closeAction == 'hide'){
							this.el.hide();
							if(this.mask){
								this.maskEl.hide();
							}
					//	}
					},
					setPosition : function(left, top){
						this.el.setLeftTop(left, top);
					},
					setSize : function(width, height){
						this.el.setSize(width, height);
					},
					handleDrag : function(e) {
						this.dragMgr.handleMouseDown(e, this.el);
					},
					destroy : function(){
						this.purgeListeners();
						this.el.remove();
						this.body.remove();
					}
				});

RLab.WindowMgr = function() {
	var list = {};
	var accessList = [];
	var front = null;
	// private
	var sortWindows = function(d1, d2) {
		return (!d1._lastAccess || d1._lastAccess < d2._lastAccess) ? -1 : 1;
	};

	// private
	var orderWindows = function() {
		var a = accessList, len = a.length;
		if (len > 0) {
			a.sort(sortWindows);
			var seed = a[0].manager.zseed;
			for ( var i = 0; i < len; i++) {
				var win = a[i];
				if (win && !win.hidden) {
					win.setZIndex(seed + (i * 10));
				}
			}
		}
		activateLast();
	};

	// private
	var setActiveWin = function(win) {
		if (win != front) {
			if (front) {
				front.setActive(false);
			}
			front = win;
			if (win) {
				win.setActive(true);
			}
		}
	};

	// private
	var activateLast = function() {
		for ( var i = accessList.length - 1; i >= 0; --i) {
			if (!accessList[i].hidden) {
				setActiveWin(accessList[i]);
				return;
			}
		}
		// none to activate
		setActiveWin(null);
	};

	return {

		zseed : 9000,

		register : function(win) {
			if (win.manager) {
				win.manager.unregister(win);
			}
			win.manager = this;

			list[win.id] = win;
			accessList.push(win);
			win.on('hide', activateLast);
		},

		unregister : function(win) {
			delete win.manager;
			delete list[win.id];
			win.un('hide', activateLast);
			accessList.remove(win);
		},

		/**
		 * Gets a registered window by id.
		 * 
		 * @param {String/Object}
		 *            id The id of the window or a {@link Ext.Window} instance
		 * @return {Ext.Window}
		 */
		get : function(id) {
			return typeof id == "object" ? id : list[id];
		},

		/**
		 * Brings the specified window to the front of any other active windows
		 * in this WindowGroup.
		 * 
		 * @param {String/Object}
		 *            win The id of the window or a {@link Ext.Window} instance
		 * @return {Boolean} True if the dialog was brought to the front, else
		 *         false if it was already in front
		 */
		bringToFront : function(win) {
			win = this.get(win);
			if (win != front) {
				win._lastAccess = new Date().getTime();
				orderWindows();
				return true;
			}
			return false;
		},

		/**
		 * Sends the specified window to the back of other active windows in
		 * this WindowGroup.
		 * 
		 * @param {String/Object}
		 *            win The id of the window or a {@link Ext.Window} instance
		 * @return {Ext.Window} The window
		 */
		sendToBack : function(win) {
			win = this.get(win);
			win._lastAccess = -(new Date().getTime());
			orderWindows();
			return win;
		},

		/**
		 * Hides all windows in this WindowGroup.
		 */
		hideAll : function() {
			for ( var id in list) {
				if (list[id] && typeof list[id] != "function"
						&& list[id].isVisible()) {
					list[id].hide();
				}
			}
		},

		/**
		 * Gets the currently-active window in this WindowGroup.
		 * 
		 * @return {Ext.Window} The active window
		 */
		getActive : function() {
			return front;
		},

		/**
		 * Returns zero or more windows in this WindowGroup using the custom
		 * search function passed to this method. The function should accept a
		 * single {@link Ext.Window} reference as its only argument and should
		 * return true if the window matches the search criteria, otherwise it
		 * should return false.
		 * 
		 * @param {Function}
		 *            fn The search function
		 * @param {Object}
		 *            scope (optional) The scope (<code>this</code>
		 *            reference) in which the function is executed. Defaults to
		 *            the Window being tested. that gets passed to the function
		 *            if not specified)
		 * @return {Array} An array of zero or more matching windows
		 */
		getBy : function(fn, scope) {
			var r = [];
			for ( var i = accessList.length - 1; i >= 0; --i) {
				var win = accessList[i];
				if (fn.call(scope || win, win) !== false) {
					r.push(win);
				}
			}
			return r;
		},

		/**
		 * Executes the specified function once for every window in this
		 * WindowGroup, passing each window as the only parameter. Returning
		 * false from the function will stop the iteration.
		 * 
		 * @param {Function}
		 *            fn The function to execute for each item
		 * @param {Object}
		 *            scope (optional) The scope (<code>this</code>
		 *            reference) in which the function is executed. Defaults to
		 *            the current Window in the iteration.
		 */
		each : function(fn, scope) {
			for ( var id in list) {
				if (list[id] && typeof list[id] != "function") {
					if (fn.call(scope || list[id], list[id]) === false) {
						return;
					}
				}
			}
		}
	};
};
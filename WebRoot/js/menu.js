Ext.Element.addMethods( {
	setInnerText : function(str) {
		if (Ext.isGecko) {
			this.dom.textContent = str;
		} else {
			this.dom.innerText = str;
		}
	}
});
RLab.Component = function(config) {
	config = config || {};
	Ext.apply(this, config);
	RLab.Component.superclass.constructor.call(this);
	this.addEvents('show', 'hide');
	this.getId();
	this.init();
}
RLab.Component.AUTO_ID = 1000;
Ext.extend(RLab.Component,
				Ext.util.Observable,
				{
					getId : function() {
						return this.id
								|| (this.id = 'rlab-comp-' + (++RLab.Component.AUTO_ID));
					},
					getEl : function() {
						return this.el;
					},
					getBrowserWidth : function() {
						var de = document.documentElement;
						return window.innerWidth || (de && de.clientWidth)
								|| document.body.clientWidth;
					},
					getBrowserHeight : function() {
						var de = document.documentElement;
						return window.innerHeight || (de && de.clientHeight)
								|| document.body.clientHeight;
					}
				});

RLab.Button = Ext
		.extend(
				RLab.Component,
				{
					disabled : false,

					activeClass : '',
					disabledClass : '',

					subMenuPos : 'tl-tr?',
					width : 150,

					handler : null,

					parentMenu : null, // the menu this item belong to

					menu : null, // the menu when click on this item which
									// should be expanded

					window : null, // the window when click on this item which
									// should be opened

					init : function() {
						var me = this;
						me.addEvents('click', 'activate', 'deactivate');

						me.btnTpl = new Ext.XTemplate(
								'<li id="{id}"><a href="#">{text}</a></li>');
						if (!me.parentMenu) // show that me object is just a
											// button ,
						{
							me.el = me.btnTpl.append(me.renderTo, me);
							me.el = Ext.get(me.el);
							me.el.on('click', me.onClick, me);
							me.subMenuPos = 'bl';
						} else {

							me.el = me.btnTpl.append(me.parentMenu.ul, me);
							me.el = Ext.get(me.el);
						}
						me.el.setWidth(me.width);
						
						me.el.on('mouseover', me.activate, me);
						me.el.on('mouseout', me.deactivate, me);

						if (me.href) {
							var a = me.el.child('a', true);
							a.href = me.href;
						}
						if (me.handler && me.type != 'file') {
							me.on("click", me.handler, me.scope || me);// managered
																		// by
																		// observable
						} else if (me.handler && me.type == 'file') {
							// form for submit
							me.form = me.el.createChild( {
								tag : 'form',
								enctype : "multipart/form-data"
							});
							me.form.setLeftTop(0, 0);

							me.fileInput = me.form
									.createChild( {
										id : me.getFileInputId(),
										name : 'upload', // the same as the
															// name in the
															// action
										style : 'position:absolute;right:0;-moz-opacity:0;filter:alpha(opacity:0);opacity:0;z-index:31002',
										tag : 'input',
										type : 'file'
									});
							// me.fileInput.setWidth(me.el.getWidth());
							me.fileInput.setLeftTop(0, 0);
							me.fileInput.alignTo(me.el, 'r-r');
							var size = me.el.getSize();
							me.fileInput.setSize(me.el.getSize());

							me.addEvents('fileselected');
							me.on('fileselected', me.onFileSelected, me);

							me.fileInput.on('change', function() {
								me.fireEvent('fileselected', me,
										me.fileInput.dom.value);
							}, me);

						}

						if (me.disabled == true) {
							me.disable();
						}
					},
					onFileSelected : function(scope, filePath) {
						// just for file button
						if(scope.fileType && !filePath.match(scope.fileType+"$")){
							alert("File Type Error");
							return;
						}
						var me = this;
						Ext.Ajax.request( {
							form : me.form.dom,
							url : this.url,
							method : 'post',
							isUpload : true,
							success : function(result) {
								var responseText = result.responseText.replace(
										/^<pre[^>]*>/, '').replace(/<\/pre>$/,
										'');
								var response = Ext.decode(responseText);
								if(response.success == true)
									me.handler.call(me.scope || me, response, me);
								else
									alert("Upload Error");
							},
							failure : function(response) {
								alert("Upload Error");
							}
						});
						// very important
						me.form.dom.reset();
					},
					getFileInputId : function() {
						return this.id + '-file';
					},
					// private
					onClick : function(e) {
						if (!this.disabled
								&& this.fireEvent("click", this, e) !== false
								&& (this.parentMenu && this.parentMenu
										.fireEvent("itemclick", this, e) !== false)) {
							this.handleClick(e);
						} else if (!this.parentMenu) {// it's a button
							this.expandMenu();
						} else {
							e.stopEvent();
						}
					},
					// private
					activate : function(autoExpand) {
						if (this.disabled) {
							return false;
						}
						var li = this.el;
						li.addClass(this.activeClass);
						this.region = li.getRegion().adjust(2, 2, -2, -2);
						if (autoExpand)
							this.expandMenu();

						this.fireEvent("activate", this);
						return true;
					},

					// private
					deactivate : function() {
						this.el.removeClass(this.activeClass);
						this.fireEvent("deactivate", this);
						if (this.parentMenu)
							this.hideMenu();
					},

					// private
					shouldDeactivate : function(e) {
						if (!this.region || !this.region.contains(e.getPoint())) {
							if (this.menu && this.menu.isVisible()) {
								return !this.menu.getEl().getRegion().contains(
										e.getPoint());
							}
							return true;
						}
						return false;
					},

					// private
					handleClick : function(e) {

						if (this.window)
							this.window.show();
					},
					// private
					expandMenu : function() {
						if (!this.disabled && this.menu) {
							if (!this.menu.isVisible()) {
								this.menu.show(this.el, this.subMenuPos,
										this.parentMenu);
							}
						}
					},

					// private
					hideMenu : function() {
						if (this.menu && this.menu.isVisible()) {
							if (this.menu.over) {
								this.parentMenu.setActiveItem(this, false);
							} else {
								this.menu.hide();
							}
						}
					},
					enable : function() {
						this.disabled = false;
						this.el.dom.disabled = false;
						if (!Ext.isIE6) {
							this.el.removeClass('x-item-disabled');
						}
					},
					disable : function() {
						this.disabled = true;
						this.el.dom.disabled = true;
						if (!Ext.isIE6) {
							this.el.addClass('x-item-disabled');
						}
					}
				});



RLab.ToolBar = Ext.extend(RLab.Component, {
					init : function() {
						//var tpl = new Ext.XTemplate('<div id="{id}" align="{align}"><table border="0" cellpadding="0" cellspacing="0"><tbody><tr></tr></tbody></table></div>');
						//this.el = tpl.append(this.renderTo || Ext.getBody(),this);
						//this.el = Ext.get(this.el);
						//var tr = this.el.child('tr');
						this.el = document.createElement('ul');
						this.el = Ext.get(this.el);
						this.renderTo.appendChild(this.el);
						for ( var i = 0; i < this.items.length; i++) {
							// fuck ie
							//var td = document.createElement('td');
							// var td = tr.createChild({tag:'td'}); it's lead to
							// crack in ie6
							//td = Ext.get(td);
							//tr.appendChild(td);

							Ext.apply(this.items[i], {
								renderTo : this.el
							});

							new RLab.Button(this.items[i]);
							// td.appendChild(this.items[i].getEl());
						}
					}
				});
RLab.Menu = Ext.extend(RLab.Component, {
	minWidth : 120,
	zIndex : 15000,
	hidden : true,
	parentMenu : null,
	activeChild : null, // menu
	activeItem : null, // item
	allowOtherMenus : false,
	init : function() {
		this.addEvents('beforeshow', 'show', 'beforehide', 'hide', 'click',
				'mouseover', 'mouseout');

		this.el = document.createElement("div");
		this.el = Ext.get(this.el);
		this.id = this.el.id;
		Ext.getBody().appendChild(this.el);
		this.el.hide();
		this.el.setStyle( {
			position : 'absolute',
			minWidth : this.minWidth,
			zIndex : this.zIndex
		});
		// this.el.setWidth(100);
		this.el.addClass('rlab-menu'); // mgr to identify

		this.ul = document.createElement("ul");
		this.ul = Ext.get(this.ul);
		this.el.appendChild(this.ul);
		this.el.on('click', this.onClick, this);
		this.el.on('mouseover', this.onMouseOver, this);
		this.el.on('mouseout', this.onMouseOut, this);

		var t = new Ext.util.MixedCollection();
		for ( var i = 0; i < this.items.length; i++) {
			Ext.apply(this.items[i], {
				parentMenu : this
			});
			mi = new RLab.Button(this.items[i]);
			t.add(mi.getId(), mi);
			this.ul.appendChild(mi.getEl());
		}
		delete this.items;
		this.items = t;

		RLab.MenuMgr.register(this);
	},
	isVisible : function() {
		return !this.hidden;
	},
	show : function() {
		this.fireEvent("beforeshow", this);
		this.el.show();
		this.fireEvent("show", this);
	},
	show : function(el, pos, parentMenu) {
		if (this.fireEvent('beforeshow', this) !== false) {
			this.parentMenu = parentMenu;
			xy = this.el.adjustForConstraints(this.el.getAlignToXY(el, pos, [
					0, 0 ]));
			this.el.setXY(xy);
			this.el.show();
			if (Ext.isIE) {
				// TODO
				// internal event, used so we don't couple the layout to the
				// menu
				// this.fireEvent('autosize', this);
				if (!Ext.isIE8) {
					this.el.repaint();
				}
			}
			this.hidden = false;
			this.fireEvent('show', this);
		}
	},
	hide : function() {
		this.fireEvent("beforehide", this);
		this.el.hide();
		this.hidden = true;
		this.fireEvent("hide", this);
	},

	findTargetItem : function(e) {
		var t = e.getTarget('li', this.ul, true);
		if (t && t.id) {
			return this.items.get(t.id);
		}
	},

	// private
	onClick : function(e) {
		var t = this.findTargetItem(e);
		if (t) {
			if (t instanceof RLab.Button) {
				if (t.menu && this.ignoreParentClicks) {
					// TODO to delete
					t.expandMenu();
					e.preventDefault();
				} else if (t.onClick) {
					t.onClick(e);
					this.fireEvent('click', this, t, e);
				}
			}
		}
	},

	// private
	setActiveItem : function(item, autoExpand) {
		if (item != this.activeItem) {
			this.deactivateActive();
			this.activeItem = item;
			item.activate(autoExpand);

		} else if (autoExpand) {
			item.expandMenu();
		}
	},

	deactivateActive : function() {
		var a = this.activeItem;
		if (a) {
			a.deactivate();
			delete this.activeItem;
		}
	},
	// private
	onMouseOver : function(e) {
		var t = this.findTargetItem(e);
		if (t) {
			if (!t.disabled) {
				this.setActiveItem(t, true);
			}
		}
		this.over = true;
		this.fireEvent('mouseover', this, e, t);
	},

	// private
	onMouseOut : function(e) {
		var t = this.findTargetItem(e);
		if (t) {
			if (t == this.activeItem && t.shouldDeactivate
					&& t.shouldDeactivate(e)) {
				this.activeItem.deactivate();
				delete this.activeItem;
			}
		}
		this.over = false;
		this.fireEvent('mouseout', this, e, t);
	},
	disableItem : function(name) {
		this.items.each(function(item) {
			if (item.name == name) {
				item.disable();
				return false;
			}
		});
	},
	enableItem : function(name) {
		this.items.each(function(item) {
			if (item.name == name) {
				item.enable();
				return false;
			}
		});
	}

});
RLab.MenuMgr = function() {
	var menus = {};
	var active = new Ext.util.MixedCollection();
	var attached = false, lastShow = new Date();
	// private
	function hideAll() {
		if (active && active.length > 0) {
			var c = active.clone();
			c.each(function(m) {
				m.hide();
			});
			return true;
		}
		return false;
	}

	// private
	function onBeforeHide(m) {
		if (m.activeChild) {
			m.activeChild.hide();
		}
	}

	// private
	function onHide(m) {
		active.remove(m);
		if (active.length < 1) {
			Ext.getDoc().un("mousedown", onMouseDown);
			attached = false;
		}
	}
	// private
	function onBeforeShow(m) {
		var pm = m.parentMenu;
		if (!pm && !m.allowOtherMenus) {
			hideAll();
		} else if (pm && pm.activeChild) {
			pm.activeChild.hide();
		}
	}

	// private
	function onShow(m) {
		var last = active.last();
		lastShow = new Date();
		active.add(m);
		if (!attached) {
			Ext.getDoc().on("mousedown", onMouseDown);
			attached = true;
		}
		if (m.parentMenu) {
			m.getEl().setStyle('z-index',
					parseInt(m.parentMenu.getEl().getStyle("z-index"), 10) + 3);
			m.parentMenu.activeChild = m;
		} else if (last && !last.isDestroyed && last.isVisible()) {
			m.getEl().setstyle('z-index',
					parseInt(last.getEl().getStyle("z-index"), 10) + 3);
		}
	}
	// private
	function onMouseDown(e) {
		if (lastShow.getElapsed() > 50 && active.length > 0
				&& !e.getTarget(".rlab-menu")) {
			hideAll();
		}
	}

	return {

		hideAll : function() {
			return hideAll();
		},

		// private
		register : function(menu) {
			menus[menu.id] = menu;
			menu.on( {
				beforehide : onBeforeHide,
				hide : onHide,
				beforeshow : onBeforeShow,
				show : onShow
			});
		},

		/**
		 * Returns a {@link Ext.menu.Menu} object
		 * 
		 * @param {String/Object}
		 *            menu The string menu id, an existing menu object
		 *            reference, or a Menu config that will be used to generate
		 *            and return a new Menu instance.
		 * @return {Ext.menu.Menu} The specified menu, or null if none are found
		 */
		get : function(menu) {
			if (typeof menu == "string") { // menu id
			if (!menus) { // not initialized, no menus to return
			return null;
		}
		return menus[menu];
	} else if (menu.events) { // menu instance
		return menu;
	}
},

// private
		unregister : function(menu) {
			delete menus[menu.id];
			menu.un("beforehide", onBeforeHide);
			menu.un("hide", onHide);
			menu.un("beforeshow", onBeforeShow);
			menu.un("show", onShow);
		}
	};
}();

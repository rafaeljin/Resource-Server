RLab.DragMgr = {
	dragCurrent : null,
	deltaX : 0,
	deltaY : 0,
	clickPixelThresh : 3,
	clickTimeThresh : 350,
	dragThreshMet : false,
	clickTimeout : null,
	startX : 0,
	startY : 0,
	_timeoutCount : 0,
	init : function() {
		if (document) {
			this._onLoad();
		} else {
			if (this._timeoutCount > 2000) {
			} else {
				setTimeout(this.init, 10);
				if (document && document.body) {
					this._timeoutCount += 1;
				}
			}
		}
	},
	_onLoad : function() {
		var Event = Ext.EventManager;
		Event.on(document, "mouseup", this.handleMouseUp, this, true);
		Event.on(document, "mousemove", this.handleMouseMove, this, true);
		Event.on(window, "unload", this._onUnload, this, true);
	},
	_onUnload : function(e, me) {
		if (this.dragCurrent) {
			this.stopDrag();
			this.dragCurrent = null;
		}
	},
	handleMouseDown : function(e, oDD) {
		if (this.dragCurrent) {
			this.handleMouseUp(e);
		}
		this.dragCurrent = oDD;

		this.startX = e.getPageX();
		this.startY = e.getPageY();

		this.dragThreshMet = false;

		this.clickTimeout = setTimeout(function() {
			var dm = RLab.DragMgr;
			dm.startDrag(dm.startX, dm.startY);
		}, this.clickTimeThresh);
	},
	handleMouseMove : function(e) {
		if (!this.dragCurrent) {
			return true;
		}
		if (Ext.isIE && (e.button !== 0 && e.button !== 1 && e.button !== 2)) {
			this.stopEvent(e);
			return this.handleMouseUp(e);
		}
		if (!this.dragThreshMet) {
			var diffX = Math.abs(this.startX - e.getPageX());
			var diffY = Math.abs(this.startY - e.getPageY());
			if (diffX > this.clickPixelThresh || diffY > this.clickPixelThresh) {
				this.startDrag(this.startX, this.startY);
			}
		}
		if (this.dragThreshMet) {
			this.onDrag(e);
		}
		this.stopEvent(e);
		return true;
	},
	handleMouseUp : function(e) {
		if (!this.dragCurrent) {
			return;
		}
		clearTimeout(this.clickTimeout);
		this.stopDrag(e);
		this.stopEvent(e);
	},
	startDrag : function(x, y) {
		clearTimeout(this.clickTimeout);
		if (this.dragCurrent) {
			//this.dragCurrent.startDrag(x, y);
			this.deltaX = this.dragCurrent.getLeft() - x;
			this.deltaY = this.dragCurrent.getTop() - y;
		}
		this.dragThreshMet = true;
	},
	onDrag : function(e) {
		this.dragCurrent.setLeftTop(e.getPageX() + this.deltaX, e.getPageY()
				+ this.deltaY);
	},
	stopDrag : function(e) {
		if (this.dragCurrent) {
			if (this.dragThreshMet) {
				//this.dragCurrent.endDrag(e);
			}
		}
		this.dragCurrent = null;
	},
    stopEvent: function(e){
		/*
        if(this.stopPropagation) {
            e.stopPropagation();
        }

        if (this.preventDefault) {
            e.preventDefault();
        }
        */
		e.stopEvent();
    }
};
RLab.DragMgr.init();

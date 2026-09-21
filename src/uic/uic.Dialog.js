/**********************************************************
 * uic.Dialog
 **********************************************************/

import { dom } from '../frw/frw.dom.js';
import { Overlay } from './uic.Overlay.js';

export class Dialog {
	constructor(params) {
		this.params = params;

		this.el = {};
		this.el.dlg = document.getElementById(params.id);
		this.el.close = document.getElementById(params.id + '-close');
		this.el.title = this.el.dlg.getElementsByTagName('h5')[0];
		this.el.body = document.getElementById(params.id + '-body');

		this.el.close.onclick = this.hide.bind(this);
		this.el.close.onmousedown = function (e) { if (e) e.cancelBubble = true; };
		this.el.title.onmousedown = drag.start.bind(drag, this.el.dlg);
	}

	destroy() {
		this.el.close.onmousedown = null;
		this.el.title.onmousedown = null;
		this.el.close = null;
		this.el.title = null;
		this.el.body = null;
		this.el.dlg = null;
	}

	center() {
		dom.center(this.el.dlg, 0.5, 0.4);
	}

	handleEvent(event) {
		if (event.type === 'resize') {
			this.keepInPlace();
		}
	}

	show() {
		if (!this.overlay) {
			this.overlay = new Overlay();
		}

		const dlg = this.el.dlg;
		dlg.remove();
		document.body.appendChild(dlg);
		if (this.params.centered) this.center();
		dlg.style.visibility = 'visible';

		window.addEventListener('resize', this); // registers this.handleEvent in the correct scope
	}

	keepInPlace() {
		if (this.params.centered) this.center();
		this.overlay.position();
	}

	isVisible() {
		return (this.el.dlg.style.visibility === 'visible');
	}

	hide() {
		if (this.isVisible()) {
			window.removeEventListener('resize', this);

			this.overlay.remove();
			this.overlay = null;

			const style = this.el.dlg.style;
			style.visibility = 'hidden';
			style.top = '0px';
			style.left = '0px';
		}
		return false;
	}

	setTitle(title) {
		this.el.title.innerHTML = title;
	}

	getBody() {
		return this.el.body;
	}
}

/*********************************************************/

const drag = {
	dragged: null,
	dragOffset: { x: 0, y: 0 }
};

drag.start = function (dragged, e) {
	e.preventDefault();
	this.dragged = dragged;
	const iPos = dom.getPos(dragged);
	const mPos = dom.mousePosition(e);
	this.dragOffset.x = mPos.x - iPos.left;
	this.dragOffset.y = mPos.y - iPos.top;
	document.onmousemove = this.move.bind(this);
	document.onmouseup = this.end.bind(this);
};

drag.move = function (e) {
	e.preventDefault();
	if (this.dragged != null) {
		const mPos = dom.mousePosition(e);
		this.dragged.style.left = (mPos.x - this.dragOffset.x) + 'px';
		this.dragged.style.top = (mPos.y - this.dragOffset.y) + 'px';
	}
};

drag.end = function (e) {
	e.preventDefault();
	if (this.dragged != null) {
		this.dragged = null;
		document.onmousemove = null;
		document.onmouseup = null;
	}
};

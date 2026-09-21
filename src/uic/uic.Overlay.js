/**********************************************************
 * uic.Overlay
 **********************************************************/

import { dom } from '../frw/frw.dom.js';

export class Overlay {
	constructor() {
		document.body.style.overflow = 'hidden';
		this.el = document.createElement('div');
		this.el.className = 'uic-overlay';
		this.position();
		document.body.appendChild(this.el);
	}

	position() {
		const style = this.el.style;
		const html = document.documentElement;
		const scroll = dom.getScroll();
		style.left = (scroll.left) + 'px';
		style.top = (scroll.top) + 'px';
		style.width = (html.clientWidth) + 'px';
		style.height = (html.clientHeight) + 'px';
	}

	remove() {
		document.body.style.overflow = 'auto';
		this.el.remove();
	}
}

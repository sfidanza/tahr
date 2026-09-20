/**********************************************************
 * uic.Tooltip
 * 
 * Usage:
 * 1. Create a Tooltip instance: let tooltip = new uic.Tooltip();
 * 2. Show (onmouseover): tooltip.show(event, 'Tooltip content');
 * 3. Move (onmousemove): tooltip.position(event);
 * 4. Hide (onmouseout): tooltip.hide();
 **********************************************************/

import { dom } from '../frw/frw.dom.js';

export class Tooltip {
	/**
	 * Create the tooltip container and attaches it to document.body
	 * @param {integer} hideDelay  The number of milliseconds, after the mouse moves off the target that triggered
	 *                             the display of the tooltip, before the tooltip is hidden (optional, default=500).
	 * @param {string} option If 'centerX' is passed, then horizontal position is centered
	 */
	constructor(hideDelay = 500, option) {
		this.hideDelay = hideDelay;
		this.hideTimer = null;
		this.option = option;
		this.el = document.createElement('div');
		this.el.className = 'uic-tooltip';
		this.el.style.display = 'none';
		if (this.hideDelay > 0) {
			// Keep tooltip opened when mouse is inside the tooltip
			this.el.onmouseover = this.stopHideTimer.bind(this);
			// Restart the delayed close when mouse is moved out of the tooltip
			this.el.onmouseout = this.setHideTimer.bind(this);
		}
		document.body.appendChild(this.el);
	}

	/**
	 * Trigger the display of the tooltip with specified content on a mouse event
	 * @param {object} mouseEvent The event which triggered the method call.
	 * @param {string} content The HTML content to place in the tooltip container.
	 */
	show(mouseEvent, content) {
		if (this.el) {
			this.stopHideTimer();
			this.el.innerHTML = content;
			this.el.style.display = '';
			this.position(mouseEvent);
		}
	}

	/**
	 * Set the tooltip on the lower right of the point that triggered the event.
	 * If it cannot fit in the viewport on a particular axis, place it to the opposite side on that axis.
	 * @param {object} mouseEvent The event which triggered the method call.
	 */
	position(mouseEvent) {
		const html = document.documentElement;
		const scroll = dom.getScroll();

		const offsetWidth = this.el.offsetWidth;
		let leftPos = (this.option === 'centerX')
			? (html.clientWidth - offsetWidth) / 2
			: mouseEvent.clientX + 20;
		if (leftPos > html.clientWidth - offsetWidth) {
			leftPos = mouseEvent.clientX - 20 - offsetWidth;
		}
		this.el.style.left = (leftPos + scroll.left) + 'px';

		const offsetHeight = this.el.offsetHeight;
		let topPos = mouseEvent.clientY + 20;
		if (topPos > html.clientHeight - offsetHeight) {
			topPos = mouseEvent.clientY - 20 - offsetHeight;
		}
		this.el.style.top = (topPos + scroll.top) + 'px';
	}

	/**
	 * Hide the tooltip
	 */
	close() {
		if (this.el) {
			this.el.style.display = 'none';
			this.el.innerHTML = '';
		}
	}

	/**
	 * Trigger hiding the tooltip a short time after the mouse leaves the target
	 * @param {integer} hideDelay  A custom duration, in milliseconds, to wait before hiding the tooltip (optional, default defined in constructor).
	 */
	hide(hideDelay) {
		this.stopHideTimer();
		this.setHideTimer(hideDelay);
	}

	/**
	 * Stop the timer which triggers hiding the tooltip
	 */
	stopHideTimer() {
		if (this.hideTimer) {
			clearTimeout(this.hideTimer);
			this.hideTimer = null;
		}
	}

	/**
	 * Set the timer which triggers hiding the tooltip
	 * @param {integer} hideDelay  A custom duration, in milliseconds, to wait before hiding the tooltip (optional, default defined in constructor).
	 */
	setHideTimer(hideDelay) {
		this.hideTimer = setTimeout(this.close.bind(this), hideDelay ?? this.hideDelay);
	}

	/**
	 * Destroy must be called when unloading the component. Removes DOM reference.
	 */
	destroy() {
		if (this.el) {
			this.el.onmouseover = null;
			this.el.onmouseout = null;
			this.el = null;
		}
	}
}









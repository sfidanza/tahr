/**********************************************************
 * uic.PWL (Please Wait Loading)
 * 
 * Usage:
 * 1. Create a PWL instance: let pwl = new uic.PWL();
 * 2. Show the loader: pwl.show('Loading data...');
 * 3. Hide the loader: pwl.hide();
 **********************************************************/

import { dom } from '../frw/frw.dom.js';

/**
 * Create the PWL container and attach it to document.body
*/
export class PWL {
	constructor() {
		this.el = document.createElement('div');
		this.el.className = 'uic-pwl';
		this.el.style.display = 'none';
		document.body.appendChild(this.el);
		this.visible = false;
	}

	/**
	 * Display the PWL with specified text
	 * @param {string} message The text to display while waiting
	 */
	show(message) {
		this.el.innerHTML = message;
		if (!this.visible) {
			this.visible = true;
			this.el.style.display = 'block';
			dom.center(this.el);
		}
	}

	/**
	 * Hide the PWL
	 */
	hide() {
		this.el.innerHTML = '';
		this.el.style.display = 'none';
		this.visible = false;
	}

	/**
	 * Destroy must be called when unloading the component. Removes DOM reference.
 	 */
	destroy() {
		this.el = null;
	}
}

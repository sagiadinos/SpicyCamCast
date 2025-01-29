/*
 * SpicyCamCast: JavaScript Lib for easy Camera and Screencast access
 *
 * This file is part of the SpicyCamCast source code
 *
 * SpicyCamCast is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or (at your
 * option) any later version.
 *
 * SpicyCam is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with SpicyCamCast.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Copyright (C) 2025 Nikolaos Sagiadinos <niko@saghiadinos.de>
 */

/**
 * The SpicyBase class is a JavaScript class designed to facilitate camera and
 * screencast access. It includes several private fields, such as #imageQuality,
 * #isMirror, #videoElement, #settings, and #streamList, which are used to
 * manage the state and configuration of the video element and its associated
 * streams.
 */
export class SpicyBase
{
	#imageQuality    = 0.8
	#isMirror        = false;
	#videoElement    = null;
	#settings        = null;
	#streamList      = [];

	/**
	 * The constructor of the class initializes the #videoElement and sets
	 * its default width and height if they are not already specified:
	 *
	 * @param videoElement
	 */
	constructor(videoElement)
	{
		this.#videoElement        = videoElement;
		this.#videoElement.width  = this.#videoElement.width || 640;
		this.#videoElement.height = this.#videoElement.height || 360;
	}

	get videoElement() { return this.#videoElement; }

	/**
	 * If you use a front camera sometimes people want to mirror the output.
	 *
	 * @param value
	 */
	set isMirror(value) { this.#isMirror = value;}

	get isMirror() { return this.#isMirror; }

	set settings(value) { this.#settings = value; }

	get settings() { return this.#settings;}

	get streamList() { return this.#streamList; }

	set streamList(value) {	this.#streamList = value;}

	/**
	 * The stop method stops all media tracks in the #streamList and resets
	 * the videoElement's srcObject.
	 */
	stop()
	{
		this.#streamList.forEach(stream => {
			stream.getTracks().forEach(track => {
				track.stop();
			});
		});

		this.videoElement.srcObject = null; // reset video element
	}

	/**
	 * Default value is JPEG with 0.8 quality.
	 *
	 * @param canvasElement
	 * @returns {string}
	 */
	capturePhoto(canvasElement)
	{
		return this.capturePhotoAsJpeg(canvasElement);
	}

	/**
	 * @param canvasElement
	 * @returns {string}
	 */
	capturePhotoAsPng(canvasElement)
	{
		canvasElement = this.#handleCanvas(canvasElement);
		return canvasElement.toDataURL('image/png');
	}

	/**
	 * @param canvasElement
	 * @returns {string}
	 */
	capturePhotoAsJpeg(canvasElement)
	{
		canvasElement = this.#handleCanvas(canvasElement);
		return canvasElement.toDataURL('image/jpeg', this.#imageQuality);
	}

	/**
	 * @param canvasElement
	 * @returns {string}
	 */
	capturePhotoAsWebp(canvasElement)
	{
		canvasElement = this.#handleCanvas(canvasElement);
		return canvasElement.toDataURL('image/webp', this.#imageQuality);
	}

	/**
	 * Handles canvas preparation for photo capture.
	 *
	 * This method prepares the provided canvas element for capturing a photo.
	 * It sets the canvas dimensions based on the specified settings,
	 * applies the mirror effect if enabled, and draws the current video frame
	 * onto the canvas.
	 *
	 * @private
	 * @param {HTMLCanvasElement} canvasElement - The canvas element to prepare for photo capture.
	 * @returns {HTMLCanvasElement} - The prepared canvas element.
	 */
	#handleCanvas(canvasElement)
	{
		canvasElement.height = this.#settings.height;
		canvasElement.width = this.#settings.width;
		let context = canvasElement.getContext('2d');
		if(this.#isMirror)
		{
			context.translate(canvasElement.width, 0);
			context.scale(-1, 1);
		}
		context.clearRect(0, 0, canvasElement.width, canvasElement.height);
		context.drawImage(this.#videoElement, 0, 0, canvasElement.width, canvasElement.height);

		return canvasElement;
	}
}
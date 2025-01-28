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
 * These classes were inspired by Benson Ruan webcam-easy
 */

export class SpicyBase
{
	#imageQuality    = 0.8
	#isMirror        = false;
	#videoElement    = null;
	#settings        = null;
	#streamList      = [];

	constructor(videoElement)
	{
		this.#videoElement        = videoElement;
		this.#videoElement.width  = this.#videoElement.width || 640;
		this.#videoElement.height = this.#videoElement.height || 360;
	}

	get videoElement() { return this.#videoElement; }

	set isMirror(value) { this.#isMirror = value;}

	get isMirror() { return this.#isMirror; }

	set settings(value) { this.#settings = value; }

	get settings() { return this.#settings;}

	get streamList() { return this.#streamList; }

	set streamList(value) {	this.#streamList = value;}

	stop()
	{
		this.#streamList.forEach(stream => {
			stream.getTracks().forEach(track => {
				track.stop();
			});
		});

		this.videoElement.srcObject = null; // reset video element
	}

	capturePhoto(canvasElement)
	{
		return this.capturePhotoAsJpeg(canvasElement);
	}

	capturePhotoAsPng(canvasElement)
	{
		canvasElement = this.#handleCanvas(canvasElement);
		return canvasElement.toDataURL('image/png');
	}

	capturePhotoAsJpeg(canvasElement)
	{
		canvasElement = this.#handleCanvas(canvasElement);
		return canvasElement.toDataURL('image/jpeg', this.#imageQuality);
	}

	capturePhotoAsWebp(canvasElement)
	{
		canvasElement = this.#handleCanvas(canvasElement);
		return canvasElement.toDataURL('image/webp', this.#imageQuality);
	}

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
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

import {SpicyBase} from "./SpicyBase.js";

/**
 * The SpicyCast class extends the SpicyBase class and provides
 * functionality for managing screencasts. It maintains a private list of
 * media streams (#streamList) and initializes with a videoElement passed to
 * its constructor.
 */
export class SpicyCast extends SpicyBase
{
    #streamList      = [];

    constructor(videoElement)
    {
		super(videoElement)
    }

	/**
	 * The getMediaConstraints method defines the constraints for the video
	 * stream, setting the ideal width and height to 3840 and 2160 pixels,
	 * respectively. It returns an object with these video constraints and disables audio.
	 *
	 * @returns {{video: {}, audio: boolean}}
	 */
    getMediaConstraints()
    {
        const videoConstraints    = {};

        videoConstraints.width    = {ideal: 3840};
        videoConstraints.height   = {ideal: 2160};

        return {video: videoConstraints, audio: false};
    }

	/**
	 * The startScreencast method is an asynchronous function that starts a
	 * screencast. It returns a promise that resolves when the screencast
	 * starts successfully.
	 *
	 * The method uses navigator.mediaDevices.getDisplayMedia to request
	 * access to the screen and audio. Upon success, it retrieves the video
	 * track, saves its settings, adds the stream to the #streamList, and sets
	 * the videoElement's source to the stream.
	 *
	 * @returns {Promise<unknown>}
	 */
    async startScreencast()
    {
		return new Promise((resolve, reject) => {
			navigator.mediaDevices.getDisplayMedia({ video: true, audio: true})
				.then(stream => {
					const track = stream.getVideoTracks()[0];
					this.settings = track.getSettings();
					this.#streamList.push(stream);
					this.videoElement.srcObject = stream;
					resolve();
				})
				.catch(error => {
					console.log(error);
					reject(error);
				});
		});
	}

	/**
	 * The stopScreencast method stops the screencast by calling the stop
	 * method, which is presumably inherited from the SpicyBase class.
	 */
    stopScreencast()
    {
        this.stop();
    }
}
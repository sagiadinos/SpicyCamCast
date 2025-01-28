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

export class SpicyCast extends SpicyBase
{
    #streamList      = [];

    constructor(videoElement)
    {
		super(videoElement)
    }

    getMediaConstraints()
    {
        const videoConstraints    = {};

        videoConstraints.width    = {ideal: 3840};
        videoConstraints.height   = {ideal: 2160};

        return {video: videoConstraints, audio: false};
    }

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

    stopScreencast()
    {
        this.stop();
    }

}
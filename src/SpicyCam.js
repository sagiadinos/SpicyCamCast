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
 * The SpicyCam class extends the SpicyBase class and provides functionality for
 * managing camera devices. It maintains a private list of cameras (#camerasList)
 * and the current device ID (#currentDeviceId). The constructor initializes
 * the class with a videoElement and calls the parent class constructor.
 *
 */
export class SpicyCam extends SpicyBase
{
    #camerasList     = [];
    #currentDeviceId = '';

    constructor(videoElement)
    {
       super(videoElement);
    }

	get camerasList() { return this.#camerasList; }

    countCameras() { return this.#camerasList.length; }

    get currentDeviceId() { return this.#currentDeviceId;}

	/**
	 * The getMediaConstraints method defines the constraints for the video stream,
	 * setting the device ID to the current device ID and specifying ideal width
	 * and height. It returns an object with these video constraints and enables audio
	 *
	 * @returns {{video: {}, audio: boolean}}
	 */
    getMediaConstraints()
    {
        const videoConstraints    = {};

        videoConstraints.deviceId = {exact: this.#currentDeviceId};
        videoConstraints.width    = {ideal: 3840};
        videoConstraints.height   = {ideal: 2160};

        return {video: videoConstraints, audio: true};
    }

	/**
	 * The selectCamera method sets the current device ID to the
	 * specified device ID if it matches one of the detected cameras.
	 *
	 * @param deviceId
	 */
    selectCamera(deviceId)
    {
        for(let camera of this.#camerasList)
        {
            if (deviceId === camera.deviceId)
            {
                this.#currentDeviceId = camera.deviceId;
                return;
            }
        }
    }

	/**
	 * The detectVideoDevices method detects available video devices and
	 * updates the cameras list. It returns a promise that resolves with the
	 * list of video input devices. If an error occurs, it logs the error and
	 * rejects the promise with an appropriate error message.
	 *
	 * @returns {Promise<Array>} A promise that resolves with the list of video input devices.
	 */
    detectVideoDevices()
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                const devices     = await navigator.mediaDevices.enumerateDevices();
                this.#camerasList = devices.filter(device => device.kind === 'videoinput');

				resolve(this.#camerasList);
            }
            catch (err)
            {
				console.error('Error accessing media devices:', err);

				if (err.name === 'NotAllowedError')
					reject(new Error('Permission to access media devices was denied.'));
				 else if (err.name === 'NotFoundError')
					reject(new Error('No media devices found.'));
				 else
					reject(new Error('An unknown error occurred.'));
			}
        });
    }

	/**
	 * The justStart method quickly starts streaming from the first
	 * detected video device to the video element. It first detects video
	 * devices, selects the first one, and starts the camera. If no video device
	 * is found, it rejects the promise with an error.
	 *
	 * @returns {Promise<unknown>}
	 */
	justStart()
	{
		return new Promise(async (resolve, reject) => {
			try
			{
				await this.detectVideoDevices();
				if (this.countCameras() > 0)
				{
					this.#currentDeviceId = this.#camerasList[0].deviceId;
					await this.startCamera();
					resolve();
				}
				else
				{
					reject(new Error("No video device was found."));
				}
			}
			catch (error)
			{
				reject(error);
			}
		});
	}

	/**
	 * The startCamera method starts the camera and streams the video to the
	 * video element. It returns a promise that resolves with the current
	 * device ID if the camera starts successfully.
	 *
	 * If an error occurs, it logs the error and rejects the promise.
	 *
	 * @returns {Promise<unknown>}
	 */
    async startCamera()
    {
        return new Promise((resolve, reject) => {
            navigator.mediaDevices.getUserMedia(this.getMediaConstraints())
                .then(stream => {
                    const track = stream.getVideoTracks()[0];
                    this.settings = track.getSettings();

                    this.streamList.push(stream);
                    this.videoElement.srcObject = stream;

                    if(this.isMirror)
                        this.videoElement.style.transform = "scale(-1,1)";

                    this.videoElement.play();
                    resolve(this.#currentDeviceId);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    }

	/**
	 * The stopCamera method stops the camera by calling the stop method,
	 * which is presumably inherited from the SpicyBase class.
	 */
    stopCamera()
    {
        this.stop();
	}
}
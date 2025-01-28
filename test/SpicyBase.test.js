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
import { expect } from 'chai';
import { SpicyBase } from '../src/SpicyBase.js';

// Mock eines Video-Elements für Tests
const videoElementMock = {
	width: 640,
	height: 360,
	srcObject: null
};

describe('SpicyBase', () => {

	let spicyBase;

	// Vor jedem Test wird eine neue Instanz von SpicyBase erstellt
	beforeEach(() => {
		spicyBase = new SpicyBase(videoElementMock);
	});

	it('should be an instance of SpicyBase', () => {
		expect(spicyBase).to.be.an.instanceof(SpicyBase);
	});

	it('should have a default video element width and height', () => {
		expect(spicyBase.videoElement.width).to.equal(640);
		expect(spicyBase.videoElement.height).to.equal(360);
	});

	it('should be able to set and get the isMirror property', () => {
		spicyBase.isMirror = true;
		expect(spicyBase.isMirror).to.equal(true);
	});

	it('should capture a photo as jpeg', () => {
		const canvasMock = {
			width: 640,
			height: 360,
			getContext: () => ({
				translate: () => {},
				scale: () => {},
				clearRect: () => {},
				drawImage: () => {}
			}),
			toDataURL: (format, quality) => `data:${format};base64,exampledata`
		};
		spicyBase.settings  = {width: 640, height: 360};
		const result = spicyBase.capturePhoto(canvasMock);
		expect(result).to.include('data:image/jpeg');
	});

	it('should capture a photo as jpeg', () => {
		const canvasMock = {
			width: 640,
			height: 360,
			getContext: () => ({
				translate: () => {},
				scale: () => {},
				clearRect: () => {},
				drawImage: () => {}
			}),
			toDataURL: (format, quality) => `data:${format};base64,exampledata`
		};
		spicyBase.settings  = {width: 640, height: 360};
		const result = spicyBase.capturePhotoAsJpeg(canvasMock);
		expect(result).to.include('data:image/jpeg');
	});

	it('should capture a photo as png', () => {
		const canvasMock = {
			width: 640,
			height: 360,
			getContext: () => ({
				translate: () => {},
				scale: () => {},
				clearRect: () => {},
				drawImage: () => {}
			}),
			toDataURL: (format) => `data:${format};base64,exampledata`
		};
		spicyBase.settings  = {width: 640, height: 360};
		const result = spicyBase.capturePhotoAsPng(canvasMock);
		expect(result).to.include('data:image/png');
	});

	it('should capture a photo as webm', () => {
		const canvasMock = {
			width: 640,
			height: 360,
			getContext: () => ({
				translate: () => {},
				scale: () => {},
				clearRect: () => {},
				drawImage: () => {}
			}),
			toDataURL: (format) => `data:${format};base64,exampledata`
		};
		spicyBase.settings  = {width: 640, height: 360};
		const result = spicyBase.capturePhotoAsWebp(canvasMock);
		expect(result).to.include('data:image/webp');
	});


	it('should stop streams correctly', () => {
		const streamMock = {
			getTracks: () => [{ stop: () => {} }]
		};
		spicyBase.streamList = [streamMock];
		spicyBase.stop();

		expect(spicyBase.streamList).to.have.lengthOf(1);
	});

});
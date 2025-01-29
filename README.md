# SpicyCamCast

SpicyCamCast is a minimal JavaScript library (sub-3KB) for effortless camera
and screencast integration. Inspired by Benson Ruan [webcam-easy](https://github.com/bensonruan/webcam-easy) library.
it capture photos, manage video streams with a concise API.

SpicyCamCast leverages modern JavaScript features such as ES6 classes,
private fields, promises, and async/await for asynchronous operations.

Super easy to add this as a module to your project!

![ScreenCamCast-Demo.gif](examples/ScreenCamCast-Demo.gif)

## Features

- Detect and select video devices
- Start and stop camera streams
- Start and stop screencast streams
- Capture photos in various formats (JPEG, PNG, WebP)
- Mirror video streams


## Usage SpicyCamCast-Lib

### Importing the Cam Library

```javascript
import { SpicyCam } from './src/SpicyCamCast.js';
```

### Starting a Camera Stream

```javascript
const videoElement = document.querySelector('video');
const spicyCam = new SpicyCam(videoElement);

spicyCam.justStart().then(() => {
  console.log('Camera started');
}).catch(error => {
  console.error('Error starting camera:', error);
});
```

### Starting a Screencast Stream

### Importing the Screencast Library

```javascript
import { SpicyCast } from './src/SpicyCamCast.js';
```

```javascript

const videoElement = document.querySelector('video');
const spicyCast = new SpicyCast(videoElement);

spicyCast.startScreencast().then(() => {
  console.log('Screencast started');
}).catch(error => {
  console.error('Error starting screencast:', error);
});
```

### Capturing a Photo

Captures a photo from the video stream and returns it as a
JPEG data URL.
It is also possible to capture photos in PNG and WebP formats.

```javascript
const canvasElement = document.querySelector('canvas');
const photoDataUrl = spicyCam.capturePhotoAsJpeg(canvasElement);
console.log('Captured photo:', photoDataUrl);
```

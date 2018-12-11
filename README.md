# Depth2Web

Depth2Web is an open source tool kit that connects multiple depth camera connection for the web. It is built as an Electron application, and aims at being **device agnostic**, to give less stress on *which device* in order to focus on the data itself.

You can also read the [original project proposal](PROPOSAL.md).

This project is created under mentorship of Lisa Jamhoury and builds upon [Kinectron](http://kinectron.github.io).

## Devices supported

* Microsoft Kinect V2
* Intel RealSense 2

## Contribution Guide

Depth2Web welcomes contribution to the tool kit in any form, including but not limited to, documentation and code.

## Architecture

### Overview

Depth2Web is an Electron application that communicates between the Electron renderer view to its server using Electron's IPC. New instances of devices are connected via the parent Device class which creates a device of object of the requested type. Each of the supported device class (RealSense and Kinect) contain node wrapper modules for the device's SDK. When a specific camera feed from the device is requested through the Electron renderer, depending on the feed, the device emits socket message with the data to the Electron render as well as to the web client. 

List of Dependencies:
* Electron
* Kinect V2 SDK
* Intel RealSense 2 SDK
* KinectV2 npm module
* Intel RealSense 2 npm module
* Socket.io npm module
* Sharp npm module
* MDL framework

### index.js: Electron Application Entry Point

### Device.js

#### Kinect.js

#### RealSense.js

### socketServer.js


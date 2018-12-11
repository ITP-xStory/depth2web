# Depth2Web: Project Proposal

Depth2Web is an Electron application that allows users to connect various body tracking devices to the web. This project is builds on Lisa Jamhoury's [Kinectron](http://kinectron.github.io).

Depth2Web aims to be "device agnostic", meaning that there will be less emphasis given to the individual body tracking tools themselves, and focuses on being the aggregating hub of various body tracking tools to provide uniform data for web-based use. Multiple devices can be connected to a single instance of an application to be sent over to the web to render real time graphics.

This tool is to collect, compute and send data about the body. The devices that are conventionally used for gathering information about the body. Rather, they have depth cameras that are capable of providing data to compute a body blob. Part of the development of the tool will also be on computing a body blob through the images / data provided by the individual cameras.

This tool will initially focus on two aspects: 1) finding a common lingo for organizing data across all body tracking devices to be implemented on the platform and 2) figuring out the best way to package the data collected and parsed to the web.

The project idea came to fruition during development of [The Flow Room](https://github.com/js6450/theFlowRoom), a project by Julia Irwin, Lisa Jamhoury, Jung Hyun Moon and Jiwon Shin and funded by NYU Arts Council Visual Arts Initiative.

This project is developed by Jiwon Shin and mentored by Lisa Jamhoury.

## The Problem

Microsoft has announced the discontinuation of manufacturing Kinect devices in October 25, 2017. This has caused some to look for alternatives, and some to collect as many Kinect devices as they can to continue to use them as long as possible. Around the time of the announcement by Microsoft, I had begun development of The Flow Room with Julia Irwin, Lisa Jamhoury and Jung Hyun Moon and in conversation with Moon, the idea about having a device-agnostic platfrom arose. 

Additionally there are a lot of great researches currently being done about processing 2D images to extract body blobs and skeleton such as [DensePose](http://densepose.org/) and PoseNet(https://github.com/tensorflow/tfjs-models/tree/master/posenet), meaning that in the near future, we may not need devices specific to body / motion capturing to be able to track and use body data. Thus, this project will attempt at shifting the attention from the individual devices to tracking and collecting the data about the body. The shift in the attention will hopefully urge more people to concentrate about what kinds of data the various skeleton tracking and depth devices / software provide and whether the said data is actually enough and / or appropriate in giving us information about the various aspects about the body.

## The Greater Landscape

Projects such as Lisa Jamhoury's [Kinectron](http://kinectron.github.io) and Dan Oved's [PoseNet](https://github.com/tensorflow/tfjs-models/tree/master/posenet) have set great precedence of software that capture the body and compute & process the data for use on the web. This body tracking tool will provide an umbrella platform to connect multiple devices in the simular nature to use, and attempt at reducing the important of the tool itself.

As an open source project, contributions to attach other devices beyond current consideration of the project to the platform are welcome.

## Deliverables

On December 11, 2018, the first iteration of the Depth2Web application will be demoed. The goal for the demo is to have a Kinect, a realSense and a webcam connected to the application and send the computed data to a website rendering simple visualization of body data.

## Implementation

Depth2Web is an Electron application that connects multiple devices that can track the body on one platform. This project builds upon Kinectron and for the first iteration, Intel RealSense 2.0 and PoseNet will be added to the application. For now, Kinectron sends data via peer.js, but there are plans to explore the use of socket.io or websocket node module as alternative options for users to send the data over to the web.

This tool is to collect, compute and send data about the body. The devices in consideration for this platform are not limited to gathering information about the body. Rather, they have depth cameras that are capable of providing data to compute a body blob. The SDK of the devices themselves do not have a built in function that users can readily utilize a 3D body blob. This means that part of the development of the tool will also be on computing a body blob through the images / data provided by the individual cameras. During the development of The Flow Room, a functionality for calculating the 3D body blob has already been created and ready to be implemented on Kinectron. 2D body blob can be calculated using PoseNet on 2D images.

Lisa Jamhoury's [Kinectron](http://kinectron.github.io) will be the structural and technical starting point of this project.

List of body tracking devices for consideration:
* Kinect V2: implemented by Lisa Jamhoury in Kinectron
* Intel RealSense 2.0: plans to implement for iteration 1
* PoseNet: plans to implement for iteration 1
* [Orbbec Persee / Astra](https://orbbec3d.com/products/)
* [ZED](https://www.stereolabs.com/zed/)

## Timeline

The first iteration of this project will be completed over 5 weeks (Nov 6 - Dec 11).

### Week 1
* Research available SDK / node modules for all devices being considered for implemetation (Kinect, RealSense, Orbbec, ZED).
* Study & document different formates of images / data provided by the SDK / node modules.

### Week 2
* Based on the research on the formates of images / data of the body tracking devices, come up with a data structure suitable for all / most devices.
* Work on realSense body blob computation

### Week 3
* Work on realSense body blob computation
* Work on data packaging for sending over the web (peer.js and / or socket.io)

### Week 4
* Work on data packaging for sending over the web (peer.js and / or socket.io)
* Start fine tuning functionalities for electron application (UI / UX)

### Week 5
* User testing and fine tuning for the first iteration of the Depth2Web application

## Documentation

Documentation of development of this project will be done on this project repo, to try to keep everything related to this project as much as possible in one place. In the spirit of developing an open source project, I would like to keep the process of development as public / open as possible.

## Accessibility

The application will be designed carefully with considerations of the [W3C Web Content Accessibility Guide](https://www.w3.org/WAI/standards-guidelines/wcag/). As for the data that are being computed and sent over to the web, I will have to think more about how to make it accessible. 

## Mentor

This project is mentored by [Lisa Jamhoury](http://lisajamhoury.com/). Lisa's experience in developing Kinectron will be amazing and valuable resource for all aspects of the development of this application. 

## About Jiwon

Jiwon Shin is a creative coder and educator. Her interests are in researching and devising new ways of communication between people by combining both analog and digital methods of communication. She is also interested in the study and use of body as a method of communication. The most relevant experience in this field of study is the development of [The Flow Room](https://github.com/js6450/theFlowRoom), which was built using the fundamental structures of [Kinectron](http://kinectron.github.io). 

For more information about Jiwon's work, please visit [her website](http://jiwonshin.com).



# Kinesis

Kinesis is a fitness mobile app that works on android and ios. This application is built with the MERN stack and utilise React native as the main mobile framework for this project. The system has the ability to track out current locations in real-time and able to record our running/jogging or any location dynamic exercises path and calculate how many calories that burned per minute, based on the chosen exercise’s MET level and time spent on that specific exercise.

User's also able to edit their health profile such as age, height, and mass which will affect how their body system burns calories. S3 bucket cloud storage on AWS also being integrated into this app in the case user wants to make their profile more lifely by uploading their image profile. Thus, AWS S3 event handler functions are provided within the server-side application. 

Expo Go is the platform that allows the front-end (Mobile) application for this project to be available in the cloud/internet and thus anyone can use this app on their Apple or Android devices.

Both client and server-side applications are developed in a test-driven environment with jest, and CI/CD Pipeline with CircleCI is applied on the server-side application which will perform pre-processes assignments automation before the server-side’s deployment to Heroku.

Below is the system design diagram of how this project is structured.

![MyProjects-Kinesis drawio](https://user-images.githubusercontent.com/61646199/147807572-89af9bcd-42f6-432b-b198-b4c5f4679971.png)

## How to run the app on your local machine/mobile (development environment)?

### Step 1: Important proceeding to Step 2

Run:

```
yarn
```

In app directory to install all dependencies utilised in the application.

### Step 2: Run the application in mobile simulator or your own mobile phone.

#### 2.1 Running App on IOS Simulator: (Note: You must have Xcode IDE Software)

```
yarn ios
```

#### 2.2 Running App on Android Simulator: (Note: You must have an Android Simulator or connected to the existing Android devices)

```
yarn android
```

#### 2.3 Running App on your mobile device:

Step 1 - Download Expo Go app in your app store

Step 2 - Run the following command in your terminal and you should be inside app directory

```
yarn start
```

Step 3 - Scan the QR Code generated in the terminal window with the Expo Go app after running yarn start.

## How to run the app on your mobile phone (published app)?

First, you are required to install the Expo Go app on your mobile. After successful installation please access the following link (https://expo.dev/@adit-prawira/kinesis) or scan the following QR code with the Expo Go App. 
![qr](https://user-images.githubusercontent.com/61646199/147807582-1d7d3a9c-ba22-4331-a0a1-b251955dc9ad.png)


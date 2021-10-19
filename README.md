# petME
petMe  is connection between  --> need someone to take of their pet for temporary  ? + want  pet But can't keep them forever ? 
> React Native (Expo CLI) , Firebase  , Material UI   

    
[My E-Mail](mailto:radioactivenarendra@gmail.com)     
[My Profile](https://github.com/napiyo)
### Jump to :
- [See App on Android](#1)
- [Screenshots Tour](#2)
- [Install Project On PC](#install-project-on-your-pc)
****   
### Going to office or on a trip ? and wants someone who can take care of your pet till then ?
****
> we have solution for that.. download petMe and follow these steps
- create Account on petME
- post your pet details [pet photo , time till you want someone to take care , Location ... ]
- review all you requests you recived to look after your pet by other pet lovers
- chat with them and decide drop point etc
- give them feedback after you get your pet back

### pet Lover ? want a pet , but can't keep them forever ?
- log in to petMe
- see all pet requests , which are looking for someone to take care for a while
- message pet human
- get pet and love them

**** 
## Get started
> learnt React-Native and built petMe in 5 days
<html>
<div style="display:flex,flex-direction:row">
  <div>
   <a id="1"> <h2>1. See the App on Android</h2></a>
    <p>download  <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_IN&gl=US">expo go  app</a> from play store and then scan this qr code or  go to :  <a href="https://expo.dev/@napiyo/petME">click me</a></p>
     <p>this app can run on both Android and ios, but ios dont allow apps from outside App store. and petME is not available on app store yet so use android for preview </p>
<img src="https://user-images.githubusercontent.com/88178000/137981267-95cf2ab5-6a63-4cae-a6b6-c56767875a70.jpg" alt="HomePage ScreenShot"  height="500">
      </div>
  <a id="2"><h2>2. ScreenShots tour</h2></a>
  <div> <h3><li>Login And Sign up screens</li>
</h3>
  <img src="https://user-images.githubusercontent.com/88178000/137982950-b7ec7b72-0bb3-4c50-b5d4-4e355d0627ff.jpeg" alt="LoginPage ScreenShot"  height="450">
    <img src="https://user-images.githubusercontent.com/88178000/137982953-7b86aade-edfa-4e38-8c71-0f75c9ab41e5.jpeg" alt="SignUPPage ScreenShot"  height="450"></div>
  <div> <h3><li>After login (ios screenshots)</li></h3>
    <p>Home - Display List of all pets available , click  on petMe to send request to owner </p>
    <p>Create Post - Post request for your pet to look after you for a given time period</p>
  <img src="https://user-images.githubusercontent.com/88178000/137984336-71cae647-de5c-4fd8-8036-ef657e4a4242.jpeg" alt="SignUPPage ScreenShot"  height="450">
     <img src="https://user-images.githubusercontent.com/88178000/137982938-47e6b5c5-ce8f-45e7-82ce-12cf4cd8697c.jpeg" alt="SignUPPage ScreenShot"  height="450">
     <img src="https://user-images.githubusercontent.com/88178000/137982955-61a9a5bd-2904-46a2-aac1-f5b2100a4939.jpeg" alt="SignUPPage ScreenShot"  height="450">
    </div>
  <div>
    <h2><li>History Tab</li></h2>
    <p>History Tab - shows all your active requests of your pet</p>
    <p>Requests - show all requests you received for your pet </p>
    <p>Past Request - show all you requests of you pet that has been expired</p>
     <img src="https://user-images.githubusercontent.com/88178000/137982942-fdeb3652-7594-4546-9422-31fd4c04f83f.jpeg" alt="SignUPPage ScreenShot"  height="450">
     <img src="https://user-images.githubusercontent.com/88178000/137982952-8c591fdc-8532-404f-ad83-ba5e61a92452.jpeg" alt="SignUPPage ScreenShot"  height="450">
     <img src="https://user-images.githubusercontent.com/88178000/137982945-3eaf598d-4592-40f2-a01b-30486c68e159.jpeg" alt="SignUPPage ScreenShot"  height="450">
     <img src="https://user-images.githubusercontent.com/88178000/137982932-2959cd98-baf9-4b12-b9ad-c589c17debfb.jpeg" alt="SignUPPage ScreenShot"  height="450">
  </div>
  </div>

  <a id="install-project-on-your-pc"></a>
  </html>
  
  
  # Install Project on Your PC
  > we Have used Expo CLI to create project 


  1. get this repo on your machine 
  ```
git clone https://github.com/napiyo/petME
```
2. get all modules required
> Not mentioning name of module here will automatically install all modules required which are in package.json under depedencies
```
npm install
```
- all dependecies installed are

```
"dependencies": {
    "@gorhom/bottom-sheet": "^4.1.3",
    "@react-native-community/datetimepicker": "3.5.2",
    "@react-navigation/bottom-tabs": "^6.0.9",
    "@react-navigation/native": "^6.0.6",
    "@react-navigation/native-stack": "^6.2.4",
    "expo": "~42.0.1",
    "expo-image-picker": "~10.2.2",
    "expo-status-bar": "~1.0.4",
    "firebase": "8.2.3",
    "react": "16.13.1",
    "react-dom": "16.13.1",
    "react-native": "https://github.com/expo/react-native/archive/sdk-42.0.0.tar.gz",
    "react-native-gesture-handler": "^1.10.3",
    "react-native-paper": "^4.9.2",
    "react-native-reanimated": "^2.2.3",
    "react-native-safe-area-context": "3.2.0",
    "react-native-screens": "~3.4.0",
    "react-native-web": "~0.13.12",
    "react-redux": "^7.2.5",
    "redux": "^4.1.1"
  },
```
3. Add firebaseConfiguration.js
- you will need to add your firebaseConfiguration file and export firestore instance as db 
5. Run Project
- download expo go App from play store or App store (only for real devices ), if you're using emulator it will automatically install
> to run on IOS from windows you'll need expo Go App
```
expo start
```
- it will show you a QR code in terminal and in browser scan it in expo go App for android and scan in camera app for ios






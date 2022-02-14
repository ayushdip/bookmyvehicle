# About the App
This app is a basic app for vehicle-dealer registration. Through this app you dealers and drivers can register their profiles and can book vehicles after using the app. The app frontend is built using React and Material-UI. Animations in frontend is handled using "AOS" library. Backend is handled using firebase and Firestore is used as a Database. This app can be used as a platform for Dealers and Drivers. 

[App Link](https://classroomproject-fe770.web.app/)

To run this project navigate to the project folder and run the commands

```shell
$ npm install
$ npm start
```

## Authentication
Authentication is handled using firebase authentication. Users can login using the Email Address and passwords used in registration. After authentication users are directed to their home page based on their profile. There are separate profile for dealers and drivers.

## Dealers Profile
Dealers can search for drivers by entering the source and destination. All drivers which have either the source or destinations in their routes will be displayed to the dealer. All available vehicles of the corresponding driver is shown to the dealer. Dealers can book drivers by selecting the drivers vehicle and specifying the items and quantity of items. The dealers can see the status of their bookings by moving to upcoming bookings in the navbar. They can see their previous booking in the navbar.

## Drivers Profile
Drivers can enter the available vehicles information after they login. They can add preferred routes to attract dealers. If the source or destination of driver matches with dealers source or destination, the drivers profile is shown to dealer during booking. Drivers can also navigate to see dealers request in Dealers request option on Navbar. Other information like upcoming journeys and previous journeys are also shown to the driver.

## Logout

In order to logout users can click on their Avatar and select logout option.


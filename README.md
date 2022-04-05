# Ambient Intelligence Project 2022
Project in the Ambient Intelligence course at Instituto Superior Técnico in Lisbon 2022.
Project developed by [Benedicte Kaltoft Hansen](https://github.com/benedictekh), [Jonas Rogde Jørgensen](https://github.com/jonasrj97) and [Inger-Ane Schefte](https://github.com/ingeraness).
## Download the Code
Clone the project with `git clone https://github.com/benedictekh/Ambient-Intelligence.git`.

## Arduino Server
### Arduino Setup
We have used an Arduino UNO starter kit for this project. The setup of the Arduino is shown below:
PHOTO

To be able to connect the arduino to the app, you have to follow these steps:
1. If you have not already, download the [Arduino IDE](https://www.arduino.cc/en/software)
2. Open the Arduino IDE and connect the Arduino UNO to your computer
4. Open the StandardFirmataPlus code example (File -> Examples -> Firmata -> StandardFirmataPlus)
5. Upload the StandardFirmataPlus code example to the arduino

### How To Run the Arduino Server Code
1. Navigate to the server folder of the project and run `npm install`
2. Check which port the arduino is connected to on your computer, and change it to the correct one in the server.js file.
3. Run the code with `node server.js`

## Frontend
### How To Run Frontend
1. Navigate to the frontend folder of the project and run `npm install`
2. Run the code with `npm start`

The project should now open on [localhost/3000](http://localhost:3000/)


## Backend
To run the project, you also need to run the backend of the project. The backend code, and how to run it can be found [here](https://github.com/ingeraness/ambient-intelligence-backend)

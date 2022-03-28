import * as faceapi from "face-api.js";
import axios from "axios";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const MODEL_URL = "/models";
const HEIGHT = 220;
const WIDTH = HEIGHT * 1.7778;
let personDescriptors = [];

const save_face_to_db = (labelJson) => {
  console.log(labelJson);
  const URL = process.env.REACT_APP_API_URL + "faces/?";
  const AUTH_STR = process.env.REACT_APP_API_AUTH;
  axios
    .post(
      URL,
      { description: JSON.stringify(labelJson) },
      {
        headers: {
          Authorization: AUTH_STR,
        },
      }
    )
    .then((response) => {
      console.log(response);
      window.location.href = "/";
    })
    .catch((error) => {
      console.log("error " + error);
    });
};

export default function sketch(p) {
  let capture = null;
  let nameToRegister = "name";
  let picturesToTake = 10;
  let handlePictureTaken;
  let picturesTaken = 0;

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.nameToRegister) {
      nameToRegister = props.nameToRegister;
    }
    if (props.picturesToTake) {
      picturesToTake = props.picturesToTake;
    }
    if (props.handlePictureTaken) {
      handlePictureTaken = props.handlePictureTaken;
    }
    if (props.picturesTaken) {
      picturesTaken = props.picturesTaken;
    }
  };

  p.setup = async function () {
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadAgeGenderModel(MODEL_URL);
    await faceapi.loadFaceExpressionModel(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);

    p.createCanvas(WIDTH, HEIGHT);
    const constraints = {
      video: {
        mandatory: {
          minWidth: WIDTH,
          minHeight: HEIGHT,
        },
        optional: [{ maxFrameRate: 40 }],
      },
      audio: false,
    };

    capture = p.createCapture(constraints, () => {});

    capture.id("video_element");
    capture.size(WIDTH, HEIGHT);
    capture.hide();
  };

  p.draw = async () => {
    if (!capture) {
      return;
    }
    p.background(255);
    p.image(capture, 0, 0);
    p.fill(0, 0, 0, 0);

    faceapi
      .detectAllFaces(capture.id())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender()
      .withFaceDescriptors()
      .then((data) => {
        console.log(data.length);
        if (data.length) {
          const person = data[0];
          if (picturesTaken < picturesToTake) {
            handlePictureTaken();
            personDescriptors.push(person.descriptor);
          } else if (picturesTaken === picturesToTake) {
            handlePictureTaken();
            const labelDescriptor = new faceapi.LabeledFaceDescriptors(
              nameToRegister,
              personDescriptors
            );
            const labelJson = labelDescriptor.toJSON();
            save_face_to_db(labelJson);
            console.log(`${nameToRegister} saved to store`);
          }
        }
      });
  };
}
import * as faceapi from "face-api.js";
// import axios from "axios";

// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = "csrftoken";

const MODEL_URL = "/models";
const HEIGHT = 180;
const WIDTH = HEIGHT * 1.7778;

const distanceList = [];
const nameList = [];
const genderList = [];
const expressionList = [];
let updateCount = 0;

const mode = (arr) => {
  return arr.sort(
    (a, b) =>
      arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
  )[arr.length - 1];
};

// const get_faces = () => {
//   const faceDescriptor = (name) =>
//     faceapi.LabeledFaceDescriptors.fromJSON(name);
//   const URL = process.env.REACT_APP_API_URL + "faces/?";
//   const AUTH_STR = process.env.REACT_APP_API_AUTH;
//   return axios
//     .get(URL, {
//       headers: {
//         Authorization: AUTH_STR,
//       },
//     })
//     .then((response) => {
//       return response.data.results.map((face) =>
//         faceDescriptor(JSON.parse(face.description))
//       );
//     })
//     .catch((error) => {
//       console.log("error " + error);
//     });
// };

// const get_expression_value = (raw_expressions) => {
//   const copiedExpression = raw_expressions;
//   const expressions = Object.keys(copiedExpression).map((key) => {
//     const value = copiedExpression[key];
//     return value;
//   });
//   const max = Math.max(...expressions);
//   return Object.keys(copiedExpression).filter((key) => {
//     return copiedExpression[key] === max;
//   })[0];
// };

export default function sketch(p) {
  let capture = null;
  // const faces = get_faces();
  let setPerson = null;

  // p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
  //   if (props.setPerson) {
  //     setPerson = props.setPerson;
  //   }
  // };

  // const update_person = (bestMatch, person) => {
  //   if (distanceList.length > 20) {
  //     distanceList.pop();
  //     nameList.pop();
  //     genderList.pop();
  //     expressionList.pop();
  //   }
  //   distanceList.push(bestMatch.distance);
  //   nameList.push(bestMatch.label.toString());
  //   genderList.push(person.gender);
  //   expressionList.push(get_expression_value(person.expressions));
  //   updateCount++;

  //   if (distanceList.length > 10 && updateCount > 10) {
  //     setPerson({
  //       distance: mode(distanceList),
  //       name: mode(nameList),
  //       gender: mode(genderList),
  //       expression: mode(expressionList),
  //     });
  //     updateCount = 0;
  //   }
  // };

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

    capture.id("video");
    capture.size(WIDTH, HEIGHT);
    capture.hide();

    console.log("setup ferdig");
  };

  p.draw = async () => {
    console.log("draw started")
    if (!capture) {
      return;
    }
    p.background(255);
    p.image(capture, 0, 0);
    p.fill(0, 0, 0, 0);

    console.log("over detection")
    faceapi
      .detectAllFaces(capture.id())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender()
      .withFaceDescriptors()
      .then((data) => {
        console.log(data);
      })
      console.log(det)
      console.log("under detection")
      // .then((data) => {
      //   console.log(data.length);
      //   if (data.length) {
      //     const person = data[0];
      //     faces.then((descriptions) => {
      //       const faceMatcher = new faceapi.FaceMatcher(descriptions);
      //       const bestMatch = faceMatcher.findBestMatch(person.descriptor);
      //       update_person(bestMatch, person);
      //     });
      //   }
      // });
  };
}
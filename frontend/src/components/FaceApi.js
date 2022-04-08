import axios from "axios";
const baseURL = "https://ambient-intelligence-group-3.cognitiveservices.azure.com/";
const subscriptionKey = "86c96d069b2e48c891a35d82c9cc6ff7";
const faceAttributes = "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise";
const detectionModel = "detection_01";
export const faceApiForUrl = axios.create({
    baseURL: baseURL,
    timeout: 50000,
    headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Content-Type": "application/json"
    },
    params: {
        returnFaceId: true,
        returnFaceLandmarks: false,
        returnFaceAttributes: faceAttributes,
        detectionModel: detectionModel
    }
});
export const faceApiForUpload = axios.create({
    baseURL: baseURL,
    timeout: 50000,
    headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Content-Type": "application/octet-stream"
    },
    params: {
        returnFaceId: true,
        returnFaceLandmarks: false,
        returnFaceAttributes: faceAttributes,
        detectionModel: detectionModel
    }
});
export const faceApiForCreatePersonGroup = axios.create({
    baseURL: baseURL,
    timeout: 50000,
    headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Content-Type": "application/json"
    },
    params: {
        personGroupId: 'ai',
    }
});
export const faceApiForIdentification = axios.create({
    baseURL: baseURL,
    timeout: 50000,
    headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Content-Type": "application/json"
    },
    params: {

    }
});
export const faceApiForTraining = axios.create({
    baseURL: baseURL,
    timeout: 50000,
    headers: {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Content-Type": "application/octet-stream"
    },
    params: {
        personGroupId: 'ai',
    }
});
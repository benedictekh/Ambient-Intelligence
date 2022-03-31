export default function CreateFaceGroup() {

    const create = () => {

        const msRest = require("@azure/ms-rest-js");
        const Face = require("@azure/cognitiveservices-face");
        // const uuid = require("uuid/v4");

        const { v4: uuidv4 } = require('uuid');
        const key = "86c96d069b2e48c891a35d82c9cc6ff7"
        const endpoint = "https://ambient-intelligence-group-3.cognitiveservices.azure.com/"

        const credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } });
        const client = new Face.FaceClient(credentials, endpoint);

        const image_base_url = "https://csdx.blob.core.windows.net/resources/Face/Images/";
        const person_group_id = uuidv4();

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function AddFacesToPersonGroup(person_dictionary, person_group_id) {
            console.log ("Adding faces to person group...");
            // The similar faces will be grouped into a single person group person.
            
            await Promise.all (Object.keys(person_dictionary).map (async function (key) {
                const value = person_dictionary[key];

                // Wait briefly so we do not exceed rate limits.
                await sleep (1000);

                let person = await client.personGroupPerson.create(person_group_id, { name : key });
                console.log("Create a person group person: " + key + ".");

                // Add faces to the person group person.
                await Promise.all (value.map (async function (similar_image) {
                    // Check if the image is of sufficent quality for recognition.
                    let sufficientQuality = true;
                    let detected_faces = await client.face.detectWithUrl(image_base_url + similar_image,
                        {
                            returnFaceAttributes: ["QualityForRecognition"],
                            detectionModel: "detection_03",
                            recognitionModel: "recognition_03"
                        });
                    detected_faces.forEach(detected_face => {
                        if (detected_face.faceAttributes.qualityForRecognition != 'high'){
                            sufficientQuality = false;
                        }
                    });

                    // Quality is sufficent, add to group.
                    if (sufficientQuality){
                        console.log("Add face to the person group person: (" + key + ") from image: " + similar_image + ".");
                        await client.personGroupPerson.addFaceFromUrl(person_group_id, person.personId, image_base_url + similar_image);
                    }
                }));
            }));

            console.log ("Done adding faces to person group.");
        }

        AddFacesToPersonGroup('../assets', "group1");

    }


    return(
        <div>
            <button onClick={create}>Click here</button>
        </div>

    )


}
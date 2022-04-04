import { faceApiForAddFaceToPerson, faceApiForCreatePersonGroup, faceApiForIdentification, faceApiForTraining } from "./FaceApi";

// id for benedicte = 0dc77f93-1e76-4ca7-91c5-ee5ce68a98ff

export default function CreateUserGroup() {
      
    const handleSubmit = async () => {
        try {
            const response = await faceApiForCreatePersonGroup.put(
            `/face/v1.0/persongroups/test`,
            {'name':'test'}

        );
        console.log(response)
        }
        catch (err) {
        console.log(err.response.data);
        window.alert("An error occured");
        }
    }

    const addPeople = async () => {
        try {
            const response = await faceApiForCreatePersonGroup.post(
            `/face/v1.0/persongroups/test/persons`,
            {'name':'Benedicte'}

        );
        console.log(response)
        }
        catch (err) {
        console.log(err.response.data);
        window.alert("An error occured");
        }
    }
    
    const trainData = async () => {
        try {
            const response = await faceApiForTraining.post(
            `/face/v1.0/persongroups/test/train`

        );
        console.log(response)
        }
        catch (err) {
        console.log(err.response.data);
        window.alert("An error occured");
        }
    }

    return(
        <div>
        <button onClick={handleSubmit}>create group</button>
        <button onClick={addPeople}>Create person</button>
        <button onClick={trainData}>Train data</button>
        </div>
    )

}
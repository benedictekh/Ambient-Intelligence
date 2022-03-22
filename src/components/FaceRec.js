function FaceRec() {

    const video = document.getElementById("video")

    const startVideo = () => {
        navigator.getUserMedia(
            {video : {} },
            stream => video.srcObject = stream,
            err => console.log(err)
        )
    }

    startVideo()
    
    return (
    <div className="FaceRec">
        <video id="video" width="720" height="560" autoPlay muted></video>
    </div>
    );
}

export default FaceRec;

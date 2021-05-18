import React, { useState, useEffect,useRef } from "react";
import ReactDOM from "react-dom";
import Player from '@vimeo/player';
import axios from "axios";

const ReactUploader = (props) => {

    var options = {
        id: 59777392,
        width: 640,
        controls:false,
        autoplay:true,
        background:true}
    const [videoId, setVideoId] = useState();
  const player= useRef();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [result, setResult] = useState();
  const [resultThumbImagePath, setResultThumbImagePath] = useState();
  const [videoIsReady, setVideoIsReady] = useState(false);
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  useEffect(() => {
    let intervalId;
    if(videoId!==undefined){

    
     intervalId = setInterval(() => {  //assign interval to a variable to clear it.
        if( !videoIsReady)
        checkVideoStatus();
    }, 10000)
}
    return () => clearInterval(intervalId); //This is important
   
  }, [videoIsReady, videoId])

  const checkVideoStatus=()=>{
      if(videoId!==undefined){
        fetch(`/check/${videoId}`)
        .then(data => data.json())
        .then(obj =>{
            if(obj?.isSuccess && obj.result=="complete")
            setVideoIsReady(true); 
        });
      }
  
  }

  useEffect(() => {


      if( videoId!==undefined && videoIsReady){
        options.id=videoId;
        player.current=new  Player('myVideo',options);
      }
     
  }, [videoId,videoIsReady])

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("sampleFile", selectedFile, selectedFile.name);

    // Details of the uploaded file
    console.log(selectedFile);

    // Request made to the backend api
    // Send formData object

    axios.post("/upload", formData).then(
      (response) => {
        console.log(response);
        if (response.data && response.data.isSuccess) {
          setResult(response.data.url);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
 


  const resultInfo = () => {
    if (result ) {
      return (
        <React.Fragment>
       
          
        </React.Fragment>
      );
    }
  };
  useEffect(() => {
    if (result ) {
     let newVideoId=result?.substr(result?.lastIndexOf("/")+1);
     console.log(`new video id: ${newVideoId}`);
           setVideoId(newVideoId);
}
     
  }, [result])

  const fileInfo = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose file</h4>
        </div>
      );
    }
  };

  return (
    <div className="flex-container">
      <h1>File Uploader</h1>
      <div>
        <input type="file" name="sampleFile" onChange={onFileChange} />
        <button onClick={()=>onFileUpload()}>Upload video </button>
      </div>
      {fileInfo()}
      {result && resultInfo()}

      <div id="myVideo">
          
          </div>
    </div>
  );
};
export default ReactUploader;
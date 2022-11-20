import React, { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import classes from "./Uploader.module.css";

const backendURL = "http://localhost:4000";

const Uploader = () => {
  const fileInputRef = useRef();
  const [imageFile, setImageFile] = useState("");
  const [imageDropped, setImageDropped] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const textRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");

  const imageUploadHandler = useCallback(() => {
    const imageType = /image.*/;
    if (!imageFile.type.match(imageType)) {
      alert("Sorry, only images are allowed");
      return;
    }
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      setUploadingImage(true);
      axios
        .post(`${backendURL}/image/upload`, { image: fileURL })
        .then(({ data }) => {
          console.log(data.image._id);
          setImageUrl(`${backendURL}/image/details/${data.image._id}`);
          setUploadingImage(false);
        })
        .catch((err) => {
          console.log(err);
          setUploadingImage(false);
        });
      setImageSrc(fileURL);
      setImageDropped(true);
    };
    fileReader.readAsDataURL(imageFile);
  }, [imageFile]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImageFile(e.dataTransfer.files[0]);
    // console.log(e.dataTransfer.files[0]);
  };

  const imageInputHandler = (e) => {
    setImageFile(e.target.files[0]);
  };

  useEffect(() => {
    if (imageFile) {
      imageUploadHandler();
    }
  }, [imageFile, imageUploadHandler]);

  const copyTextHandler = (e) => {
    textRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    // setCopySuccess('Copied!');
  };

  return (
    <div className={classes.uploader}>
      {imageSrc ? (
        <>
          <FontAwesomeIcon icon={faCircleCheck} color="#219653" fontSize={35}/>
          <h1>Uploaded Successfully!</h1>
        </>
      ) : (
        <>
          <h1>{!uploadingImage ? "Upload Your Image" : "Uploading"}</h1>
          <h6>File should be jpeg,png,..</h6>
        </>
      )}
      <form
        className={classes.inputDiv}
        onDrop={handleDrop}
        onDragOver={handleDragIn}
        onDragLeave={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="file"
          placeholder="Drag and drop your Image here"
          ref={fileInputRef}
          onChange={imageInputHandler}
          hidden={true}
        />
        {!imageDropped ? (
          <>
            <div className={classes.image}>image</div>
            <label>Drag & Drop your image here</label>
          </>
        ) : (
          <img src={imageSrc} alt="" />
        )}
      </form>
      {!imageUrl ? (
        <>
          <span>or</span>
          <button onClick={() => fileInputRef.current.click()}>
            Choose File
          </button>
        </>
      ) : (
        <footer>
          <input
            ref={textRef}
            value={imageUrl}
            type="text"
            className={classes.textInput}
            readOnly
          />
          <button onClick={copyTextHandler}>Copy Link</button>
        </footer>
      )}
    </div>
  );
};

export default Uploader;

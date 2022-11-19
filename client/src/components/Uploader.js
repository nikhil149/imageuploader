import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from "./Uploader.module.css";

const Uploader = () => {
  const fileInputRef = useRef();
  const [imageFile, setImageFile] = useState("");
  const [imageDropped, setImageDropped] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const imageUploadHandler = useCallback(() => {
    const imageType = /image.*/;
    if (!imageFile.type.match(imageType)) {
      alert("Sorry, only images are allowed");
      return;
    }
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
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

  return (
    <div className={classes.uploader}>
      <h1>Upload Your Image</h1>
      <h6>File should be jpeg,png,..</h6>
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
      <span>or</span>
      <button onClick={() => fileInputRef.current.click()}>Choose File</button>
    </div>
  );
};

export default Uploader;

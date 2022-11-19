import React, { useRef, useState } from "react";
import classes from "./Uploader.module.css";

const Uploader = () => {
  const fileInputRef = useRef();
  const [drag, setDrag] = useState(false);
  const [imageDropped, setImageDropped] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("DRAG LEAVE");
  };
  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("DRAG oVER");
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    const image = e.dataTransfer.files[0];
    const imageType = /image.*/;

    if (!image.type.match(imageType)) {
      alert("Sorry, only images are allowed");
      return;
    }
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      setImageSrc(fileURL);
      setImageDropped(true);
    };
    fileReader.readAsDataURL(image);
    // console.log(e.dataTransfer.files[0]);
  };
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
        {!imageDropped ? (
          <>
            <input
              type="file"
              placeholder="Drag and drop your Image here"
              ref={fileInputRef}
            />
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

import React from "react";

const AudioPlayer = ({ audioName, audioUrl }) => {
  return (
    <div>
      <figure>
        <figcaption>{audioName}</figcaption>
        <audio controls src={audioUrl} autoPlay>
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </figure>
    </div>
  );
};

export default AudioPlayer;

import React, { useState, useEffect } from "react";
import Axios from "axios";
import LOGO from "../Images/LOGO.png";
import PLAY from "../Images/play-button.png";
import AudioPlayer from "./AudioPlayer";

const Dashboard = () => {
  const [state, setState] = useState({ files: [] });
  const [audio, setAudio] = useState({ name: "", url: "", play: false });

  useEffect(() => {
    const source = Axios.CancelToken.source();
    const fetchFiles = async () => {
      await Axios.get("https://gcsound-vault.herokuapp.com/files", {
        cancelToken: source.token,
      })
        .then((res) => {
          setState({ ...state, files: [...res.data] });
        })
        .catch((err) => {
          if (Axios.isCancel(err)) {
            console.log(err);
          }
        });
    };
    fetchFiles();
    return () => {
      source.cancel();
    };
  }, [state]);
  return (
    <div className="dashboard">
      {state.files.map((file) => {
        return (
          <div className="card" key={file._id}>
            <div className="card__side card__side--front">
              <img src={LOGO} alt="logo" />
              <p>{file.name}</p>
            </div>

            <div
              className="card__side card__side--back card__side--back-1"
              onClick={() => {
                setAudio({
                  ...audio,
                  name: file.name,
                  url: file.audio[0].public_url,
                  play: true,
                });
              }}
            >
              <img src={PLAY} alt="play button" />
              <p>Play</p>
            </div>
          </div>
        );
      })}
      <div className={audio.play ? "audio-player" : "hide"}>
        <div>
          <p
            className="stop"
            onClick={() =>
              setAudio({ ...state, name: "", url: "", play: false })
            }
          >
            Close player
          </p>
          <AudioPlayer audioName={audio.name} audioUrl={audio.url} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

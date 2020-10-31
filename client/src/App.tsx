import "./styles/main.scss";
import axios from "axios/axios";
import React, { useEffect } from "react";

import Header from "components/core/Header/Header";

const App = () => {
  useEffect(() => {
    const isAuthed = async () => {
      await axios
        .get("/isauthed")
        .then(res => {
          console.log("res", res);
        })
        .catch(err => {
          console.log("err", err);
        });
    };
    isAuthed();
  }, []);

  return (
    <div className='main'>
      <Header />
      MainPage
      <br />
      DashBoard
    </div>
  );
};

export default App;

import React, { Component } from "react";
import StudyListExample from "./StudyListExample.js";
import { ToolbarSection } from "react-viewerbase";
import { datas } from "./data";
import axios from "axios";
export default class UserPreferencesExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studies: {},
      buttons: [],
      activeButtons: ["Pan"],
      setToolActive: () => {
        alert("pressed");
      }
    };
  }

  render() {
    return (
      <div
        className="row"
        style={
          /* This style settings is just to wrap the component and set a dark background (like on OHIF) */
          {
            backgroundColor: "#000",
            height: "600px",
            color: "#fff",
            paddingLeft: 40,
            paddingRight: 40
          }
        }
      >
        <ToolbarSection buttons={[]} />
        <StudyListExample />
      </div>
    );
  }
}

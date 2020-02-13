import React, { Component } from "react";
import { ToolbarSection } from "react-viewerbase";

class ToolbarExample extends Component {
  constructor(props) {
    super(props);

    this.exampleButtons = [
      {
        id: "PanTool",
        label: "pan",
        icon: "arrows",
        type: "setToolActive",
        commandName: "setToolActive",
        commandOptions: { toolName: "PanTool" }
      },
      {
        id: "zoom",
        label: "zoom",
        icon: "search",
        type: "setToolActive",
        commandName: "setToolActive",
        commandOptions: { toolName: "zoom" }
      },
      {
        id: "bidirectional",
        label: "Bidirectional",
        icon: "measure-target",
        type: "setToolActive",
        commandName: "setToolActive",
        commandOptions: { toolName: "zoom" }
      },
      {
        id: "reset",
        label: "Reset",
        icon: "reset",
        type: "setToolActive",
        commandName: "setToolActive",
        commandOptions: { toolName: "reset" }
      },
      {
        id: "level",
        label: "Level",
        icon: "level",
        type: "setToolActive",
        commandName: "setToolActive",
        commandOptions: { toolName: "level" }
      },
      {
        id: "StackScroll",
        label: "Stack Scroll",
        icon: "bars",
        type: "setToolActive",
        commandName: "setToolActive",
        commandOptions: { toolName: "StackScroll" },
        active: false
      },

      {
        id: "More",
        label: "More",
        icon: "ellipse-circle",
        buttons: [
          {
            id: "cstInvert",
            label: "Invert",
            icon: "circle",
            type: "command",
            commandName: "invertViewport"
          }
        ]
      }
    ];

    this.state = {
      buttons: this.exampleButtons,
      activeCommand: "WwwcTool"
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-lg-6">
          <ToolbarSection
            buttons={this.exampleButtons}
            activeButtons={["Pan"]}
            setToolActive={() => {
              alert("pressed");
            }}
          />
        </div>
      </div>
    );
  }
}

export default ToolbarExample;

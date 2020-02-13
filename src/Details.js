import React, { Component } from "react";
import { SimpleDialog, MeasurementTable } from "./react-viewerbase/src";
import { ToolbarSection, Icon } from "react-viewerbase";
import WrappedStudyBrowser from "./WrappedStudyBrowser";
import CornerstoneViewport from "react-cornerstone-viewport";
import dicomParser from "dicom-parser";
import cornerstone from "cornerstone-core";
import CornerstoneElement from "./react-viewerbase/src/studyBrowser/enableElem";

//import cornerstoneWebImageLoader from "cornerstone-web-image-loader";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import cornerstoneMath from "cornerstone-math";
import cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import _ from "lodash";

import { data } from "./datas";

function initCornerstone() {
  // Cornerstone Tools
  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.Hammer = Hammer;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

  //cornerstone WADO Image Loader
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

  cornerstoneWADOImageLoader.webWorkerManager.initialize({
    maxWebWorkers: navigator.hardwareConcurrency || 1,
    startWebWorkersOnDemand: true,
    taskConfiguration: {
      decodeTask: {
        initializeCodecsOnStartup: false,
        usePDFJS: true,
        strict: false
      }
    }
  });

  //cornerstone Web Image Loader
  window.cornerstoneWebImageLoader.external.cornerstone = cornerstone;

  window.cornerstoneWebImageLoader.configure({
    beforeSend: function(xhr) {
      // Add custom headers here (e.g. auth tokens)
      //xhr.setRequestHeader('x-auth-token', 'my auth token');
    }
  });

  cornerstoneTools.init();
}

export default class UserPreferencesExample extends Component {
  constructor(props) {
    super(props);

    initCornerstone();
    this.state = {
      image: null,
      selectedIndex: null,
      tools: [
        // Mouse
        {
          name: "Wwwc",
          mode: "active",
          modeOptions: { mouseButtonMask: 1 }
        },
        {
          name: "Zoom",
          mode: "active",
          modeOptions: { mouseButtonMask: 2 }
        },
        {
          name: "Pan",
          mode: "active",
          modeOptions: { mouseButtonMask: 4 }
        },
        "Length",
        "Angle",
        "Bidirectional",
        "FreehandRoi",
        "Eraser",
        // Scroll
        { name: "StackScrollMouseWheel", mode: "active" },
        // Touch
        { name: "PanMultiTouch", mode: "active" },
        { name: "ZoomTouchPinch", mode: "active" },
        { name: "StackScrollMultiTouch", mode: "active" }
      ],
      cornerstoneElement: null,
      value: null,
      options: [
        {
          value: "studies",
          icon: "th",
          bottomLabel: "Series"
        },
        {
          value: "measurements",
          icon: "th-list",
          bottomLabel: "Measurements"
        }
      ],
      selectedCell: {
        className: "hover",
        col: 1,
        row: 1
      },
      file: "",
      id: 0,
      index: -1,
      series: [],
      images: [
        {
          thumbnails: []
        }
      ],
      activeTool: "Wwwc",
      imageIdIndex: 0,
      isPlaying: false,
      frameRate: 22
    };
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
  }

  componentDidMount() {
    const index = _.findIndex(
      data,
      i => i.studyInstanceUID === this.props.match.params.id
    );

    this.setState({ index });

    let ar = [];

    if (index > -1) {
      ar = data[index].dataSets;

      for (let index = 0; index < ar.length; index++) {
        const element = ar[index];
        this.state.images[0].thumbnails.push({
          id: index,
          imageSrc: element,
          // "https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg",
          seriesDescription: "Anti-PD-1_Lung" + index,
          active: true,
          study: "study",
          seriesNumber: index,
          instance: element,
          numImageFrames: 512,
          stackPercentComplete: 30
        });
      }
      this.setState({ images: this.state.images });
    }
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <div className="row">
          <th>
            <div style={{}} onClick={() => (window.location.href = "/")}>
              <div
                style={{
                  fontSize: "17px",
                  cursor: "pointer",
                  wordWrap: "break-word",
                  color: "#fff"
                }}
              >
                {"<< Retour à la liste"}
              </div>
            </div>
          </th>
          <tr
            className="col-lg-8 offset-lg-4"
            style={{ padding: 10, marginTop: -30 }}
          >
            {[
              { name: "Wwwc", label: "Wwwc", icon: "3d-rotate" },
              { name: "Zoom", label: "Zoom", icon: "search" },
              { name: "Pan", label: "Pan", icon: "arrows" },
              { name: "Length", label: "Length", icon: "measure-target" },
              {
                name: "Bidirectional",
                label: "Bidirectional",
                icon: "arrows-alt-h"
              },
              { name: "Angle", label: "Angle", icon: "angle-left" },
              {
                name: "FreehandRoi",
                label: "FreehandRoi",
                icon: "measure-non-target"
              },
              {
                name: "StackScrollMouseWheel",
                label: "stackScroll",
                icon: "bars"
              },
              { name: "Magnify", label: "Magnify", icon: "bars" },
              { name: "Reset", label: "Reset", icon: "reset" }
            ].map(elem => (
              <th>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "2px",
                    backgroundColor:
                      this.state.activeTool === elem.name
                        ? "red"
                        : "rgb(11, 95, 255)",
                    borderRadius: "4px",
                    padding: "8px",
                    alignItems: "center",
                    cursor: "pointer"
                  }}
                  onClick={() => this.setState({ activeTool: elem.name })}
                >
                  <Icon name={elem.icon} color={"#fff"} />
                  <div
                    style={{
                      fontSize: "12px",
                      wordWrap: "break-word",
                      color: "#fff"
                    }}
                  >
                    {elem.label}
                  </div>
                </div>
              </th>
            ))}
            <th>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "2px",
                  backgroundColor: "rgb(11, 95, 255)",
                  borderRadius: "4px",
                  padding: "8px",
                  alignItems: "center",
                  cursor: "pointer"
                }}
              >
                <Icon name={"level"} color={"#fff"} />
                <div
                  style={{
                    fontSize: "12px",
                    wordWrap: "break-word",
                    color: "#fff"
                  }}
                >
                  {"levels"}
                </div>
              </div>
            </th>
          </tr>
        </div>

        <div
          className="row"
          style={{
            backgroundColor: "#000",

            color: "#fff"
          }}
        >
          <div
            className="col-lg-3"
            style={{ height: 600, overflowY: "scroll" }}
          >
            <WrappedStudyBrowser
              studies={this.state.images}
              onThumbnailClick={id => {
                this.setState({ id: id });
              }}
              onThumbnailDoubleClick={id => {
                this.setState({ id: id });
              }}
            />
          </div>
          <div
            className="col-lg-9"
            style={{ height: 600, overflowY: "scroll" }}
          >
            {this.state.index > -1 ? (
              <CornerstoneViewport
                tools={this.state.tools}
                imageIds={[data[this.state.index].dataSets[this.state.id]]}
                style={{
                  marginLeft: "0%",
                  width: "100%",
                  height: 600,
                  border: "2px solid #3c5d80"
                }}
                activeTool={this.state.activeTool}
                onElementEnabled={elementEnabledEvt => {
                  const cornerstoneElement = elementEnabledEvt.detail.element;

                  //console.log(cornerstoneElement);

                  // const viewport = JSON.parse(
                  //   localStorage.getItem("viewport")
                  // );
                  // Save this for later

                  // Wait for image to render, then invert it
                  cornerstoneElement.addEventListener(
                    "cornerstoneimagerendered",
                    imageRenderedEvent => {
                      //console.log(imageRenderedEvent.detail.viewport);

                      const viewport = imageRenderedEvent.detail.viewport;
                      // localStorage.setItem(
                      //   "viewport",
                      //   JSON.stringify(viewport)
                      // );
                      // this.setState(
                      //   {
                      //     cornerstoneElement: viewport
                      //   },
                      //   () => {
                      //     console.log(this.state.cornerstoneElement);
                      //   }
                      // );
                      const invertedViewport = Object.assign({}, viewport, {
                        invert: false
                      });

                      cornerstone.setViewport(
                        cornerstoneElement,
                        invertedViewport
                      );
                    }
                  );
                }}
              />
            ) : null}
          </div>

          {/* <MeasurementTableExample /> */}

          {/* <div>
            <h2>Grid Demo</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <CornerstoneViewport
                style={{ minWidth: "50%", height: "256px", flex: "1" }}
                tools={this.state.tools}
                imageIds={this.state.imageIds}
                imageIdIndex={this.state.imageIdIndex}
                isPlaying={this.state.isPlaying}
                frameRate={this.state.frameRate}
                className={this.state.activeViewportIndex === 0 ? "active" : ""}
                activeTool={this.state.activeTool}
                setViewportActive={() => {
                  this.setState({
                    activeViewportIndex: 0
                  });
                }}
              />
            </div>

           
            <h2>Misc. Props</h2>
            <p>
              Note, when we change the active stack, we also need to update the
              imageIdIndex prop to a value that falls within the new stack's
              range of possible indexes.
            </p>
            <div style={{ marginTop: "35px" }}>
              <form className="row">
               
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="active-tool">Active Tool:</label>
                    <select
                      value={this.state.activeTool}
                      onChange={evt =>
                        this.setState({ activeTool: evt.target.value })
                      }
                      className="form-control"
                      id="active-tool"
                    >
                      <option value="Wwwc">Wwwc</option>
                      <option value="Zoom">Zoom</option>
                      <option value="Pan">Pan</option>
                      <option value="Length">Length</option>
                      <option value="Angle">Angle</option>
                      <option value="Bidirectional">Bidirectional</option>
                      <option value="FreehandRoi">Freehand</option>
                      <option value="Eraser">Eraser</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="image-id-index">Image ID Index:</label>
                    <input
                      type="range"
                      min="0"
                      max={this.state.imageIds.length - 1}
                      value={this.state.imageIdIndex}
                      onChange={evt =>
                        this.setState({
                          imageIdIndex: parseInt(evt.target.value)
                        })
                      }
                      className="form-control"
                      id="image-id-index"
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="image-id-stack">Image ID Stack:</label>
                    <select
                      defaultValue={1}
                      onChange={evt => {
                        const selectedStack =
                          parseInt(evt.target.value) === 1
                            ? "stack1"
                            : "stack2";

                        this.setState({
                          imageIds: selectedStack,
                          imageIdIndex: 0
                        });
                      }}
                      className="form-control"
                      id="image-id-stack"
                    >
                      <option value="1">Stack 1</option>
                      <option value="2">Stack 2</option>
                    </select>
                  </div>
                </div>
              
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="active-viewport-index">
                      Active Viewport Index:
                    </label>
                    <input
                      type="text"
                      readOnly={true}
                      value={this.state.activeViewportIndex}
                      className="form-control"
                      id="active-viewport-index"
                    ></input>
                  </div>
                  <div className="input-group">
                    <span className="input-group-btn">
                      <button
                        className="btn btn-default"
                        type="button"
                        onClick={() => {
                          this.setState({
                            isPlaying: !this.state.isPlaying
                          });
                        }}
                      >
                        {this.state.isPlaying ? "Stop" : "Start"}
                      </button>
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.frameRate}
                      onChange={evt => {
                        const frameRateInput = parseInt(evt.target.value);
                        const frameRate = Math.max(
                          Math.min(frameRateInput, 90),
                          1
                        );

                        this.setState({ frameRate });
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>

          </div>
        */}
        </div>
      </div>
    );
  }
}

class SimpleDialogExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      inputValue: "",
      selectValue: "",
      dialogStyle: {
        top: "50px",
        left: "100px"
      }
    };
  }
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <h3>Simple Dialog</h3>
        </div>
        <div className="col-xs-12">
          <p>
            Its similar to a modal but we can pass its style as props and
            manipulate it as we want.
          </p>
          <p>Initially used to display tool data changes inot Viewport</p>
        </div>
        <div className="col-xs-6">
          <button onClick={this.openDialog} className="btn btn-primary">
            {this.state.isDialogOpen ? "Close Dialog" : "Open Dialog"}
          </button>
        </div>
        <div className="col-xs-6">
          <span>Input value: {this.state.inputValue}</span>
        </div>
        <div className="offset-xs-6 col-xs-6">
          <span>Select value: {this.state.selectValue}</span>
        </div>
        <SimpleDialog
          isOpen={this.state.isDialogOpen}
          headerTitle="Example Dialog Header"
          onClose={this.closeDialog}
          onConfirm={this.onConfirm}
          componentStyle={this.state.dialogStyle}
        >
          <label htmlFor="input" className="simpleDialogLabelFor">
            Input Example
          </label>
          <input
            id="input"
            type="text"
            className="simpleDialogInput"
            autoComplete="off"
            ref={input => {
              this.input = input;
            }}
          />
          <label htmlFor="select" className="simpleDialogLabelFor">
            SelectExample
          </label>
          <select
            name="select"
            id="select"
            className="simpleDialogSelect"
            ref={select => {
              this.select = select;
            }}
          >
            <option value="Option1">Option1</option>
            <option value="Option2">Option2</option>
            <option value="Option3">Option3</option>
            <option value="Option4">Option4</option>
          </select>
        </SimpleDialog>
      </div>
    );
  }

  openDialog = () => {
    this.setState({
      isDialogOpen: !this.state.isDialogOpen
    });
  };

  closeDialog = () => {
    this.setState({
      isDialogOpen: false
    });
  };

  onConfirm = () => {
    this.setState({
      isDialogOpen: false,
      inputValue: this.input.value,
      selectValue: this.select.value
    });
  };
}

class MeasurementTableExample extends Component {
  constructor() {
    super();

    this.state = {
      overwallWarnings: {
        warningList: [
          "All measurements should have a location",
          "Nodal lesions must be >= 15mm short axis AND >= double the acquisition slice thickness by CT and MR"
        ]
      },
      timepoints: [
        {
          label: "Follow-up 2",
          date: "20-Dec-18"
        },
        {
          label: "Follow-up 1",
          date: "15-Jun-18"
        },
        {
          label: "Baseline",
          date: "10-Apr-18"
        }
      ],
      measurementCollection: [
        {
          maxMeasurements: 5,
          groupName: "Targets",
          measurements: [
            {
              label: "Chest Wall Posterior",
              hasWarnings: true,
              warningTitle: "Criteria nonconformities",
              isSplitLesion: false,
              warningList: [
                "All measurements should have a location",
                "Nodal lesions must be >= 15mm short axis AND >= double the acquisition slice thickness by CT and MR"
              ],
              data: [
                {
                  displayText: "25.7 x 12.9"
                },
                {
                  displayText: "24.7 x 11.5"
                },
                {}
              ]
            },
            {
              label: "Bone Extremity",
              data: [
                {
                  displayText: "24.7 x 11.1"
                },
                {
                  displayText: "21.2 x 10.9"
                },
                {}
              ]
            }
          ]
        },
        {
          maxMeasurements: 3,
          groupName: "NonTargets",
          measurements: [
            {
              label: "Chest Wall Single Site",
              data: [
                {
                  displayText: "MD"
                },
                {
                  displayText: "NM"
                },
                {}
              ]
            },
            {
              label: "Extremity Multiple Sites",
              data: [
                {
                  displayText: "CR"
                },
                {},
                {}
              ]
            },
            {
              label: "Extremity Site",
              data: [
                {
                  displayText: "CR"
                },
                {},
                {
                  displayText: "NM"
                }
              ]
            }
          ]
        }
      ]
    };
  }
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          {/* <h3>Measurement Table</h3>
          <p>Timepoints JSON data</p>
          <pre style={{ maxHeight: "225px", overflowX: "auto" }}>
            {JSON.stringify(this.state.timepoints, null, 4)}
          </pre>
          <p>Measurements JSON data</p>
          <pre style={{ maxHeight: "225px", overflowX: "auto" }}>
            {JSON.stringify(this.state.measurementCollection, null, 4)}
          </pre> */}
        </div>
        <div
          className="col-xs-12 col-sm-6"
          style={{ height: "400px", width: 300, marginTop: "65px" }}
        >
          <MeasurementTable
            timepoints={this.state.timepoints}
            measurementCollection={this.state.measurementCollection}
            overwallWarnings={this.state.overwallWarnings}
          ></MeasurementTable>
        </div>
      </div>
    );
  }
}

class ToolbarExample extends Component {
  constructor(props) {
    super(props);

    this.exampleButtonss = [
      {
        command: "PanTool",
        type: "tool",
        text: "Pan",
        svgUrl: "/icons.svg#icon-tools-pan",
        active: false
      },
      {
        command: "ZoomTool",
        type: "tool",
        text: "Zoom",
        svgUrl: "/icons.svg#icon-tools-zoom",
        active: false
      },
      {
        command: "Bidirectional",
        type: "tool",
        text: "Bidirectional",
        svgUrl: "/icons.svg#icon-tools-measure-target",
        active: false
      },
      {
        command: "StackScroll",
        type: "tool",
        text: "Stack Scroll",
        svgUrl: "/icons.svg#icon-tools-stack-scroll",
        active: false
      },
      {
        command: "reset",
        type: "command",
        text: "Reset",
        svgUrl: "/icons.svg#icon-tools-reset",
        active: false
      },
      {
        command: "WwwcTool",
        type: "tool",
        text: "Manual",
        svgUrl: "/icons.svg#icon-tools-levels",
        active: true
      }
    ];

    this.state = {
      buttons: this.exampleButtonss,
      activeCommand: "WwwcTool"
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-lg-6">
          <h3>Toolbar Section</h3>
          <p>A basic row of buttons for a toolbar.</p>
          <p>Active command is {this.state.activeCommand}</p>
        </div>
        <div className="col-xs-12 col-lg-6">
          <ToolbarSection
            buttons={this.state.buttons}
            activeCommand={this.state.activeCommand}
            setToolActive={toolProps => {
              this.setState((state, props) => {
                return { activeCommand: toolProps.command };
              });
            }}
          />
        </div>
      </div>
    );
  }
}

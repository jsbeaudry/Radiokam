import React, { Component } from "react";
import { LayoutButton } from "react-viewerbase";
import WrappedStudyBrowser from "./WrappedStudyBrowser";
import axios from "axios";
import CornerstoneViewport from "react-cornerstone-viewport";
import dicomParser from "dicom-parser";
import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import cornerstoneMath from "cornerstone-math";
import cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import ToolbarExample from "./Toolbars";

import { data } from "./datas";

function initCornerstone() {
  // Cornerstone Tools
  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.Hammer = Hammer;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneTools.init();

  // Image Loader
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  cornerstoneWADOImageLoader.webWorkerManager.initialize({
    maxWebWorkers: navigator.hardwareConcurrency || 1,
    startWebWorkersOnDemand: true,
    taskConfiguration: {
      decodeTask: {
        initializeCodecsOnStartup: false,
        usePDFJS: false,
        strict: false
      }
    }
  });
}

const studies = [
  {
    thumbnails: [
      {
        imageSrc:
          "https://raw.githubusercontent.com/crowds-cure/cancer/master/public/screenshots/Anti-PD-1_Lung.jpg",
        seriesDescription: "Anti-PD-1_Lung",
        active: true,
        seriesNumber: "2",
        numImageFrames: 512,
        stackPercentComplete: 30
      }
    ]
  }
];
export default class UserPreferencesExample extends Component {
  constructor(props) {
    super(props);
    initCornerstone();
    this.state = {
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

      series: [],
      images: [
        {
          thumbnails: []
        }
      ]
    };
  }

  getSeries(id) {
    let self = this;
    axios(`http://localhost:3001/series/${id}`)
      .then(data => {
        for (var i = 0; i < data.data.data.length; i++) {
          const regex = /0020000E/gi;
          let a = JSON.stringify(data.data.data[i]).replace(regex, "id");

          const study = self.props.match.params.id;
          let serieid = JSON.parse(a).id.Value[0];

          axios(`http://localhost:3001/instances/${study}/${serieid}`)
            .then(instance => {
              console.log("instance");
              console.log(instance.data.data);

              let instances = instance.data.data;

              for (let index = 0; index < instances.length; index++) {
                const element = instances[index];
                const regex2 = /00080018/gi;
                let b = JSON.stringify(element).replace(regex2, "id");

                self.state.images[0].thumbnails.push({
                  imageSrc:
                    "https://raw.githubusercontent.com/crowds-cure/cancer/master/public/screenshots/Anti-PD-1_Lung.jpg",
                  seriesDescription: "Anti-PD-1_Lung",
                  active: true,
                  study: study,
                  seriesNumber: serieid,
                  instance: JSON.parse(b).id.Value[0],
                  numImageFrames: 512,
                  stackPercentComplete: 30
                });
                console.log(self.state.images[0].thumbnails);

                self.setState({ images: self.state.images });
              }
            })
            .catch(error => {
              console.log("Error");
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log("Error");
        console.log(error);
      });
  }
  getInstDcom(study, serie, instance) {
    let self = this;
    axios(`http://localhost:3001/getdicom/${study}/${serie}/${instance}`)
      .then(data => {
        console.log(data);
        this.setState({ file: data.data });
      })
      .catch(error => {
        console.log("Error");
        console.log(error);
      });
  }
  componentDidMount() {
    // this.getSeries(this.props.match.params.id);

    let ar =
      data.filter(i => i.studyInstanceUid === this.props.match.params.id)
        .length > 0
        ? data.filter(i => i.studyInstanceUid === this.props.match.params.id)
            .dataSets
        : [];
    this.setState({
      series: ar
    });
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <p style={{ color: "#fff" }}>
          {" "}
          {JSON.stringify(this.state.studies, null, 2)}
        </p>
        <ToolbarExample />

        <div
          className="row"
          style={{
            backgroundColor: "#000",

            color: "#fff"
          }}
        >
          <div className="row" style={{ marginLeft: 0 }}>
            <div className="col-lg-4">
              <WrappedStudyBrowser
                studies={this.state.images}
                onThumbnailClick={id => {
                  this.getInstDcom(
                    this.state.images[0].thumbnails[id].study,
                    this.state.images[0].thumbnails[id].seriesNumber,
                    this.state.images[0].thumbnails[id].instance
                  );
                }}
                onThumbnailDoubleClick={() => {
                  console.warn("onThumbnailDoubleClick");
                  alert("onThumbnailDoubleClick");
                  console.warn(this);
                }}
              />
            </div>
          </div>

          <CornerstoneViewport
            tools={this.state.tools}
            imageIds={data[0].dataSets}
            style={{
              width: "100%",
              height: 600,
              border: "2px solid #3c5d80"
            }}
          />
        </div>
      </div>
    );
  }
}

// Importing React
import React from "react";

// Importing all the dependencies for the Cornerstone library

import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";

// Listing the dependencies for reference later
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWebImageLoader.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;

// The image, from a url, that we will be uploading and viewing with code below.

// Initiating a class component
class ImageViewer extends React.Component {
  constructor(props) {
    super(props);
    // Any inherited properties could be referenced here
  }

  render() {
    return (
      <div>
        <div
          id={this.props.id}
          style={{ width: 120, height: 100, objectFit: "cover" }}
        />
      </div>
    );
  }
  componentDidMount() {
    // The <div> element that was created above \\
    const element = document.getElementById(this.props.id);

    //
    // element.setAttribute(
    //   "style",
    //   "background-color: red; width: 200px; height: 220px;"
    // );
    //

    // the <div> so it can render the given image
    cornerstone.enable(element);
    // The custom image loader (from Cornerstone) that displays the image in the <div> element
    cornerstone.loadImage(this.props.imageSrc).then(function(image) {
      cornerstone.displayImage(element, image);
    });
  }
}

export default ImageViewer;

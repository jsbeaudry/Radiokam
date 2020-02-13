import React, { Component } from "react";
import {
  StudyBrowser,
  ViewerbaseDragDropContext
} from "./react-viewerbase/src";

class StudyBrowserExample extends Component {
  render() {
    //const viewportData = [null, null, null, null];

    return (
      <div style={{}}>
        <StudyBrowser
          studies={this.props.studies}
          onThumbnailClick={this.props.onThumbnailClick}
          onThumbnailDoubleClick={this.props.onThumbnailDoubleClick}
        />
      </div>
    );
  }
}

export default ViewerbaseDragDropContext(StudyBrowserExample);

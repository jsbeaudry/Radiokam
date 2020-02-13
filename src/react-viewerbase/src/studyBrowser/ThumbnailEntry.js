import React, { Component } from "react";
import PropTypes from "prop-types";
import ImageThumbnail from "./ImageThumbnail";
import "./ThumbnailEntry.styl";
import classnames from "classnames";

class ThumbnailEntry extends Component {
  static defaultProps = {
    active: false,
    error: false,
    stackPercentComplete: 0
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    imageSrc: PropTypes.string,
    imageId: PropTypes.string,
    error: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    stackPercentComplete: PropTypes.number,
    seriesDescription: PropTypes.string,
    seriesNumber: PropTypes.string,
    instanceNumber: PropTypes.string,
    numImageFrames: PropTypes.number,
    onDoubleClick: PropTypes.func,
    onClick: PropTypes.func
  };

  render() {
    const hasInstanceNumber = this.props.instanceNumber !== undefined;

    let className = classnames("ThumbnailEntry noselect", {
      active: this.props.active
    });
    const infoOnly = false;

    return (
      <div
        className={className}
        onClick={this.onClick}
        onDoubleClick={this.onDoubleClick}
        onMouseDown={this.onMouseDown}
      >
        <div className="p-x-1">
          <ImageThumbnail
            id={this.props.id}
            imageSrc={this.props.imageSrc}
            imageId={this.props.imageId}
            error={this.props.error}
            stackPercentComplete={this.props.stackPercentComplete}
          />
        </div>
        <div
          className={infoOnly ? "series-details info-only" : "series-details"}
        >
          <div className="series-description">
            {this.props.seriesDescription}
          </div>
          <div className="series-information">
            <div className="item item-series clearfix">
              <div className="icon">S:</div>
              <div className="value">{this.props.seriesNumber}</div>
            </div>
            {hasInstanceNumber && (
              <div className="item item-series clearfix">
                <div className="icon">I:</div>
                <div className="value">{this.props.instanceNumber}</div>
              </div>
            )}
            <div className="item item-frames clearfix">
              <div className="icon">
                <div />
              </div>
              <div className="value">{this.props.numImageFrames}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  onDoubleClick = () => {
    if (this.props.onDoubleClick) {
      this.props.onDoubleClick();
    }
  };
}

export default ThumbnailEntry;

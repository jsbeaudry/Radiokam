import React, { Component } from "react";
import { StudyList } from "./react-viewerbase/src";
import FilesUploadComponent from "./Upload";
import { data } from "./datas";

class StudyListExample extends Component {
  constructor(props) {
    super(props);

    this.defaultStudies = data.sort(function(a, b) {
      if (a.patientName < b.patientName) {
        return -1;
      }
      if (a.patientName > b.patientName) {
        return 1;
      }
      return 0;
    });

    this.rowsPerPage = 50;
    this.defaultSort = { field: "patientName", order: "desc" };

    this.state = {
      searchData: {},
      studies: this.defaultStudies.slice(0, this.rowsPerPage)
    };

    this.onSearch = this.onSearch.bind(this);
  }

  formatDate = date => {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return monthNames[monthIndex] + " " + day + ", " + year;
  };

  onImport(event) {
    alert("Import study mock " + event);
  }

  onSelectItem(studyInstanceUID) {
    window.location.href = "/details/" + studyInstanceUID;
  }

  onSearch(searchData) {
    this.setState({ searchData });

    const filter = (key, searchData, study) => {
      if (searchData[key] && !study[key].includes(searchData[key])) {
        return false;
      } else {
        return true;
      }
    };

    const { field, order } = searchData.sortData;

    // just a example of local filtering
    let filteredStudies = this.defaultStudies
      .filter(function(study) {
        const all = [
          "patientName",
          "patientId",
          "accessionNumber",
          "modalities",
          "studyDescription"
        ].every(key => {
          return filter(key, searchData, study);
        });

        return all;
      })
      .sort(function(a, b) {
        if (order === "desc") {
          if (a[field] < b[field]) {
            return -1;
          }
          if (a[field] > b[field]) {
            return 1;
          }
          return 0;
        } else {
          if (a[field] > b[field]) {
            return -1;
          }
          if (a[field] < b[field]) {
            return 1;
          }
          return 0;
        }
      });

    // User can notice the loading icon
    return new Promise(resolve => {
      setTimeout(() => {
        const first = searchData.currentPage * searchData.rowsPerPage;
        let last =
          searchData.currentPage * searchData.rowsPerPage +
          searchData.rowsPerPage;
        last = last >= filteredStudies.length ? filteredStudies.length : last;
        this.setState({ studies: filteredStudies.slice(first, last) });
        resolve();
      }, 500);
    });
  }

  render() {
    return (
      <div style={{ backgroundColor: "#000", height: "600px" }}>
        <div className="col-xs-12" style={{ padding: 0 }}>
          <StudyList
            studies={this.state.studies}
            studyCount={this.defaultStudies.length}
            studyListFunctionsEnabled={true}
            onImport={this.onImport}
            onSelectItem={this.onSelectItem}
            rowsPerPage={this.rowsPerPage}
            defaultSort={this.defaultSort}
            onSearch={this.onSearch}
          />
        </div>

        <FilesUploadComponent />
      </div>
    );
  }
}

export default StudyListExample;

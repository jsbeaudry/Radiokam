const data = [
  {
    studyInstanceUID: "11111.111111.111111.11111",
    patientName: "John Doe",
    patientId: "1",
    accessionNumber: "1234567",
    studyDate: "Dec 14, 2018",
    modalities: "MR",
    studyDescription: "BRAIN",
    dataSets: [
      "http://localhost:3001/download/pic0005.jpg",
      "dicomweb://localhost:3001/download/radiokam1.dcm"
    ]
  },
  {
    studyInstanceUID: "2222.222222.22222.22222",
    patientName: "José Silva",
    patientId: "2",
    accessionNumber: "7654321",
    studyDate: "Dec 13, 2018",
    modalities: "CT",
    studyDescription: "PET CT STANDARD",
    dataSets: ["dicomweb://localhost:3001/download/radiokam1.dcm"]
  },
  {
    studyInstanceUID: "3333.333333.33333.33333",
    patientName: "Antônio Jefferson",
    patientId: "3",
    accessionNumber: "732311",
    studyDate: "Dec 12, 2018",
    modalities: "US",
    studyDescription: "0",
    dataSets: ["dicomweb://localhost:3001/download/radiokam2.dcm"]
  }
  // {
  //   studyInstanceUID: "444444.44444.44444.4444",
  //   patientName: "Antonio da Silva",
  //   patientId: "4",
  //   accessionNumber: "732311",
  //   studyDate: "Dec 12, 2018",
  //   modalities: "US",
  //   studyDescription: "0",
  //   dataSets: [
  //     "dicomweb://localhost:3001/download/case4d_000.dcm",
  //     "dicomweb://localhost:3001/download/case4d_001.dcm",
  //     "dicomweb://localhost:3001/download/case4d_002.dcm",
  //     "dicomweb://localhost:3001/download/case4d_003.dcm"
  //   ]
  // }
  // {
  //   studyInstanceUID: "55555.55555.55555.55555",
  //   patientName: "Bezerra Souza",
  //   patientId: "5",
  //   accessionNumber: "5134543",
  //   studyDate: "Dec 22, 2018",
  //   modalities: "US",
  //   studyDescription: "0",
  //   dataSets: [
  //     "case1_008.dcm",
  //     "case1_010.dcm",
  //     "case1_012.dcm",
  //     "case1_014.dcm"
  //   ]
  // },
  // {
  //   studyInstanceUID: "66666.66666.66666.6666",
  //   patientName: "Geraldo Roger",
  //   patientId: "6",
  //   accessionNumber: "5315135",
  //   studyDate: "Dec 12, 2016",
  //   modalities: "US",
  //   studyDescription: "US",
  //   dataSets: [
  //     "case1_008.dcm",
  //     "case1_010.dcm",
  //     "case1_012.dcm",
  //     "case1_014.dcm"
  //   ]
  // },
  // {
  //   studyInstanceUID: "11111.111111.111111.11111",
  //   patientName: "John Doe",
  //   patientId: "1",
  //   accessionNumber: "1234567",
  //   studyDate: "Dec 14, 2018",
  //   modalities: "MR",
  //   studyDescription: "BRAIN",
  //   dataSets: [
  //     "case1_008.dcm",
  //     "case1_010.dcm",
  //     "case1_012.dcm",
  //     "case1_014.dcm"
  //   ]
  // },
  // {
  //   studyInstanceUID: "2222.222222.22222.22222",
  //   patientName: "José Silva",
  //   patientId: "2",
  //   accessionNumber: "7654321",
  //   studyDate: "Dec 13, 2018",
  //   modalities: "CT",
  //   studyDescription: "PET CT STANDARD",
  //   dataSets: [
  //     "case1_008.dcm",
  //     "case1_010.dcm",
  //     "case1_012.dcm",
  //     "case1_014.dcm"
  //   ]
  // },
  // {
  //   studyInstanceUID: "3333.333333.33333.33333",
  //   patientName: "Antônio Jefferson",
  //   patientId: "3",
  //   accessionNumber: "732311",
  //   studyDate: "Dec 12, 2018",
  //   modalities: "US",
  //   studyDescription: "0",
  //   dataSets: [
  //     "case1_008.dcm",
  //     "case1_010.dcm",
  //     "case1_012.dcm",
  //     "case1_014.dcm"
  //   ]
  // },
  // {
  //   studyInstanceUID: "444444.44444.44444.4444",
  //   patientName: "Antonio da Silva",
  //   patientId: "4",
  //   accessionNumber: "732311",
  //   studyDate: "Dec 12, 2018",
  //   modalities: "US",
  //   studyDescription: "0",
  //   dataSets: [
  //     "case1_008.dcm",
  //     "case1_010.dcm",
  //     "case1_012.dcm",
  //     "case1_014.dcm"
  //   ]
  // },
  // {
  //   studyInstanceUID: "55555.55555.55555.55555",
  //   patientName: "Bezerra Souza",
  //   patientId: "5",
  //   accessionNumber: "5134543",
  //   studyDate: "Dec 22, 2018",
  //   modalities: "US",
  //   studyDescription: "0",
  //   dataSets: [
  //     "case1_008.dcm",
  //     "case1_010.dcm",
  //     "case1_012.dcm",
  //     "case1_014.dcm"
  //   ]
  // },
  // {
  //   studyInstanceUID: "66666.66666.66666.6666",
  //   patientName: "Geraldo Roger",
  //   patientId: "6",
  //   accessionNumber: "5315135",
  //   studyDate: "Dec 12, 2016",
  //   modalities: "US",
  //   studyDescription: "US",
  //   dataSets: [
  //     "case1_008.dcm",
  //     "case1_010.dcm",
  //     "case1_012.dcm",
  //     "case1_014.dcm"
  //   ]
  // }
];

export { data };

// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import Papa from 'papaparse';
import './Fileupload.css'; // Import your CSS file

// function FileUpload() {
//   const [data, setData] = useState([]);
//   const [headers, setHeaders] = useState([]);
//   const [columnInfo, setColumnInfo] = useState([]);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       const fileExtension = file.name.split('.').pop().toLowerCase();

//       reader.onload = (e) => {
//         const fileContent = e.target.result;

//         if (fileExtension === 'csv') {
//           // Parse CSV file
//           Papa.parse(fileContent, {
//             header: true,
//             complete: (results) => {
//               analyzeData(results.data);
//               setHeaders(Object.keys(results.data[0]));
//               setData(results.data.slice(0, 10)); // Show only the first 10 rows
//               console.log('CSV Data:', results.data);
//             },
//           });
//         } else if (fileExtension === 'xls' || fileExtension === 'xlsx') {
//           // Parse XLS or XLSX file
//           const workbook = XLSX.read(fileContent, { type: 'binary' });
//           const worksheetName = workbook.SheetNames[0];
//           const worksheet = workbook.Sheets[worksheetName];
//           const jsonData = XLSX.utils.sheet_to_json(worksheet);
//           analyzeData(jsonData);
//           setHeaders(Object.keys(jsonData[0]));
//           setData(jsonData.slice(0, 10)); // Show only the first 10 rows
//           console.log('Excel Data:', jsonData);
//         } else {
//           alert('Unsupported file format. Please upload a CSV or Excel file.');
//         }
//       };

//       if (fileExtension === 'csv') {
//         reader.readAsText(file);
//       } else {
//         reader.readAsBinaryString(file);
//       }
//     }
//   };

//   const analyzeData = (data) => {
//     const info = headers.map((header) => {
//       const values = data.map((row) => row[header]);
//       const nullCount = values.filter((value) => value === null || value === '').length;
//       const dataType = getDataType(values);
//       return { header, dataType, nullCount };
//     });
//     setColumnInfo(info);
//   };

//   const getDataType = (values) => {
//     if (values.every((val) => typeof val === 'number')) return 'Number';
//     if (values.every((val) => typeof val === 'string')) return 'String';
//     if (values.every((val) => val instanceof Date)) return 'Date';
//     return 'Mixed';
//   };

//   return (
//     <div className="container">
//       <h2>Upload CSV or Excel File</h2>
//       <input type="file" accept=".csv, .xls, .xlsx" onChange={handleFileUpload} />

//       {data.length > 0 && (
//         <div className="table-container">
//           <h3>Data Preview (First 10 Rows):</h3>
//           <table className="centered-table">
//             <thead>
//               <tr>
//                 {headers.map((header, index) => (
//                   <th key={index}>{header}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {headers.map((header, index) => (
//                     <td key={index}>{row[header]}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
// <br></br>
// <hr></hr>
//           <h3>Column Information:</h3>
//           <table className="centered-table">
//             <thead>
//               <tr>
//                 <th>Column</th>
//                 <th>Data Type</th>
//                 <th>Null Values</th>
//               </tr>
//             </thead>
//             <tbody>
//               {columnInfo.map((info, index) => (
//                 <tr key={index}>
//                   <td>{info.header}</td>
//                   <td>{info.dataType}</td>
//                   <td>{info.nullCount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FileUpload;
// src/App.js
// src/App.js
// src/App.js
// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [showData, setShowData] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setData(response.data);
            setError(null);
            setShowData(false); // Reset view
            setShowSummary(false); // Reset view
        } catch (err) {
            setError(err.response?.data?.error || 'Error uploading file');
            setData(null);
        }
    };

    return (
        <div className="container">
            <h1>Upload CSV or XLS File</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".csv, .xls, .xlsx" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {error && <p className="error">{error}</p>}

            {data && (
                <div>
                    <div className="button-group">
                        <button onClick={() => setShowData(!showData)}>
                            {showData ? 'Hide Data' : 'Show Data'}
                        </button>
                        <button onClick={() => setShowSummary(!showSummary)}>
                            {showSummary ? 'Hide Summary' : 'Show Summary'}
                        </button>
                    </div>

                    {showSummary && (
                        <div>
                            <h2>Data Summary</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Column</th>
                                        <th>Sum</th>
                                        <th>Mean</th>
                                        <th>Median</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(data.data_summary).map(([column, stats]) => (
                                        <tr key={column}>
                                            <td>{column}</td>
                                            <td>{stats.sum}</td>
                                            <td>{stats.mean}</td>
                                            <td>{stats.median}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <h2>Data Types and Null Counts</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Column</th>
                                        <th>Data Type</th>
                                        <th>Null Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(data.data_info.data_types).map(([column, dtype]) => (
                                        <tr key={column}>
                                            <td>{column}</td>
                                            <td>{dtype}</td>
                                            <td>{data.data_info.null_counts[column]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {showData && (
                        <div>
                            <h2>First 10 Rows of Data</h2>
                            <table>
                                <thead>
                                    <tr>
                                        {data.data.length > 0 && Object.keys(data.data[0]).map((key) => (
                                            <th key={key}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.data.slice(0, 10).map((row, index) => (
                                        <tr key={index}>
                                            {Object.values(row).map((value, i) => (
                                                <td key={i}>{value}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;

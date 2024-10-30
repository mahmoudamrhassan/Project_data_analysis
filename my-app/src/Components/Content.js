// import React, { useState } from 'react';

// function Content({ codeExample }) {
//   const [copySuccess, setCopySuccess] = useState('');

//   const handleCopy = () => {
//     if (codeExample?.code) {
//       navigator.clipboard.writeText(codeExample.code)
//         .then(() => {
//           setCopySuccess('Code copied!');
//           setTimeout(() => setCopySuccess(''), 2000); // Reset the message after 2 seconds
//         })
//         .catch(() => setCopySuccess('Failed to copy!'));
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       {codeExample ? (
//         <>
//           <h2>Code Example</h2>
//           <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//             <button onClick={handleCopy} style={copyButtonStyle}>
//               Copy Code
//             </button>
//             {copySuccess && <span style={{ marginLeft: '10px', color: 'green' }}>{copySuccess}</span>}
//           </div>
//           <pre style={preStyle}>{codeExample.code}</pre>
//           <h3>Explanation</h3>
//           <p className='text-end' dir='rtl'>{codeExample.explanation}</p>
//           </>
//       ) : (
//         <p>Select a code example from the sidebar to view it here.</p>
//       )}
//     </div>
//   );
// }

// const preStyle = {
//   backgroundColor: '#f4f4f4',
//   padding: '15px',
//   fontSize: '14px',
//   overflowX: 'auto',
// };

// const copyButtonStyle = {
//   padding: '5px 10px',
//   backgroundColor: '#333',
//   color: 'white',
//   border: 'none',
//   cursor: 'pointer',
//   borderRadius: '4px',
// };
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

function Content({ codeExample }) {
  const [copySuccess, setCopySuccess] = useState('');
  const [filePath, setFilePath] = useState('');
  const [column_name, setcolumn_name] = useState('');
  const [connectionUrl, setConnectionUrl] = useState('');
  const [databaseName, setDatabaseName] = useState('');
  const [tableName, setTableName] = useState('');
  const [showInputs, setShowInputs] = useState(false); // State to toggle input visibility

  const handleCopy = () => {
    if (codeExample?.code) {
      navigator.clipboard.writeText(codeExample.code)
        .then(() => {
          setCopySuccess('Code copied!');
          setTimeout(() => setCopySuccess(''), 2000); // Reset the message after 2 seconds
        })
        .catch(() => setCopySuccess('Failed to copy!'));
    }
  };

  // Function to dynamically replace placeholders in the code with user input
  const getUpdatedCode = () => {
    if (codeExample?.code) {
      let updatedCode = codeExample.code 
      .replace(/path\/to\/file\.csv/g, filePath || 'path/to/file.csv') // Replace CSV file path with default if empty
      .replace(/path\/to\/output\.csv/g, filePath || 'path/to/output.csv') // Replace CSV file path with default if empty
      .replace(/jdbc:.*\/dbname/g, connectionUrl || 'jdbc:your_connection_string_here') // Default connection URL
        .replace(/dbname/g, databaseName || 'your_database_name') // Default database name
        .replace(/table_name/g, tableName || 'your_table_name') // Default table name
        .replace(/column_name/g, column_name || 'column_name'); // Default table name

      return updatedCode;
    }
    return '';
  };
  // Log the key if it equals "readCSV"
  useEffect(() => {
    if (codeExample) {
      console.log('Received codeExample:', codeExample); // Log the whole object
      if (codeExample.code.includes("CSV")) { // Check if the code contains 'readCSV'
        console.log('Key is "readCSV"');
      }
    }
  }, [codeExample]);

  console.log('Received codeExample:', codeExample); // Log the whole object

  return (
    <div style={{ padding: '20px' }}>
      {codeExample ? (
        <>
          <h2>Code Example</h2>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <button onClick={handleCopy} style={copyButtonStyle}>
              Copy Code
            </button>
            {copySuccess && <span style={{ marginLeft: '10px', color: 'green' }}>{copySuccess}</span>}
          </div>

          {/* Button to toggle input visibility */}
          <button onClick={() => setShowInputs(prev => !prev)} style={toggleButtonStyle}>
            ادخال البرميتار
          </button>

          {/* Conditional rendering of input fields */}
          {showInputs && codeExample.code.includes("CSV") && (
            <>
              {/* Input for the CSV file path */}
              <div style={{ marginBottom: '10px' }} >
                <label htmlFor="file-path">ادخال مسار الفايل من هنا :</label>
                <input
                  id="file-path"
                  type="text"
                  value={filePath}
                  onChange={(e) => setFilePath(e.target.value)}
                  style={{ width: '100%', padding: '5px', marginTop: '5px' }}
                />
              </div>   
            </>
          )}

   {showInputs  && codeExample.code.includes("SQL") &&  (
    <>
 {/* Input for the connection URL */}
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="connection-url">ادخال لينك السرفر من هنا :</label>
                <input
                  id="connection-url"
                  type="text"
                  value={connectionUrl}
                  onChange={(e) => setConnectionUrl(e.target.value)}
                  style={{ width: '100%', padding: '5px', marginTop: '5px' }}
                />
              </div>

              {/* Input for the database name */}
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="database-name">ادخال اسم الداتا بيز التي تريد الاتصال بها :</label>
                <input
                  id="database-name"
                  type="text"
                  value={databaseName}
                  onChange={(e) => setDatabaseName(e.target.value)}
                  style={{ width: '100%', padding: '5px', marginTop: '5px' }}
                />
              </div>

              {/* Input for the table name */}
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="table-name">ادخال اسم الجدول الذي تريد تحميله:</label>
                <input
                  id="table-name"
                  type="text"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  style={{ width: '100%', padding: '5px', marginTop: '5px' }}
                />
              </div>
</>
     
   )}  

        
        {showInputs  && codeExample.code.includes("Oracle") &&  (
    <>
 {/* Input for the connection URL */}
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="connection-url">ادخال لينك السرفر من هنا :</label>
                <input
                  id="connection-url"
                  type="text"
                  value={connectionUrl}
                  onChange={(e) => setConnectionUrl(e.target.value)}
                  style={{ width: '100%', padding: '5px', marginTop: '5px' }}
                />
              </div>

              {/* Input for the database name */}
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="database-name">ادخال اسم الداتا بيز التي تريد الاتصال بها :</label>
                <input
                  id="database-name"
                  type="text"
                  value={databaseName}
                  onChange={(e) => setDatabaseName(e.target.value)}
                  style={{ width: '100%', padding: '5px', marginTop: '5px' }}
                />
              </div>

              {/* Input for the table name */}
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="table-name">ادخال اسم الجدول الذي تريد تحميله:</label>
                <input
                  id="table-name"
                  type="text"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  style={{ width: '100%', padding: '5px', marginTop: '5px' }}
                />
              </div>
</>
     
   )}  

    {showInputs  && codeExample.code.includes("MongoDB") &&  (
    <>
 {/* Input for the connection URL */}
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="connection-url">ادخال لينك السرفر من هنا :</label>
                <input
                  id="connection-url"
                  type="text"
                  value={connectionUrl}
                  onChange={(e) => setConnectionUrl(e.target.value)}
                  style={{ width: '100%', padding: '5px', marginTop: '5px' }}
                />
              </div>

              {/* Input for the database name */}
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="database-name">ادخال اسم الداتا بيز التي تريد الاتصال بها :</label>
                <input
                  id="database-name"
                  type="text"
                  value={databaseName}
                  onChange={(e) => setDatabaseName(e.target.value)}
                  style={{ width: '100%', padding: '5px', marginTop: '5px' }}
                />
              </div>

              {/* Input for the table name */}
              <div style={{ marginBottom: '10px' }}>
                <label htmlFor="table-name">ادخال اسم الجدول الذي تريد تحميله:</label>
                <input
                  id="table-name"
                  type="text"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  style={{ width: '100%', padding: '5px', marginTop: '5px' }}
                />
              </div>
</>
     
   )}    
{/* static */}
          {showInputs && codeExample.code.includes("static") && (
            <>
              {/* Input for the CSV file path */}
              <div style={{ marginBottom: '10px' }} >
                <label htmlFor="file-path">ادخال اسم العمود  :</label>
                <input
                  id="column_name"
                  type="text"
                  value={column_name}
                  onChange={(e) => setcolumn_name(e.target.value)}
                  style={{ width: '100%', padding: '5px', marginTop: '5px' }}
                />
              </div>   
            </>
          )}
          <SyntaxHighlighter language="python" style={solarizedlight} customStyle={preStyle}>
            {getUpdatedCode()} {/* Display the updated code with user inputs */}
          </SyntaxHighlighter>

          <h3>Explanation</h3>
          <p className='text-end' dir='rtl'>{codeExample.explanation}</p>
        </>
      ) : (
        <p>Select a code example from the sidebar to view it here.</p>
      )}
    </div>
  );
}

const preStyle = {
  backgroundColor: '#f4f4f4',
  padding: '15px',
  fontSize: '14px',
  overflowX: 'auto',
};

const copyButtonStyle = {
  padding: '5px 10px',
  backgroundColor: '#333',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
};

const toggleButtonStyle = {
  padding: '5px 10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
  marginBottom: '10px',
};

export default Content;

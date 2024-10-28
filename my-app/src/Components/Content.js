import React, { useState } from 'react';

function Content({ codeExample }) {
  const [copySuccess, setCopySuccess] = useState('');

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
          <pre style={preStyle}>{codeExample.code}</pre>
          <h3>Explanation</h3>
          <p>{codeExample.explanation}</p>
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

export default Content;

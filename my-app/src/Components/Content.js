import React from 'react';

function Content({ codeExample }) {
  return (
    <div style={{ padding: '20px' }}>
      {codeExample ? (
        <>
          <h2>Code Example</h2>
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

export default Content;

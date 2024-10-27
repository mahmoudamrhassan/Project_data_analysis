import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import Content from './Components/Content';

function App() {
  const [codeExample, setCodeExample] = useState('');

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar setCodeExample={setCodeExample} />
      <div style={{ flex: 1 }}>
        <Content codeExample={codeExample} />
      </div>
    </div>
  );
}

export default App;

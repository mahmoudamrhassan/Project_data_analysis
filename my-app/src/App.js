import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import Content from './Components/Content';
import Header from './Components/Header';
function App() {
  const [codeExample, setCodeExample] = useState('');

  return (
    <>       <Header></Header>

      <div style={{ display: 'flex' }}>
      <Sidebar setCodeExample={setCodeExample} />
      <div style={{ flex: 1 }}>
        <Content codeExample={codeExample} />
      </div>
    </div>
    </>
 
  );
}

export default App;

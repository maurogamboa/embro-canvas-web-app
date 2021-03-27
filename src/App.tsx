import React from 'react';
import ToolBar from './components/toolbar/ToolBar';
import EmbroideryView from './components/views/EmbroideryView';

function App() {
  return (
    <div className="App">
      <h1>Embroidery Canvas</h1>
      <ToolBar />
      <EmbroideryView></EmbroideryView>
    </div>
  );
}

export default App;

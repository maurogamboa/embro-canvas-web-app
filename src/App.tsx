import React from 'react';
import AppNavBar from './components/navigation/AppBar';
import MenuToolBar from './components/toolbar/MenuToolBar';
import ToolBar from './components/toolbar/ToolBar';
import EmbroideryView from './components/views/EmbroideryView';

function App() {
  return (
    <div className="App">
      <AppNavBar />
      {/* <ToolBar /> */}
      <EmbroideryView></EmbroideryView>
      <div>
        Status bar
      </div>
    </div>
  );
}

export default App;

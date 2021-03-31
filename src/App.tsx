import React from 'react';
import { Provider } from 'react-redux';
import AppNavBar from './components/navigation/AppBar';
// import ToolBar from './components/toolbar/ToolBar';
import EmbroideryView from './components/views/EmbroideryView';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavBar />
        {/* <ToolBar /> */}
        <EmbroideryView></EmbroideryView>
        <div>
          Status bar
        </div>
      </div>
    </Provider>
  );
}

export default App;

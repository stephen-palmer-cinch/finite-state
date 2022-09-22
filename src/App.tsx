import "./App.css";
import { SomeComponent } from "./components/aComponent";
import { StageComponent } from "./components/stage/stage.component";
import { GlobalStateProvider } from "./context/globalState";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GlobalStateProvider>
          <div>
            <SomeComponent />
            <StageComponent />
          </div>
        </GlobalStateProvider>
      </header>
    </div>
  );
}

export default App;
// testService.send({type: 'LOGIN', id: 'test' });

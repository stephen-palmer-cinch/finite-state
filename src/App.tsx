import "./App.css";
// import { useFiniteState, States } from "./hooks/useFiniteState";

function App() {
  // const [current, smiles] = useFiniteState();

  return (
    <div className="App">
      <header className="App-header">
        {/* {current.matches(States.PENDING) && <div>Loading</div>}
        {current.matches(States.SUCCESS) && <div>{smiles} smiles</div>}
        {current.matches(States.FAILURE) && <div>no smiles</div>} */}
      </header>
    </div>
  );
}

export default App;
// testService.send({type: 'LOGIN', id: 'test' });

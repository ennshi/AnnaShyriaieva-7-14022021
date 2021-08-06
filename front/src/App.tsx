import './App.css';
import {ApolloContextProvider} from './contexts/apolloContext';
import TestChat from './lib/chakra-chat/testChat/TestChat';

function App() {
  return (
    <ApolloContextProvider>
      <div className="App">
        <TestChat />
      </div>
    </ApolloContextProvider>
  );
}

export default App;

import { useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import "./App.css";
import AuthModal from "./components/organisms/AuthModal";
import Main from "./components/screens/Main";
import { useApollo } from "./contexts/apolloContext";
import { CurrentUserProvider } from "./contexts/currentUserContext";

const App: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isSignedIn } = useApollo();

  useEffect(() => {
    if (!isSignedIn) {
      return onOpen();
    }
    onClose();
  }, [isSignedIn, onOpen, onClose]);

  return (
    <>
      <AuthModal isOpen={isOpen} onClose={() => {}} />
      {isSignedIn && (
        <div className="App">
          <CurrentUserProvider>
            <Main />
          </CurrentUserProvider>
        </div>
      )}
    </>
  );
};

export default App;

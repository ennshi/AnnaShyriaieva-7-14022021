import { useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import "./App.css";
import AuthModal from "./components/organisms/AuthModal";
import { useApollo } from "./contexts/apolloContext";
import TestChat from "./lib/chakra-chat/testChat/TestChat";

const App: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isSignedIn } = useApollo();

  useEffect(() => {
    if (!isSignedIn) {
      onOpen();
    }
    if (isSignedIn) onClose();
  }, [isSignedIn, onOpen, onClose]);

  return (
    <>
      <AuthModal isOpen={isOpen} onClose={() => {}} />
      <div className="App">
        <TestChat />
      </div>
    </>
  );
};

export default App;

import { CBadge } from "@coreui/react";
import { useState, useEffect } from "react";

const App: React.FC = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setTimeout(() => setCounter(counter + 1), 1000);
  }, [counter]);

  return (
    <>
      <CBadge color="primary"> Primartt34try color badge</CBadge>

      <CBadge color="primary"> {counter}</CBadge>
    </>
  );
};

export default App;

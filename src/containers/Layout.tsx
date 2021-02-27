import firebase from "firebase/app";
import { auth } from "../firebase/firebase";

const Layout: React.FC = () => {
  const tryLogin = () => {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
      auth
        .signInWithEmailAndPassword("xxx", "xxx")
        .then((res) => console.log("auth ok!", res))
        .catch((err) => console.log("auth error", err));
    });
  };

  return <button onClick={tryLogin}>isPies layout component</button>;
};

export default Layout;

import firebase from "firebase/app";
import { auth } from "../firebase/firebase";

type LoginProps = {
  login: string;
  password: string;
};

const tryLogin = async ({ login, password }: LoginProps): Promise<boolean> => {
  await auth
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .catch((err) => console.log("persistence error", err));

  const isLoginValid = await auth
    .signInWithEmailAndPassword(login, password)
    .then(() => {
      console.log("login ok");
      return true;
    })
    .catch((err) => {
      console.log("login error", err);
      return false;
    });
  return isLoginValid;
};

export default tryLogin;

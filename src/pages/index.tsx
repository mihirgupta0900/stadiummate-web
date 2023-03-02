import { getAuth } from "firebase/auth";
import { initFirebase } from "~/utils/firebase";

const app = initFirebase();

const Home = () => {
  const auth = getAuth(app);
  return "hi";
};

export default Home;

import { useContext, useEffect } from 'react';
import Routing from './Router';
import actionTypes from "./Utility/action.type";
import { auth } from './Utility/firebase';
import { DataContext } from './Components/DataProvider/DataProvider';

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser
        });
      } else {
        dispatch({
          type: actionTypes.SET_USER,
          user: null
        });
      }
    });

    // Clean up the subscription when the component is unmounted
    return unsubscribe;
  }, [dispatch]);

  return <Routing />;
}

export default App;
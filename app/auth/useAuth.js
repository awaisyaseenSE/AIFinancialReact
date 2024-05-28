import {useContext} from 'react';
import AuthsContext from './AuthsContext';
import auth from '@react-native-firebase/auth';

function useAuth() {
  const {user, setUser} = useContext(AuthsContext);
  const login = user => {
    setUser(user);
  };
  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch(er =>
        console.log('error while logout user in useAuth file: ', er),
      );
  };
  return {user, setUser, login, logout};
}

export default useAuth;

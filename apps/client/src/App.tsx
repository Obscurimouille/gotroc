import { RouterProvider } from 'react-router-dom';
import router from './router';
import { UserContext } from './providers/user-context';
import { useEffect, useState } from 'react';
import { User } from '@gotroc/types';
import { AuthService } from './services/auth-service';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    AuthService.me().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: user,
        logout: () => {
          AuthService.logout();
          setUser(null);
        },
      }}
    >
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;

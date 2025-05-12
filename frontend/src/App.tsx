import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './lib/ThemeContext';
import { AuthProvider } from './lib/AuthContext';
import { NotificationsProvider } from './contexts/NotificationsContext';
import { Layout } from './components/Layout';
import { AppRoutes } from './routes';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <NotificationsProvider>
            <Layout>
              <AppRoutes />
            </Layout>
          </NotificationsProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App; 
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ProjectsPage from './pages/ProjectsPage';
import WebSocketTestPage from './pages/WebSocketTestPage';
import SignalsPage from './pages/SignalsPage';
import SettingsPage from './pages/SettingsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ProjectsPage />,
      },
      {
        path: '/test',
        element: <WebSocketTestPage />,
      },
      {
        path: '/signals',
        element: <SignalsPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
]);

export default router;

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './assets/styles/custom.min.css';
import './main.css';
import Routes from './routes';

function App() {
  const routing = createBrowserRouter(Routes.themeRoutes);
  return <RouterProvider router={routing} />;
}

export default App;

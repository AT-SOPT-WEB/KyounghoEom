// Router.jsx

import { createBrowserRouter } from 'react-router';
import PokemonDetail from '../pages/PokemonDetail';
import Home from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/pokemon/:name',
    element: <PokemonDetail />,
  },
]);

export default router;
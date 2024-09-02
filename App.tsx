import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyles from './src/styles/GlobalStyles';
import Layout from './src/layout/Layout';
import Home from './src/pages/home/Home';
import Artist from './src/pages/artist/Artist';
import Gallery from './src/pages/gallery/Gallery';
import Login from './src/pages/signin/SignIn';
import Register from './src/pages/signin/Register';
import Artists from './src/pages/artists/Artists';
import Artwork from './src/pages/artwork/Artwork';
import EditUser from './src/components/EditUser/EditUser';
import UserProfile from './src/components/Profile/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path='users/:id' element={<Artist />} />
          <Route path='works/:id' element={<Artwork />} />
          <Route path='works' element={<Gallery />} />
          <Route path='login' element={<Login />} /> {/* Keep this route */}
          <Route path='register' element={<Register />} />
          <Route path='users/profile' element={<UserProfile />} />
          <Route path='users/artists' element={<Artists />} />
          <Route path='/users/updateUser' element={<EditUser />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from './src/styles/GlobalStyles';
import Layout from './src/layout/Layout';
import Home from './src/pages/home/Home';
import Artist from './src/pages/artist/Artist';
import Gallery from './src/pages/gallery/Gallery';
import Login from './src/pages/signin/SignIn';
import EditUser from './src/components/EditUser/EditUser';
import Register from './src/pages/signin/Register';




function App() {
  return (

    <BrowserRouter>
      <GlobalStyles />
      <Layout>
       <Routes>
        <Route index element = {<Home/>}/>
        <Route path='users/:id' element={<Artist />} />
          <Route path='works' element={<Gallery />} />
          <Route path='login' element={<Login />} /> {/* Keep this route */}
          <Route path='register' element={<Register />} />
          <Route path='edit-user' element={<EditUser />} />
       </Routes>
      </Layout>

</BrowserRouter>


  );
}

export default App;

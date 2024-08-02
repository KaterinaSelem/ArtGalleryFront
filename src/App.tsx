
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Layout from './layout/Layout';
// import Home from './pages/home/Home';
// import GlobalStyles from './styles/GlobalStyles';
// import UserDetails from './components/UserCard/UserDetails';

import UserDetails from "./components/UserCard/UserDetails";
// import Home from "./pages/home/Home";

function App() {
  return (
    // <BrowserRouter>
    //   <GlobalStyles />
    //   <Layout>
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/user/:id" element={<UserDetails />} />
    //       {/* Other routes can be added here */}
    //     </Routes>
    //   </Layout>
    // </BrowserRouter>
    // <Home/>
    <UserDetails/>

  );
}

export default App;
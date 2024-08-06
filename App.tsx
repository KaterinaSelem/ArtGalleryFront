import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from './src/styles/GlobalStyles';
import Layout from './src/layout/Layout';
import Home from './src/pages/home/Home';
import Artist from './src/pages/artist/Artist';


function App() {
  return (

    <BrowserRouter>
      <GlobalStyles />
      <Layout>
       <Routes>
        <Route index element = {<Home/>}/>
        <Route path='users/:id' element ={<Artist/>}/>
       </Routes>
      </Layout>

</BrowserRouter>

  );
}

// // export default App;
// // Compare this snippet from src/App.tsx:
// import ArtworkPrew from './src/components/Artworks/ArtworkPrew';
// // import ArtworksGallery from './src/components/Artworks/ArtworksGallery';
// // import Artist from './src/pages/artist/Artist';
// import AllUsers from './src/components/UserCard/AllUsers';
// import FooterComponent from './src/pages/footer/FooterComponent';
// import HeaderComponent from './src/pages/header/HeaderComponent';
// import Hero from './src/pages/Hero/Hero';

// // import Hero from './src/pages/Hero/Hero';

// function App() {
//   return (
//     <>
//       <>
//        <HeaderComponent users={[]}/>
//         {/* <ArtworksGallery users={[]} /> */}
//         {/* <Artist/> */}
//         <Hero />
//         <ArtworkPrew users={[]} />
//         <AllUsers />
//         <FooterComponent />
//       </>
//     </>
//   );
// }

export default App;

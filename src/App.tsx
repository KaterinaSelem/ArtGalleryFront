

import ArtworkPrew from "./components/Artworks/artworkPrew";
import AllUsers from "./components/UserCard/AllUsers";
import Header from "./pages/header/Header";
import Home from "./pages/home/Home";


function App() {
  return (      
<>  
    <Header/>
    <Home />
    <ArtworkPrew users={[]}/>
    <AllUsers/>
    
    </>
  );
}

export default App;
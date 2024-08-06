import ArtworkPrew from '../../components/Artworks/ArtworkPrew';
import AllUsers from '../../components/UserCard/AllUsers';
import Hero from '../Hero/Hero';

function Home() {
  return (
    <>
      <Hero />
      <ArtworkPrew users={[]} />
      <AllUsers />
    </>
  );
}

export default Home;

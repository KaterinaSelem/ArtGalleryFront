import ArtworkPrew from '../../components/Artworks/ArtworkPrew';
import AllUsers from '../../components/UserCard/AllUsers';
import Hero from '../Hero/Hero';

function Home() {
  return (
    <>
      <Hero />
      <ArtworkPrew id={0} name={''} email={''} password={''} userRole={{ id: 0, title: '' }} bornCity={''} liveCity={''} exhibition={[]} description={''} image={''} />
      <AllUsers />
    </>
  );
}

export default Home;

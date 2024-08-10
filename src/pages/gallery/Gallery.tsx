import ArtworksGallery from "../../components/Artworks/ArtworksGallery";

function Gallery() {
  return (
   <ArtworksGallery id={0} name={""} email={""} password={""} userRole={{
      id: 0,
      title: ""
    }} bornCity={""} liveCity={""} exhibition={[]} description={""} image={""} />
  );
}

export default Gallery;
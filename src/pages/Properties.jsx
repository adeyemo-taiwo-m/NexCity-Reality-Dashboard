import SearchBar from "../features/properties/SearchBar";
import Header from "../features/properties/Header";
import PropertyList from "../features/properties/PropertiesList";

function Properties() {
  return (
    <section className="flex-col flex gap-6">
      <Header />
      <SearchBar />
      <div>
        <PropertyList />
      </div>
    </section>
  );
}

export default Properties;

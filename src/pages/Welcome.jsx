import { Button } from "../components/button";
import { Table } from "../components/table/table";

const tempData = [
  {
    id: 1,
    name: "John Doe",
    email: "test@emailllllllllllllllllmmmmmmmmll;;;;;;;;;;l.com",
    phone: "123456789",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
    status: "active",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "test@email.com",
    phone: "987654321",
    address: "456 Elm St",
    city: "Los Angeles",
    state: "NY",
    zip: "10001",
    country: "USA",
    status: "active",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
  },
];

const filterableColumns = ["city", "country", "status"];

function Welcome() {
  const handleFilter = () => {
    //refetchData();
    console.log("Filter button clicked");
  };

  const handleProductAdd = () => {
    console.log("ProductAdd button clicked");
  };

  return (
    <div className="overflow-hidden mx-5">
      <h1 className="mt-[40px] text-center text-2xl">Wellcome to CRS</h1>
      <div className="w-[180px]">
        <Button children="პროდუქტის დამატება" onClick={handleProductAdd} />
      </div>
      <Table
        data={tempData}
        filterableColumns={filterableColumns}
        onFilter={handleFilter}
      />
    </div>
  );
}

export default Welcome;

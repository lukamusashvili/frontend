<<<<<<< HEAD
=======
import { Auth } from "../components/layouts/auth-layout";
>>>>>>> 49379ea7b86a9a5186bb82abbc73b7a0b663a3a6
import { Button } from "../components/button";
import { Table } from "../components/table/table";

<<<<<<< HEAD
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
=======
function Welcome() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleRegistrationClick = () => {
        navigate("/registration");
    };

    return (
        <Auth>
            <h1 className="mt-[40px] text-center text-2xl">Wellcome to CRS</h1>
            <div className="w-[380px] gap-5 flex flex-col mt-[100px]">
                <Button title="LOGIN" onClick={handleLoginClick}></Button>
                <Button
                    title="REQUEST ACCESS"
                    onClick={handleRegistrationClick}
                ></Button>
            </div>
        </Auth>
    );
>>>>>>> 49379ea7b86a9a5186bb82abbc73b7a0b663a3a6
}

export default Welcome;

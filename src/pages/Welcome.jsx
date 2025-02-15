import Auth from "../components/layouts/auth-layout";
import { Button } from "../components/button";
import { useNavigate } from "react-router";

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
        <Button children="LOGIN" onClick={handleLoginClick}></Button>
        <Button
          children="REQUEST ACCESS"
          onClick={handleRegistrationClick}
        ></Button>
      </div>
    </Auth>
  );
}

export default Welcome;

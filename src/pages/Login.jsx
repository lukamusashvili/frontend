import { useNavigate } from "react-router";
import { Button } from "../components/button";
import Auth from "../components/layouts/auth-layout";
import { Input } from "../components/input";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    console.log(email, password);
    // navigate("/");
  };

  const handleRegistrationClick = () => {
    navigate("/registration");
  };

  return (
    <Auth>
      <h1 className="mt-[40px] text-2xl">Wellcome to CRS</h1>
      <p className="opacity-60 text-sm mt-1">
        This is a private website. Sharing the link to this website is
        prohibited and monitored by IP address. Please do not share this link
        with unauthorized individuals.
      </p>
      <h1 className="mt-[30px] text-2xl">Log in</h1>
      <div className="flex flex-col gap-2.5 mt-[20px]">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
      </div>
      <div className="w-[380px] gap-5 flex flex-col mt-5">
        <Button children="LOGIN" onClick={handleLoginClick}></Button>
      </div>
      <div className="my-[20px] flex gap-1">
        <p className="text-sm">Don't have an account?</p>
        <p
          className="text-customRed text-sm cursor-pointer"
          onClick={handleRegistrationClick}
        >
          Sign up
        </p>
      </div>
    </Auth>
  );
}

export default Login;

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const handleLogin = async () => {
    try {
         
        const response = await axios.post('http://localhost:5000/api/loginadmin', {
        email:form.email ,
        password:form.password ,
      },
      {
          headers: { 'Content-Type': 'application/json' },
         
      }
      );

      const { token } = response.data;
      setLoginError("");
      localStorage.setItem('token', token);
      console.log('Login successful as user:', response.data);
      navigate('/dashboard/home');
     

    } catch (error) {
      setLoginError(error.response.data.message);
      console.error('Login failed:', error.response ? error.response.data.message : error.message);
    }
};

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth variant="gradient" size="lg" onClick={handleLogin}>
            Sign In
          </Button>

          <div className="flex items-center justify-between gap-2 mt-6">
           
            <Typography variant="small" className="font-medium text-gray-900">
            {loginError && <p className="text-red-500">{loginError}</p>}
            </Typography>
          </div>
         
        
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;

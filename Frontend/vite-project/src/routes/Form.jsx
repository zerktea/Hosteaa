import React from "react";
import EyePass from "./Eyepass";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";
import { ToastContainer, toast } from "react-toastify";

import {
  Input,
  Typography,
  Button,
  Checkbox,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function Form(props) {
  const navigate = useNavigate();
  const [isPass, setPass] = React.useState("password");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [form, setForm] = React.useState({
    name: "",
    surename: "",
    email: "",
    password: "",
    confirmpassword: "",
    newletter: false,
  });
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const [ferror, setError] = React.useState({
    name: "",
    surename: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const goLogin = () => {
    navigate(`/Login`);
  };
  function handleForm(event) {
    event.target.type === "checkbox"
      ? setForm({
          ...form,
          newletter: !form.newletter,
        })
      : setForm({
          ...form,
          [event.target.name]: event.target.value,
        });
  }
  function handleClick() {
    isPass === "password" ? setPass("text") : setPass("password");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.name) {
      setError({
        ...ferror,
        name: "Name is required",
      });
    } else {
      setError({
        ...ferror,
        name: "",
      });
    }
    if (!form.surename) {
      setError({
        ...ferror,
        surename: "Surename is required",
      });
    } else {
      setError({
        ...ferror,
        surename: "",
      });
    }
    if (!form.email) {
      setError({
        ...ferror,
        email: "Email is required",
      });
    } else {
      setError({
        ...ferror,
        email: "",
      });
    }

    if (!form.password) {
      setError({
        ...ferror,
        password: "Password is required",
      });
    } else if (!form.confirmpassword) {
      setError({
        ...ferror,
        confirmpassword: "Confirm password is required",
      });
    } else if (form.password !== form.confirmpassword) {
      setError({
        ...ferror,
        confirmpassword: "Passwords do not match",
      });
    } else {
      setError({
        ...ferror,
        confirmpassword: "",
        password: "",
      });
    }

    if (
      form.password === form.confirmpassword &&
      !ferror.name &&
      !ferror.surename &&
      !ferror.email &&
      !ferror.password &&
      !ferror.confirmpassword
    ) {
      try {
        console.log(form);
        // Send a POST request to the Express server
        const response = await axios.post(
          "http://localhost:5000/api/newUser",
          {
            name: form.name,
            surename: form.surename,
            email: form.email,
            password: form.password,
            newletter: form.newletter,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        // Log the server response
        navigate("/Login");
      } catch (error) {
        if (error.response.status === 400) {
          setError({
            ...ferror,
            email: "Email already in use or wrong format",
          });
        } else {
        }
        return;
      }

      //alert("Wlecom to the jungle " + form.name)

      
    }

    
  }

  return (
    <div className="form--div flex flex-col items-center justify-center gap-4  h-screen">
      <div className="form--header card w-[25rem] flex flex-col items-center justify-center gap-4 bg-orange-200 rounded p-4">
        <h2 className="text-2xl items-center justify-center text-center ">
          Sign in{" "}
        </h2>
        <p className="text-gray-500 center text-md justify-center text-center">
          Already have an acount ?
          <a
            className="link text-blue-500 hover:text-blue-700 hover:underline underline-offset-2 hover:cursor-pointer"
            onClick={() => {
              goLogin();
            }}
          >
            {" "}
            login
          </a>
        </p>

        <h4 className="text-xs items-center justify-center text-center">
          Please Enter your details so sign in
        </h4>
      </div>
      <form
        action=""
        className=" flex flex-col items-center justify-center gap-4 w-[25rem]"
        onSubmit={handleSubmit}
      >
        {/* <label htmlFor="name"  >Name</label> */}
        <Input
          type="text"
          name="name"
          label="Name"
          value={form.name}
          onChange={handleForm}
          className="!focus:outline-none"
        />
        <span style={{ color: "red" }}>{ferror.name}</span>

        <Input
          type="text"
          name="surename"
          label="Surename"
          value={form.surename}
          onChange={handleForm}
        />
        <span style={{ color: "red" }}>{ferror.surename}</span>

        <Input
          type="email"
          name="email"
          id="email"
          label="Email"
          value={form.email}
          onChange={handleForm}
        />
        <span style={{ color: "red" }}>{ferror.email}</span>
        <div className="pass w-full !relative">
          <Input
            type={isPass}
            name="password"
            id="password"
            label="Password"
            value={form.password}
            onChange={handleForm}
          />
          <EyePass
            value={isPass}
            handleClick={handleClick}
            className="!absolute top-2 left-2 hover:cursor-pointer"
          />
          <span style={{ color: "red" }}>{ferror.password}</span>
        </div>

        <Input
          type="password"
          name="confirmpassword"
          label="Repeat password"
          value={form.confirmpassword}
          onChange={handleForm}
        />
        <span style={{ color: "red" }}>{ferror.confirmpassword}</span>

        <div className="checkbox">
          <Checkbox
            label={
              <Typography color="blue-gray" className="flex font-medium">
                I agree with the
                <Typography
                  as="a"
                  href="#"
                  color="blue"
                  className="font-medium transition-colors hover:text-blue-700"
                  onClick={handleOpen}
                >
                  &nbsp;terms and conditions
                </Typography>
                .
              </Typography>
            }
          />
        </div>

        <Button className="form--submit !bg-orange-400  !text-white !hover:bg-orange-600"  type="submit">
          Sign In
        </Button>
      </form>
    
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Terms And Conditions</DialogHeader>
        <DialogBody>
          1. **Service Overview** HOSTEA provides hosting and accommodation
          services that include, but are not limited to, website hosting, domain
          registration, and accommodation booking. 2. **User Responsibilities**
          - You are responsible for maintaining the security and confidentiality
          of your account information. - You agree not to use our services for
          any unlawful or prohibited activities. 3. **Payment and Billing** -
          Payment for our services is due in advance. - We reserve the right to
          suspend or terminate your account for non-payment. 4. **Content
          Policies** - You are solely responsible for the content hosted on our
          platform. - You agree not to upload or distribute malicious software
          or engage in any activity that may harm our infrastructure or other
          users. 5. **Privacy and Data Protection** - Our privacy policy
          outlines how we collect, use, and protect your personal information.
          6. **Intellectual Property** - You retain ownership of your content,
          but you grant us a license to host and display it on our platform. 7.
          **Cancellation and Refund Policy** - Cancellation requests must be
          submitted in accordance with our cancellation policy. - Refund
          eligibility is subject to our refund policy. 8. **Limitation of
          Liability** - We are not liable for any direct, indirect, or
          consequential damages arising from the use of our services. 9.
          **Termination** - We reserve the right to terminate or suspend your
          account for violation of these terms. 10. **Modifications to Terms** -
          We may update these terms from time to time, and you are responsible
          for reviewing them. 11. **Governing Law** - This Agreement is governed
          by the laws of XXX. By using our services, you acknowledge that you
          have read, understood, and agree to these terms and conditions. For
          questions or concerns, please contact us at .
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

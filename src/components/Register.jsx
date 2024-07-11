/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

function Register({ isAuthenticated, setIsAuthenticated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      name:name,
      email:email,
      password
    }


    await axios
      .post("http://localhost:4000/api/v1/user/register", data, { withCredentials: true } ).then((res) => {
        setName("");
        setEmail("");
        setPassword("");
        setIsAuthenticated(true);
        toast.success(res.data.message);
      })
      .catch((error) => {
        // toast.error(error.response.data.message);
        console.log(error)
      });
  };
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "800px" }}
    >
      <Form onSubmit={handleRegister} className="w-100">
        <h3 className="text-center ">REGISTER</h3>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
       
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="text-center">
          <Form.Label>
            Already Registered?{" "}
            <Link to={"/login"} className="text-decoration-none ">
              LOGIN
            </Link>
          </Form.Label>
        </Form.Group>
        <Button
          variant="warning"
          type="submit"
          className="w-100 text-light fw-bold fs-5"
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Register;

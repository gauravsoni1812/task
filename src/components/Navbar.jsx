/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Header({ setTasks, setIsAuthenticated, isAuthenticated, setTaskTitle }) {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/task/mytask", { withCredentials: true });
      setAllTasks(response.data.tasks);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/user/logout", { withCredentials: "true" });
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const filterTasks = (filterType) => {
    let filteredTasks = [];

    switch (filterType) {
      case "completed":
        filteredTasks = allTasks.filter((task) => task.status === "completed");
        setTaskTitle("Completed Tasks");
        break;
      case "incomplete":
        filteredTasks = allTasks.filter((task) => task.status === "incomplete");
        setTaskTitle("Pending Tasks");
        break;
      case "archived":
        filteredTasks = allTasks.filter((task) => task.archived === true);
        setTaskTitle("Archived Tasks");
        break;
      case "all":
        filteredTasks = allTasks;
        setTaskTitle("Tasks");
        break;
      default:
        filteredTasks = allTasks;
    }
    setTasks(filteredTasks);
  };

  const colorTasks = (filterType) => {
    let filteredTasks = [];

    switch (filterType) {
      case "red":
        filteredTasks = allTasks.filter((task) => task.color === "red");
        console.log(filteredTasks)
        setTaskTitle("red (high priority task)");
        break
      case "blue":
        filteredTasks = allTasks.filter((task) => task.color === "blue");
        setTaskTitle("Blue (medium priority task)");
        break;
      case "green":
        filteredTasks = allTasks.filter((task) => task.color === "green");
        setTaskTitle("Green (lowest priority task)");
        break;
      case "all":
        filteredTasks = allTasks;
        setTaskTitle("Tasks");
        break;
      default:
        filteredTasks = allTasks;
    }
    setTasks(filteredTasks);
  };



  return (
    <Navbar expand="lg" className={`bg-body-tertiary ${!isAuthenticated ? "d-none" : ""}`}>
      <Container>
        <Navbar.Brand href="/">TASK MANAGER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Filter Tasks" id="basic-nav-dropdown" className="nav-item-spacing">
              <NavDropdown.Item onClick={() => filterTasks("all")}>All Tasks</NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("completed")}>Completed Tasks</NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTasks("incomplete")}>Pending Tasks</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Filter Priority" id="basic-nav-dropdown" className="nav-item-spacing">
              <NavDropdown.Item onClick={() => colorTasks("red")}> <div className="r"></div>  Red (high priority priority)</NavDropdown.Item>
              <NavDropdown.Item onClick={() => colorTasks("blue")}> <div className="b"></div>Blue(medium priority)</NavDropdown.Item>
              <NavDropdown.Item onClick={() => colorTasks("green")}> <div className="g"></div>green (lowest priority)</NavDropdown.Item>
            </NavDropdown>
        
            <Button className="bg-transparent border-0 nav-item-spacing" style={{ width: "fit-content", color:"black" }} onClick={handleLogout}>
              LOGOUT
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

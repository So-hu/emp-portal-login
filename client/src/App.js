import React, { Component } from "react";
import "./App.css";
import Employees from "./components/employees/employees";
import Login from "./pages/login";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Route from "react-router-dom/Route";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      role: "admin" //TODO: implement a better way to store user role
    };
  }

  //currently does nothing, some event will call this and pass it a result which will set the state
  authCompleted = (isAuthenticated, role) => {
    this.setState({ isAuthenticated: isAuthenticated, role: role });
  };

  render() {
    //Admins and regular users have different routes available to them,
    //this is passed to the Navbar component surrounding the Route components.
    const routes = [{ route: "/homepage", name: "Home" }];
    if (this.state.role === "admin") {
      routes.push({ route: "/employees", name: "Employees" });
    }

    return (
      <Router>
        <div>
          <Navbar routes={routes} />
          <Route
            path="/"
            exact
            strict
            render={() => {
              return (
                <div className="App">
                  <header className="App-header">Login Component</header>
                  <Login />
                </div>
              );
            }}
          />
          <Route
            path="/employees"
            exact
            strict
            render={() => {
              return (
                <div>
                  <h2>Employee Tables</h2>
                  <Employees />
                </div>
              );
            }}
          />
          <Route
            path="/homepage"
            exact
            strict
            render={() => {
              return (
                <div>
                  <h2>Landing page</h2>
                </div>
              );
            }}
          />
        </div>
      </Router>
    );
  }
}

export default App;

import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import { Label, Input, FormGroup } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import md5 from "md5";
import axios from "axios";
import UWImage from "../UW_left-stack_white.png";

class EntryPage extends Component {
  constructor() {
    super();
    this.onLogin = this.onLogin.bind(this);
    this.state = {
      email: "",
      password: "",
      role: ""
      // redirect: false
    };
  }

  onLogin() {
    // axios
    //   .post("/processlogin", {
    //     email: this.state.email,
    //     password: this.state.password
    //   })
    //   .then(res => {
    //     localStorage.setItem("cool-jwt", res.data);
    // this.props.history.push("/forgetpassword");
    //   });

    axios
      .post("processlogin", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        localStorage.setItem("cool-jwt", res.data);
        this.props.history.push("/home");
        // if (res.data.role === "student") {
        //   this.setState({ role: "student", redirect: true });
        // } else if (res.data.role === "admin") {
        //   this.setState({ role: "admin", redirect: true });
        // }
      });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      if (this.state.role === "admin") return <Redirect to={"/admin/home"} />;
      else return <Redirect to={"/student/home"} />;
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.renderRedirect()}
        <nav
          style={{ borderRadius: 0, position: "fixed !important" }}
          className="navbar navbar-expand-lg bg-dark mb-0"
        >
          <a className="nav-link" href="https://www.uwinnipeg.ca/">
            <img
              src={UWImage}
              style={{ width: "8rem" }}
              className="img-fluid"
              alt="UW logo"
            />
          </a>
        </nav>
        <Container className="text-center" style={{ marginTop: "18rem" }}>
          <h1>Login</h1>
          <div className="row">
            <div className="col-none col-md-3" />
            <div className="col col-md-6">
              <form className="text-left mb-4">
                <FormGroup>
                  <Label>Enter Webmail Address</Label>
                  <Input
                    placeholder="username@webmail.uwinnipeg.ca"
                    type="email"
                    onChange={e => {
                      this.setState({ email: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    onChange={e => {
                      this.setState({ password: md5(e.target.value) });
                    }}
                    placeholder="Enter your Password"
                    type="password"
                  />
                </FormGroup>
                <Button
                  onClick={this.onLogin}
                  className="mt-5 text-white"
                  color="dark"
                  block
                >
                  Login
                </Button>
              </form>
              <Button className="mb-5" type="submit" color="dark" block>
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-white"
                  to="/home"
                >
                  Continue Without Login
                </Link>
              </Button>
              <Link
                className="text-dark"
                style={{ textDecoration: "none" }}
                to="/register"
              >
                Register
              </Link>{" "}
              -&nbsp;
              <Link
                className="text-dark"
                style={{ textDecoration: "none" }}
                to="/forgetpassword"
              >
                Forget Password
              </Link>
            </div>
            <div className="col-none col-md-3" />
          </div>
          <div>
            Links below will be removed after authentication has been
            implemented
          </div>
          <div className="text-center">
            <Link to="/home">Guest</Link>
            <br />
            <Link to="/student/home">Student</Link>
            <br />
            <Link to="/admin/home">Admin</Link>
            <br />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default EntryPage;

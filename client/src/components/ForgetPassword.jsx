import React, { Component } from "react";

import {
  Container,
  Button,
  Label,
  Input,
  FormFeedback,
  FormGroup
} from "reactstrap";

import UWImage from "../UW_left-stack_white.png";

class ForgetPassword extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
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
        <Container className="text-center" style={{ marginTop: "24rem" }}>
          <div className="row">
            <div className="col-none col-md-3" />
            <div className="col col-md-6">
              <form className="text-left mb-4">
                <FormGroup>
                  <Label>
                    Please enter your email address below and we will send you
                    information to change your password.
                  </Label>
                  <Input
                    placeholder="username@webmail.uwinnipeg.ca"
                    type="email"
                  />
                  <FormFeedback />
                </FormGroup>
                <Button className="my-5 text-white" color="dark" block>
                  Reset
                </Button>
              </form>
            </div>
            <div className="col-none col-md-3" />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default ForgetPassword;

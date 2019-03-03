/* jshint ignore: start */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Modal,
  FormGroup,
  ControlLabel,
  HelpBlock,
  FormControl
} from "react-bootstrap";
import { Button } from "reactstrap";
import uuid from "uuid";

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class MyModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      userStatus: this.props.userStatus
    };
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <div
          className="text-white nav-link mr-3 ml-3"
          onClick={this.handleShow}
        >
          {this.getModal(this.props.userStatus).type}
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title style={{ margin: "0 auto" }} className="row">
              {this.getModal(this.props.userStatus).title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            {this.getModal(this.props.userStatus).body.map(link => (
              <React.Fragment key={uuid()}>{link}</React.Fragment>
            ))}
          </Modal.Body>
          <Modal.Footer className="mx-auto">
            {this.getModal(this.props.userStatus).footer}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  getModal(loginStatus) {
    //this will give different types of modal based on users' login statuses
    if (loginStatus.toUpperCase() === "ADMIN") {
      return {
        type: "Admin Settings",
        title: "Settings",
        // body: null,
        body: [<Link to="/admin/studentscore">Student Score</Link>],
        footer: null
      };
    } else if (loginStatus.toUpperCase() === "STUDENT") {
      return {
        type: "Studetns",
        title: "Student Settings",
        body: ["More Settings"],
        footer: null
      };
    } else {
      return {
        type: "Login",
        title: "AMOA Login",
        body: [
          <React.Fragment>
            <form className="text-left mb-4">
              <FieldGroup
                id="formControlsEmail"
                type="email"
                label="Email address"
                aria-describedby="emailHelp"
                placeholder="name@webmail.uwinnipeg.ca"
              />
              <FieldGroup
                id="formControlsPassword"
                label="Password"
                type="password"
                placeholder="Password"
              />
              <Button type="submit" color="dark" block>
                Login
              </Button>
            </form>
          </React.Fragment>
        ],
        footer: (
          <React.Fragment>
            <Link to="createaccount">Register</Link> -
            <Link to="createaccount">Forget Password</Link>
          </React.Fragment>
        )
      };
    }
  }
}

export default MyModal;

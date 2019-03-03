import React, { Component } from "react";
import Navbar from "./MyNavbar";
import Footer from "./Footer";
import Editor from "./Editor";

class CreateModule extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Navbar role={this.props.role} />
        <Editor _id={this.props._id} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default CreateModule;

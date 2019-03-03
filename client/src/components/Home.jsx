/*jshint ignore: start*/
import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "./MyNavbar";
import Footer from "./Footer";

class Home extends Component {
  constructor() {
    super();
    this.module = this.module.bind(this);
    this.state = {
      modules: [],
      redirect: true
    };
  }

  componentDidMount() {
    fetch("/home")
      .then(res => res.json())
      .then(modules => {
        this.setState({ modules });
      });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Navbar
            role={this.props.type}
            page="home"
            userStatus={this.state.userStatus}
          />
          <Jumbotron>
            <div className="container">
              <h2>Academic Misconduct Online Appliaction</h2>
              <p className="lead">
                This site provides a quick introduction to ideas of academic
                integrity at the University of Winnipeg.
              </p>
            </div>
          </Jumbotron>
          <h2 className="text-center mt-5 pt-5">What you will learn</h2>
          <div className="container">
            <div className="row">
              <div className="py-5 my-5">
                <p className="m-3">
                  The following tutorial aims at familiarizing students with how
                  to avoid academic misconduct. It also attempts to promote an
                  understanding of how to practice academic integrity in student
                  projects and learning situations. It provides 3 modules: an
                  introduction, a module on avoiding plagiarism and a module on
                  avoiding cheating. Students need to achieve a score of 100% in
                  each progressive module to move forward in the tutorial. Once
                  all three modules are completed, students will achieve a
                  certificate of completion, which is printable.
                </p>
                <p className="m-3">
                  The introductory module will familiarize you with terms,
                  definitions, and proper practices.
                </p>
                <p className="m-3">
                  In module two, you will learn that plagiarism involves taking
                  words and ideas of another and presenting them without
                  attribution as if they are your own. This is misleading to
                  readers. It also fails to give credit to the scholar who
                  developed the content and to provide prospective readers with
                  a link to topical material. To avoid this problem you need to
                  follow the guidelines of a research manual and system.
                </p>
                <p className="m-3">
                  Module three deals with avoiding cheating in test and exam
                  situations. It also describes how to avoid becoming involved
                  in unfair and often uninvited collaborations
                </p>
              </div>
            </div>
            <hr style={{ width: "70%" }} />
            <div
              style={{ fontFamily: "Bevan" }}
              id="modules"
              className="container text-white my-5 p-5"
            >
              <div className="row pb-sm-5">{this.module()}</div>
              {/* <div className="row">{this.module()}</div> */}
            </div>
          </div>
          <Footer />
        </div>
      </React.Fragment>
    );
  }

  module() {
    let target = [];
    for (let prop in this.state.modules) {
      if (this.state.modules.hasOwnProperty(prop)) {
        target[prop] = this.state.modules[prop];
      }
    }
    target = target.filter(module => module.public === true);
    return target.map(module => (
      <React.Fragment key={module.moduleCode}>
        <div className="text-center col-12 col-md-6 p-3">
          <div style={{ height: "13rem" }} className="text-center bg-dark py-3">
            <Link
              name="top"
              to={`module/${module.moduleCode}`}
              className="h3 text-center input-group my-5 text-light"
              style={{
                color: "inherit",
                textDecoration: "none",
                opacity: 1,
                display: "block",
                width: "100%",
                height: "auto",
                transition: "0.5s ease",
                backfaceVisibility: "hidden"
              }}
            >
              {module.moduleCode}
            </Link>
          </div>
        </div>
        <hr className="d-block d-sm-none" style={{ width: "80%" }} />
      </React.Fragment>
    ));
  }
}

export default Home;

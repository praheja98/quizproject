import React, { Component } from "react";
import { Container } from "reactstrap";
import Navbar from "./MyNavbar";
import Footer from "./Footer";

class StudentScore extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar role={this.props.type} />
        <Container style={{ minHeight: "500px" }}>
          <h2 className="text-center my-5 py-5">Student Score</h2>
          <table className="table table-striped table-hover table-responsive-sm my-5">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Webmail</th>
                <th className="text-right" scope="col">
                  Module I.
                </th>
                <th className="text-right" scope="col">
                  Module II
                </th>
                <th className="text-right" scope="col">
                  Module III
                </th>
                <th className="text-right" scope="col">
                  Last Modified
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Bob</th>
                <td>bob@webmail.uwinnipeg.ca</td>
                {/* <!-- <td className="text-right">2019-01-02</td> --> */}
                <td className="text-success text-right">&#10004;</td>
                <td className="text-success text-right">&#10004;</td>
                <td className="text-success text-right">&#10004;</td>
                <td className="text-right">Jan 02 2019 13:52</td>
              </tr>
              <tr>
                <th scope="row">James</th>
                <td>james@webmail.uwinnipeg.ca</td>
                <td className="text-success text-right">&#10004;</td>
                <td className="text-danger text-right">&#x2718;</td>
                <td className="text-success text-right">&#10004;</td>
                <td className="text-right">Jan 02 2019 13:51</td>
              </tr>
              <tr>
                <th scope="row">Mary</th>
                <td>mary@webmail.uwinnipeg.ca</td>
                <td className="text-right">&#10004;</td>
                <td className="text-right">&#10004;</td>
                <td className="text-right">&#x2718;</td>
                <td className="text-right">Jan 02 2019 11:04</td>
              </tr>
            </tbody>
          </table>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default StudentScore;

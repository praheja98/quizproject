import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Container } from "reactstrap";
import uuid from "uuid";
// Data
import Navbar from "./MyNavbar";
import Footer from "./Footer";
import axios from "axios";

class QuizPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      moduleFetched: false,
      questionNotFetched: true,
      moduleId: "",
      moduleTitle: "",
      persons: []
    };
  }

  componentDidMount() {
    fetch(`/module/${this.props.moduleCode}`)
      .then(res => res.json())
      .then(module =>
        this.setState({
          moduleId: module._id,
          moduleTitle: module.title,
          moduleFetched: true
        })
      );
  }

  fetchQuestion() {
    if (this.state.moduleFetched && this.state.questionNotFetched) {
      console.log(`fetchquestion ${this.state.moduleId}`);
      axios.get(`/module/quiz/${this.state.moduleId}`).then(res => {
        const questions = res.data;
        this.setState({ questions: questions, questionNotFetched: false });
        console.log(this.state.questions);
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.fetchQuestion()}
        <Navbar role={this.props.type} page="quiz" />
        <Container>
          <h1 className="text-center m-5 p-5">{this.state.moduleTitle}</h1>
          <form>
            {this.getQuestions()}
            <div className="m-5">
              <Link to="" className="btn btn-danger col mt-3">
                Submit
              </Link>
            </div>
          </form>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }

  getQuestions() {
    return this.state.questions.map((question, index) => (
      <React.Fragment key={uuid()}>
        <Card className="text-dark bg-light">
          <CardBody className="card-body m-md-2 m-lg-4">
            {index + 1}.
            <p className="h4 mx-md-5">
              {question.question}
              <br />
            </p>
            <div className="mx-lg-5">
              <div className="mx-5">{this.getOptions(question)}</div>
            </div>
          </CardBody>
        </Card>
        <hr className="my-5" style={{ width: "100%" }} />
      </React.Fragment>
    ));
  }
  // Scramble the options
  getOptions(question) {
    let optionArray = question.options;
    let orderedArray = [];
    for (let i = optionArray.length - 1; i >= 0; i--) {
      let index = Math.floor(Math.random() * optionArray.length);
      orderedArray.push(optionArray.splice(index, 1)[0]);
    }
    return orderedArray.map(option => (
      <div className="form-check" key={uuid()}>
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios"
          id={option}
          value={option}
        />
        <label className="form-check-label mx-5">{option}</label>
      </div>
    ));
  }
}
export default QuizPage;

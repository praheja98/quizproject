/* jshint ignore: start */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { Card, CardTitle, CardBody, Container } from "reactstrap";
// Data
// import Questions from "../data/questions.json";
// import Module from "../data/module.json";

import Navbar from "./MyNavbar";
import Footer from "./Footer";

class QuizPage extends Component {
  constructor() {
    super();

    this.state = {
      userStatus: "guest",
      moduleCode: "introduction",
      moduleName: null,
      // questionDetail: Questions,
      questions: []
      // userAnswer: {} //for guest user????????
    };
  }

  componentDidMount() {
    fetch("/question")
      .then(res => res.json())
      .then(questions =>
        this.setState(
          { questions },
          { moduleCode: question[0].moduleName },
          () => {
            console.log(questions);
            console.log(questions[0].moduleName);
          }
        )
      );
  }

  render() {
    return (
      <React.Fragment>
        <Navbar
          role={this.props.role}
          page="quiz"
          userStatus={this.state.userStatus}
        />
        <Container>
          <h1 className="text-center m-5 p-5">{Questions.moduleName}</h1>
          <CardTitle className="h4 mx-5 px-5 text-right">
            Question: {this.state.questionDetail.qId}/
            {this.state.questionDetail.outOf}
          </CardTitle>

          <Card className="text-white bg-dark">
            <CardBody className="card-body m-md-2 m-lg-4">
              <p className="mx-md-5">
                {this.state.questionDetail.question}
                <br />
              </p>
              <div className="mx-lg-5">
                <div className="mx-5">{this.getOptions()}</div>
                <div className="row">
                  {this.getButtons(
                    this.state.questionDetail.qId,
                    this.state.questionDetail.outOf
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
        <hr className="my-5" style={{ width: "100%" }} />
        <Footer />
      </React.Fragment>
    );
  }

  getOptions() {
    let optionArray = Questions.options;
    let orderedArray = [];
    for (let i = optionArray.length - 1; i >= 0; i--) {
      let index = Math.floor(Math.random() * optionArray.length);
      orderedArray.push(optionArray.splice(index, 1)[0]);
    }
    console.log(orderedArray);

    return orderedArray.map(option => (
      <div className="form-check" key={option.description}>
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios"
          id={option.cId}
          value={option.description}
        />
        <label
          className="form-check-label mx-5"
          // for={answer.option}
        >
          {option.description}
        </label>
      </div>
    ));
  }

  getButtons(questionNumber, quizLength) {
    let leftButton =
      questionNumber === 1
        ? { display: "none", width: "6rem" }
        : { width: "6rem" };
    let rightButton =
      questionNumber === quizLength
        ? { btnStyle: "danger", text: "Submit" }
        : { btnStyle: "secondary", text: "Next" };
    return (
      <React.Fragment>
        <div className="col">
          <Button style={leftButton} color="secondary" className="mt-5">
            <Link to="previous" style={{ color: "white" }}>
              Previous
            </Link>
          </Button>
        </div>
        <div className="col text-right">
          <Button
            style={{ width: "6rem" }}
            color={rightButton.btnStyle}
            className="mt-5"
          >
            <Link
              to={
                "/module/" +
                Questions.moduleCode +
                "/quiz/" +
                (Questions.qId + 1)
              }
              style={{ color: "white" }}
            >
              {rightButton.text}
            </Link>
          </Button>
        </div>
      </React.Fragment>
    );
  }
}
export default QuizPage;

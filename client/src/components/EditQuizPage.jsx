import React, { Component } from "react";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import QuizQuestions from "./QuizQuestion";
import Navbar from "./MyNavbar";
import Footer from "./Footer";

class EditQuizPage extends Component {
  constructor() {
    super();
    this.hideQuestionPanel = this.hideQuestionPanel.bind(this);
    this.showQuestionPanel = this.showQuestionPanel.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.addOption = this.addOption.bind(this);
    this.reduceOption = this.reduceOption.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.state = {
      quizQuestions: [],
      questionPanelHide: true,
      quizQuestion: "",
      options: ["", ""],
      moduleName: ""
    };
  }

  //Fetch module title, fetch quiz questions
  componentDidMount() {
    fetch(`/admin/edit/editmodule/quiz/${this.props._id}`)
      .then(res => res.json())
      .then(quizQuestions => {
        this.setState({ quizQuestions });
      });
    fetch(`/admin/edit/editmodule/${this.props._id}`)
      .then(res => res.json())
      .then(module => {
        this.setState({ moduleName: module.title });
      });
  }

  //refresh mechanism
  refreshPage() {
    this.componentDidMount();
  }

  showQuestionPanel() {
    this.setState({ questionPanelHide: false });
  }

  hideQuestionPanel() {
    this.setState({ questionPanelHide: true });
  }

  addQuestion(e) {
    e.preventDefault();
    const newQuestion = {
      moduleId: this.props._id,
      question: this.state.quizQuestion,
      options: this.state.options
    };
    axios.post("/admin/edit/editmodule/quiz/:_id", newQuestion).then(res => {
      let quizQuestions = this.state.quizQuestions;
      quizQuestions.push(res.data);
      this.setState({
        options: ["", ""],
        quizQuestion: "",
        questionPanelHide: true,
        quizQuestions
      });
    });
  }
  addOption() {
    const options = this.state.options;
    options.push("");
    this.setState(options);
  }
  reduceOption() {
    const options = this.state.options;
    if (options.length >= 3) {
      options.pop();
      this.setState(options);
    } else {
      alert("Each question must have at least TWO options");
    }
  }
  getOptionInputs() {
    return this.state.options.map((option, index) => (
      <React.Fragment key={index}>
        <Input
          placeholder={
            index === 0 ? "Please put the correct answer in this input bar" : ""
          }
          className="my-2"
          onChange={e => {
            const options = this.state.options;
            options[index] = e.target.value;
            this.setState({ options });
          }}
        />
      </React.Fragment>
    ));
  }

  render() {
    return (
      <React.Fragment>
        <Navbar role={this.props.type} />
        <Container>
          <h2 className="text-center my-5 py-5">{this.state.moduleName}</h2>
          {this.state.quizQuestions.map((question, index) => (
            <QuizQuestions
              _id={question._id}
              refreshPage={this.refreshPage}
              key={question._id}
              question={question}
            />
          ))}
          <Form hidden={this.state.questionPanelHide}>
            <FormGroup>
              <Label>Question</Label>
              <Input
                style={{ minHeight: "100px" }}
                type="textarea"
                name="text"
                onChange={e => {
                  this.setState({ quizQuestion: e.target.value });
                }}
              />
            </FormGroup>
            <div className="my-3  text-right">
              <div className="btn-group" role="group" aria-label="...">
                <Button
                  color="dark"
                  className="text-white"
                  onClick={this.addOption}
                >
                  +
                </Button>
                <Button
                  color="secondary"
                  className="text-white"
                  onClick={this.reduceOption}
                >
                  -
                </Button>
              </div>
            </div>
            {this.getOptionInputs()}
            <div className="row py-5">
              <div className="col-md" />
              <div className="btn-group" role="group" aria-label="...">
                <Button
                  color="dark"
                  size="lg"
                  onClick={this.hideQuestionPanel}
                  className="text-white"
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  size="lg"
                  onClick={this.addQuestion}
                  className="text-white"
                >
                  ADD
                </Button>
              </div>
              <div className="col-md" />
            </div>
          </Form>
          <div hidden={!this.state.questionPanelHide} className="row py-5">
            <div className="col-md" />
            <Button
              size="lg"
              onClick={this.showQuestionPanel}
              className="text-white"
            >
              ADD QUESTION
            </Button>
            <div className="col-md" />
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default EditQuizPage;

import React, { Component } from "react";
import { Button, Container, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

class QuizQuestions extends Component {
  constructor() {
    super();
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.hideQuestionPanel = this.hideQuestionPanel.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
    this.addOption = this.addOption.bind(this);
    this.reduceOption = this.reduceOption.bind(this);

    this.state = {
      questionPanelHide: true,
      question: "",
      options: ["", ""]
    };
  }

  componentDidMount(id) {
    fetch(`/admin/edit/editmodule/quiz/question/${id}`)
      .then(res => res.json())
      .then(q =>
        this.setState({ question: q.question, options: q.options }, () => {
          console.log(this.state);
        })
      );
  }

  hideQuestionPanel() {
    this.setState({ questionPanelHide: true });
  }

  editQuestion(e) {
    const id = e.target.value;
    this.setState({ questionPanelHide: false });
    this.componentDidMount(id);
    console.log("Editing... " + id);
  }

  deleteQuestion() {
    console.log(this.props.question._id);
    axios
      .delete(`/admin/edit/editmodule/quiz/delete/${this.props.question._id}`)
      .then(res => {
        console.log(res.data);
      });
    this.props.refreshPage();
  }

  saveQuestion(e) {
    e.preventDefault();
    const updatedQuestion = {
      _id: this.props._id,
      question: this.state.question,
      options: this.state.options
    };
    axios
      .post("/admin/edit/editmodule/editquiz/:_id", updatedQuestion)
      .then(res => {
        this.setState({
          questionPanelHide: true,
          question: "",
          options: ["", ""]
        });
      });
    this.props.refreshPage();
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
          value={option}
          placeholder={
            index === 0 ? "Please put the correct answer in this input bar" : ""
          }
          className="my-2"
          onChange={e => {
            const options = this.state.options;
            options[index] = e.target.value;
            this.setState({ options });
            console.log(this.state.options);
          }}
        />
      </React.Fragment>
    ));
  }

  render() {
    const q = this.props.question;
    return (
      <React.Fragment>
        <Container className="bg-light">
          <div className="card-body m-md-2 m-lg-4">
            <p className="mx-5">{q.question}</p>
            <div className="mx-5">
              <ol className="mx-3">
                {q.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ol>
            </div>
            <div className="my-3  text-right">
              {/* ?Edit Delete Button Group */}
              <div className="btn-group" role="group" aria-label="...">
                <Button
                  color="dark"
                  className="text-white"
                  value={q._id}
                  onClick={this.editQuestion}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  className="text-white"
                  onClick={this.deleteQuestion}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
          <Form hidden={this.state.questionPanelHide}>
            {/* question */}
            <FormGroup>
              <Label>Question</Label>
              <Input
                value={this.state.question}
                style={{ minHeight: "100px" }}
                type="textarea"
                name="text"
                onChange={e => {
                  this.setState({ question: e.target.value });
                  console.log(this.state.question);
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
                  onClick={this.saveQuestion}
                  className="text-white"
                >
                  SAVE
                </Button>
              </div>
              <div className="col-md" />
            </div>
          </Form>
          <hr style={{ borderColor: "#868e96", width: "90%" }} />
        </Container>
      </React.Fragment>
    );
  }
}

export default QuizQuestions;

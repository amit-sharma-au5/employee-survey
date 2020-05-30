import React from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getData } from '../ActionCreators/action';
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import logo from '../public/img/logo.png'
import $ from 'jquery'


toast.configure();
class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.getData().then(() => {
      this.setState({
        surveys: this.props.surveys
      })
    })
  }

  state = {
    employ: "",
    surveys: [],
    assignSurvey: []
  }

  selectEmploy(data) {
    this.setState({
      employ: parseInt(data)
    })

  }

  selectSurvey(surveyId) {
    $('#s_' + surveyId).hide()
    let stateCopy = this.state;
    stateCopy.assignSurvey.push(surveyId)
    this.setState({
      assignSurvey: stateCopy.assignSurvey
    }, () => {
      console.log(this.state.assignSurvey)
    })
  }

  removeSurvey(surveyId, surveyLoc) {
    $('#s_' + surveyId).show()
    let stateCopy = this.state;
    stateCopy.assignSurvey.splice(surveyLoc, 1)
    this.setState({
      assignSurvey: stateCopy.assignSurvey
    })
  }

  async sendData(e) {
    e.preventDefault();
    if (this.state.employ === "") {
      toast.error('Please Select Employ', { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    }
    let employId = this.state.employ
    let task = [];
    await this.state.assignSurvey.map((surveyId) => {
      task.push(this.state.surveys[surveyId])
    })
    let data = {
      employ: this.props.employee[employId],
      employTask: task
    }
    if (task.length === 0) {
      toast.error('Please assign Survey', { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000 })
    } else {
      axios.post("http://localhost:3010/setdata", data).then(res => {
        if (res.data) {
          toast.success('Task added Successfully', { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 3000 })
        } else {
          toast.error('Internal Server Error! Try Again', { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 3000 })
        }
      })
    }

  }
  render() {
    return (
      <div>
        <div className="section">
        <div className="container">
          <div className="level is-mobile">
            <div className="level-left">
              <a href="/">
                <img src={logo} width="112" height="28" />
              </a>

            </div>
              <div className="level-right">
                <span className="icon">
                  <i className="fas fa-signal"></i>
                </span>


                <span className="icon">
                  <i className="fas fa-battery-three-quarters"></i>
                </span>

              </div>
            </div>
          </div>
          </div>
          <section className="section">
            <div className="columns is-centered">
              <div className="control has-icons-left">
                <div className="select is-large is-warning">
                <p className="has-text-centered">
                  <select onChange={(e) => { this.selectEmploy(e.target.value) }}>
                    <option selected>Select Employee</option>
                    {
                      this.props.employee.map((ele, index) => {
                        return (<option key={index} value={index}>{ele}</option>)
                      })
                    }
                  </select>
                </p>
                </div>
                <span className="icon is-large is-left">
                  <i className="fas fa-users"></i>
                </span>
              </div>
            </div>
          </section>
          <section className="section">
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="notification">
                    <article className="panel is-warning">
                      <p className="panel-heading">
                        Survey List
                    </p>
                      <div className="panel-block">
                        <p className="control has-icons-left">
                          <input className="input is-link" type="text" placeholder="Search" />
                          <span className="icon is-left">
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </span>
                        </p>
                      </div>

                      {
                        this.state.surveys.map((ele, index) => {
                          return (
                            <div className="level is-mobile" key={index} id={"s_" + index}>
                              <div className="level-left">
                                <p className="panel-block">
                                  <span className="panel-icon">
                                    <i className="fas fa-poll-h" aria-hidden="true"></i>
                                  </span>
                                  <b>{ele}</b>
                                </p>
                              </div>
                              <div className="level-right">
                                <a className="panel-block" onClick={() => { this.selectSurvey(index) }}>
                                  <span className="panel-icon">
                                    <i className="fas fa-plus" aria-hidden="true"></i>
                                  </span>
                                </a>
                              </div>
                            </div>
                          )
                        })
                      }
                    </article>
                  </div>
                </div>
                <div className="column">
                  <div className="notification">
                    <article className="panel is-warning">
                      <p className="panel-heading">
                        Assigned Survey
                    </p>
                      <div className="panel-block">
                        <p className="control has-icons-left">
                          <input className="input is-link" type="text" placeholder="Search" />
                          <span className="icon is-left">
                            <i className="fas fa-search" aria-hidden="true"></i>
                          </span>
                        </p>
                      </div>
                      {
                        this.state.assignSurvey.map((ele, index) => {
                          return (
                            <div className="level is-mobile" key={index}>
                              <div className="level-left">
                                <p className="panel-block">
                                  <span className="panel-icon">
                                    <i className="fas fa-poll-h" aria-hidden="true"></i>
                                  </span>
                                  <b>{this.state.surveys[ele]}</b>
                                </p>
                              </div>
                              <div className="level-right">
                                <a className="panel-block" onClick={() => { this.removeSurvey(ele, index) }}>
                                  <span className="panel-icon">
                                    <i className="fas fa-minus" aria-hidden="true"></i>
                                  </span>
                                </a>
                              </div>
                            </div>
                          )
                        })
                      }
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="columns is-centered is-full">
              <div className="column">
                <p className="has-text-centered"><button className="button is-warning" onClick={(e) => { this.sendData(e) }}><b>Done</b></button></p>
              </div>
            </div>
          </section>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    employee: state.employees,
    surveys: state.surveys
  }
}
const mapDispatchToProps = (dispatch) => { return bindActionCreators({ getData}, dispatch) }
export default connect(mapStateToProps, mapDispatchToProps)(App) 
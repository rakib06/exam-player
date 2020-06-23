import React from "react";
import { Layout } from "antd";
import { Link, withRouter, NavLink, Router } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import Navbar from 'react-bootstrap/Navbar'
import { Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import './components/light-bootstrap-dashboard-react.css'
import { Container } from 'react-bootstrap';
import { HeartTwoTone } from '@ant-design/icons';

import './css.css';

const { Content } = Layout;


class CustomLayout extends React.Component {

  render() {
    return (


      <div>
        <header className="header">

          <Navbar  >
            <div>
              <nav className="navbar fixed-top"></nav>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <div className="a">

                  <Nav className="mr-auto">
                    <Nav.Link key="10">
                      <Link to="/"><div className="a"><h5>Home</h5></div></Link>
                    </Nav.Link>

                    {this.props.isAuthenticated ? (

                      <Nav.Link key="10">
                        <Link to="/profile"><div className="a"><h5>Profile</h5></div></Link>
                      </Nav.Link>


                    ) : (
                        null
                      )}

                    {this.props.isAuthenticated ? (

                      <Nav.Link key="10">
                        <Link to="/exam"><div className="a"><h5>Exam</h5></div></Link>
                      </Nav.Link>

                    ) : (
                        <Nav.Link className="a" key="1">
                          <Link to="/login"><div className="a"><h5>Login</h5></div></Link>
                        </Nav.Link>
                      )}






                    {this.props.token !== null ? (
                      <Nav.Link className="a" key="4">
                        <Link to={`/profile/${this.props.userId}`}><div className="a"><h5>Result</h5></div></Link>
                      </Nav.Link>
                    ) : null}

                    {this.props.token !== null && this.props.is_teacher ? (
                      <Nav.Link className="a" key="5">
                        <Link to="/create"><div className="a"><h5>Create Question</h5></div> </Link>
                      </Nav.Link>
                    ) : null}


                    {this.props.isAuthenticated ? (
                      null

                    ) : (
                        <Nav.Link className="a" key="9">
                          <Link to="/signup"><div className="a"><h5>Signup</h5></div></Link>
                        </Nav.Link>
                      )}

                    {this.props.isAuthenticated ? (

                      <Nav.Link key="10" onClick={this.props.logout}>
                        <div className="a"><h5>Logout</h5></div>
                      </Nav.Link>


                    ) : (
                        null
                      )}
                    <div className="a">
                      <Nav.Link key="10" >
                        <div className="a"><h5></h5></div>
                      </Nav.Link>
                    </div>

                  </Nav>
                </div>

              </Navbar.Collapse>

            </div>
          </Navbar>
        </header>





        {/* <Content style={{ background: "cornsilk", padding: 24, height: "100vh" }} >

          <div >
            {this.props.children}
          </div>
        </Content> */}
        <Content style={{ padding: "20px 20px " }}>

          <div style={{ background: "cornsilk", padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>
        </Content>


        <footer className="footer">
          <Container fluid>
            <nav className="pull-left">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/linb1">Company</a>
                </li>
                <li>
                  <a href="/exam">Exam</a>
                </li>
                <li>
                  <a href="/">Blog</a>
                </li>
              </ul>
            </nav>
            <p className="copyright pull-right">
              &copy; {new Date().getFullYear()}{" "}
              <a href="http://www.linb1.com">
                LinB1
            </a>
            , made with <HeartTwoTone twoToneColor="#eb2f96" />  for a better web

          </p>
          </Container>
        </footer>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    is_teacher: state.auth.is_teacher
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);

import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link, withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { MDBContainer, MDBFooter } from "mdbreact";
import Navbar from 'react-bootstrap/Navbar'
import { Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import './css.css'
import { LogoutOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;

class CustomLayout extends React.Component {
  render() {
    return (

      <div >


        <header className="header">

          <Navbar  >
            <div>
              <nav className="navbar fixed-top"></nav>
              <Navbar.Brand href="/">
                <div className="a"><h1>Exam-Player</h1></div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <div className="a">

                  <Nav className="mr-auto">
                    <Nav.Link key="10">
                      <Link to="/"><div className="a"><h5>Home</h5></div></Link>
                    </Nav.Link>

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
                    <div className="a"><h5>
                      <NavDropdown title="QUICK ACCESS" id="basic-nav-dropdown">
                        {this.props.isAuthenticated ? (
                          <NavDropdown.Item href="/Profile/:id">Profile</NavDropdown.Item>) : null}
                        {this.props.isAuthenticated ? (
                          <NavDropdown.Item href="/teachers">Teachers</NavDropdown.Item>) : null}
                        {this.props.isAuthenticated ? (
                          <NavDropdown.Item href="/students">Students</NavDropdown.Item>) : null}
                        <NavDropdown.Divider />
                        {this.props.isAuthenticated ? (
                          <NavDropdown.Item className="a" key="3" onClick={this.props.logout}>
                            <div className="c"><h5>Logout <LogoutOutlined /></h5></div>
                          </NavDropdown.Item>
                          /* </Menu.Item><Menu.Item key="3">
                            <Link to="/logout"> Logout</Link>
                          
                          </Menu.Item>
                          */

                        ) : null}

                      </NavDropdown>
                    </h5>
                    </div>
                    <div >
                      <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success"><div className="a">Search</div></Button>
                      </Form>
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

        <MDBFooter color="red" className="font-small pt-3 mt-2">

          <div className="footer-copyright text-center">
            <MDBContainer fluid>
              &copy; {new Date().getFullYear()}  <b > LinB1 </b>
            </MDBContainer>
          </div>
        </MDBFooter>

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

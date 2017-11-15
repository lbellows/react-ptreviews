import React, { Component } from 'react';
//import logo from './lift_icon.gif';
import { Reviews, FeaturedReview, Review} from './Review';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {About, Jumbotron, Nav } from './StaticContent';
import {Register} from './Register';
import Login from './Login';
import Contact from './Contact';
import DAL from './DAL';
import MDReactComponent from 'markdown-react-js';
import Users from './Users';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = null;// {LoggedIn: false}; //Reviews: [], 
      /*
        Contain state by object
        User: {}, Reviews: {}, etc...
      */
    this.Users = new Users();
    this.actions = {
      doLogin: (user, pass) => {
        this.Users.SignIn(user, pass)
          .then(res => {
            this.setState({UserInfo: res, LoggedIn: true});

          });
      }
    }
    console.log("app.js init");
  }

  componentDidMount(){
    var db = new DAL();
    const reviews = db.GetAll(db.DB_TABLES.reviews).then((data) => data.Items);
    const blogText = fetch('/blog.md').then(res => res.text());
    Promise.all([reviews, blogText]).then(res => this.setState({Reviews: res[0], blogText: res[1]}) );
  }

  render() {
    if(!this.state)
      return <div>Loading...</div>;

    return (
      <Router>
      <div className="App container">
        <Nav LoggedIn={this.state.LoggedIn} UserInfo={this.state.UserInfo} actions={this.actions} />
        <Route exact path='/' component={Jumbotron} />
        <Route exact path='/' render={() =>  <FeaturedReview {...this.state} />} />
        <Route exact path='/' component={About} />
        <Route exact path='/reviews' render={() => <Reviews {...this.state} /> } />
        <Route path='/reviews/:id' component={(data) => <Review {...this.state} {...data} />} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={(data) => <Login actions={this.actions} {...this.state} {...data} /> } />
        <Route path='/blog' component={() => <MDReactComponent text={this.state.blogText || ""} />} />
      </div>
      </Router>
    );
  }

}


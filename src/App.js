import React, { Component } from 'react';
//import logo from './lift_icon.gif';
import { Reviews, FeaturedReview, Review} from './Review';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {About, Contact, Jumbotron, Nav, Login } from './StaticContent';
import {Register} from './Register';
import {Blog} from './Blog';
import moment from 'moment';


export default class App extends Component {

  constructor(props){
    super(props);
    this.state = props; // {Reviews:[], CurrentReview: -1};
    this.AddReviewHandler = this.AddReviewHandler.bind(this);
  }

/*
  componentDidMount(){
    fetch('/db.json', {method:'GET'})
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      
      this.setState({Reviews: data.Reviews});
    });
  }
*/
  GetView(){
    //show empty set
    if(this.state.Reviews.length <= 0){
      return(<p>Sorry there are no reviews right now!</p>);
    }

    //show list of reviews
    return(<Reviews data={this.state} addHandler={this.AddReviewHandler} />);
  }

  AddReviewHandler(newReview){
    var nextId = this.state.Reviews.length + 1;
    newReview.id = nextId;
    newReview.userId = 1;
    newReview.comments = [];
    newReview.date = moment();

    this.setState({Reviews: [...this.state.Reviews, newReview]})
  }

  render() {
    
    return (
      <Router>
      <div className="App container">
        <Nav />
        <Route exact path='/' component={Jumbotron} />
        <Route exact path='/' render={() =>  <FeaturedReview data={this.state} />} />
        <Route exact path='/' component={About} />
        <Route exact path='/reviews' render={() => this.GetView()} />
        <Route path='/reviews/:id' component={(props) => <Review data={this.state} {...props} />} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/blog' component={Blog} />
      </div>
      </Router>
    );
  }

}


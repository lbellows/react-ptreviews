import React, { Component } from 'react';
//import logo from './lift_icon.gif';
import { Reviews, FeaturedReview, Review} from './Review';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {About, Jumbotron, Nav } from './StaticContent';
import {Register} from './Register';
import Blog from './Blog';
import Login from './Login';
import Contact from './Contact';
import DAL from './DAL';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = null;
    console.log("app.js init");
  }


  loadData(){
    var db = new DAL();
      return db.GetAll(db.DB_TABLES.reviews).then((data) => {
        return {
          Reviews: data.Items
        };
      })
    .catch(err => console.log(err.message));
  }

  componentDidMount(){
    this.loadData().then(data => {
      this.setState(data);
    });
  }

  render() {
    if(this.state == null)
      return <div>Loading...</div>;

    return (
      <Router>
      <div className="App container">
        <Nav />
        <Route exact path='/' component={Jumbotron} />
        <Route exact path='/' render={() =>  <FeaturedReview {...this.state} />} />
        <Route exact path='/' component={About} />
        <Route exact path='/reviews' render={() => <Reviews {...this.state} /> } />
        <Route path='/reviews/:id' component={(data) => <Review {...this.state} {...data} />} />
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


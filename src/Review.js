import React, {Component} from 'react';
import {Comments} from './Comment';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import {DAL} from './DAL'
import moment from 'moment';

export const Reviews = (data) => {
  const items = data.Reviews.map((rev, ind) => {
    return(  
      <Link to={"/reviews/" + rev.id} className="list-group-item" key={rev.id}> 
        <h4 className="list-group-item-heading">{rev.title || "(Untitled)"}</h4>
      </Link>
    );
  })

  return(
    
    <div>
      <AddReview {...data} />
      <div className="list-group">
        <h2>Reviews:</h2>
        {  items }
      </div>
    </div>
  );
}

//TODO: Combine with reviews so you can set state and view new reviews
export class AddReview extends Component {
  constructor(props){
    super(props);
    this.state = { Reviews: [], formOpened: false }
    this.db = new DAL();
  }

  AddReviewHandler(){
    var newReview = $('form').serializeArray()
      .reduce((a, x) => { 
        if(x.value) 
          a[x.name] = x.value; 
        return a; 
      }, {});
    
    this.db.GetAll(this.db.DB_TABLES.reviews).then(res => {
      var count = res.ScannedCount;
      var nextId = (count + 1).toString();
      newReview.id = nextId;
      newReview.userId = '1';
      newReview.date = moment().format();
      //this.setState({Reviews: [...this.state.Reviews, newReview]});
      console.log(newReview);
      this.db.Save(newReview, this.db.DB_TABLES.reviews);//.then(res => location.reload(true));
    })
  }

  render(){
    return(
      <div className="clearfix">
        <button className="btn btn-primary pull-right clearfix" 
          onClick={() => {this.setState({formOpened: !this.state.formOpened})}} >
          Create Review
        </button>
        {
          this.state.formOpened && 
          
          <form className="form-group">
            <div className="row">
              <div className="col-sm-3 text-right">Title:</div>
              <div className="col-sm-6"><input className="form-control" name="title" /></div>
            </div>
            <div className="row">
              <div className="col-sm-3 text-right">Trainer Name:</div>
              <div className="col-sm-6"><input className="form-control" name="trainerName" /></div>
            </div>
            <div className="row">
              <div className="col-sm-3 text-right">Location:</div>
              <div className="col-sm-6"><input className="form-control" name="location" /></div>
            </div>
            <div className="row">
              <div className="col-sm-3 text-right">Gym Name:</div>
              <div className="col-sm-6"><input className="form-control" name="gymName" /></div>
            </div>
            <div className="row">
              <div className="col-sm-3 text-right">Review:</div>
              <div className="col-sm-6"><textarea className="form-control" name="value" /></div>
            </div>
             <div className="row">
              <div className="col-sm-3 text-right">Rating:</div>
              <div className="col-sm-6">
                <select className="form-control" name="rating">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
            <div className="row form-inline">
              <div className="col-sm-6 col-sm-offset-3">
                <button type="button" onClick={() => this.AddReviewHandler()}
                  className="btn btn-default form-control">Create</button>
                <button type="button" onClick={() => {this.setState({formOpened: !this.state.formOpened})}}
                  className="btn btn-default form-control">Cancel</button>
              </div>
            </div>
          </form>
        }
      </div>
    )
  }
}

//{TheReview, Reviews, hideComments, match}
export const Review = (data) => {
  console.log(data);
   var rev = data.TheReview;

   if(!rev && data.match){
      var revId = data.match.params.id;
      rev = data.Reviews.find(r => r.id === revId) || {};
    }

    return(
      <div className="panel">
        <Link to='/reviews'>
          <h2 className="panel-heading">{rev.title || "(Untitled)"}</h2>
        </Link>
        <p className="panel-body">{rev.value}</p>
        {
        !data.hideComments && rev.id &&
          <Comments reviewId={rev.id} />
        }
      </div>
    );
}

export const FeaturedReview = ({Reviews}) => {
  if(Reviews == null || Reviews.length < 1){
    return <div></div>;
  }

  const reviewInd = Math.floor(Math.random() * (Reviews.length) ); 

  var theReview = Reviews[reviewInd];

  return(
    <div className="panel panel-default">
      <h2>Featured Review</h2>
        <Review {...{TheReview: theReview, hideComments:true}} />
    </div>
  );
    
}

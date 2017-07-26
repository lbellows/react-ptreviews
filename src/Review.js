import React, {Component} from 'react';
import {Comments} from './Comment';
import {Link} from 'react-router-dom';
import $ from 'jquery';

export const Reviews = ({data, addHandler}) => {
  const items = data.Reviews.map((rev, ind) => {
    return(  
      <Link to={"/reviews/" + rev.id} className="list-group-item" key={rev.id}> 
        <h4 className="list-group-item-heading">{rev.value}</h4>
      </Link>
    );
  })

  return(
    
    <div>
      <AddReview addHandler={addHandler} />
      <div className="list-group">
        <h2>Reviews:</h2>
        {  items }
      </div>
    </div>
  );
}

export class AddReview extends Component {
  constructor(props){
    super(props);
    this.state = { formOpened: false }
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
            <div className="row">
              <div className="col-sm-6 col-sm-offset-3">
                <button type="button" onClick={() => 
                  this.props.addHandler($('form').serializeArray()
                    .reduce((a, x) => { a[x.name] = x.value; return a; }, {}))} 
                  className="btn btn-default form-control">Create</button>
              </div>
            </div>
          </form>
        }
      </div>
    )
  }
}


export const Review = ({data, match}) => {
    var reviewToShow = data && data.CurrentReview > -1 ? 
      data.CurrentReview : 
      Number(match.params.id);

    var item = data.Reviews.find((rev) => {
      return (rev.id === reviewToShow);
    });

    return(
      <div className="panel">
        <Link to='/reviews'>
          <h4 className="panel-heading">{item.value}</h4>
        </Link>
        <p className="panel-body">Some description</p>
        <Comments data={item.comments || []} />
      </div>
    );
}

export const FeaturedReview = ({data}) => {
    const reviewInd = Math.floor((Math.random() * data.Reviews.length) ); 

    return(
      <div className="panel panel-default">
        <h2>Featured Review</h2>
          <Review data={{Reviews: data.Reviews, CurrentReview: reviewInd}} />
      </div>
    );
    
}

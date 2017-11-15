import React, {Component, PureComponent} from 'react';
import DAL from './DAL';
import moment from 'moment';

export class Comment extends Component{
  //not sure if needed for single comment

	render() {
    return(
    <div>
    </div>);
  }
}


//TODO: Combine with comments so you can set state and view new comments
export class AddComment extends PureComponent {

  constructor(props){
    super(props);
    this.state = {loggedIn: true, commentSubmitted: false }
  }

  AddCommentHandler(){
    var db = new DAL();
    db.GetAll(db.DB_TABLES.comments).then(res => {
      var newComment = {
        date: moment().format(),
        id: (res.ScannedCount + 1).toString(),
        userId: '1',
        value: document.getElementById('ptComment').value,
        reviewId: this.props.reviewId
      };
      console.log(newComment);
      db.Save(newComment, db.DB_TABLES.comments);
      this.setState({commentSubmitted: true});

      //this.forceUpdate();
      // test this 
      //this.props = { ...this.props, newComment}
    })
  }


  render(){
    if(this.state.commentSubmitted)
      return (
        <form className="form-group">
            <div className="row">
              <div className="col-sm-6 col-sm-offset-3">Thanks for your comment!</div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-6 col-sm-offset-3">
                <button type="button" onClick={() => this.setState({commentSubmitted: false})}
                  className="btn btn-default form-control">OK</button>
              </div>
            </div>
          </form>
      );

    return(
      <div>
        {
          this.state.loggedIn && !this.state.commentSubmitted &&
        
          <form className="form-group">
            <div className="row">
              <div className="col-sm-3 text-right">Comment:</div>
              <div className="col-sm-6"><textarea className="form-control" name="value" id="ptComment" /></div>
            </div>
            <div className="row form-inline">
              <div className="col-sm-6 col-sm-offset-3">
                <button type="button" onClick={() => this.AddCommentHandler()}
                  className="btn btn-default form-control">Create</button>
              </div>
            </div>
          </form>
        }
      </div>
    )
  }
}

export class Comments extends Component {
  constructor(props){
    super(props);
    this.db = new DAL();
    this.state = {myComments: []};
    
  }

  componentDidMount(){
    this.db.GetAllCommentsById(this.props.reviewId)
    .then(res => this.setState({myComments: res.Items}));
  }
  
  TheComments(){
    return this.state.myComments.map((item) => {
      return(<h4 key={item.id} className="panel-body">{item.value}</h4>);
    });
  }

  render(){
    
    
    console.log(this.props);
    //console.log(comments);

    return(
      <div>
        <hr />
        <div className="panel-heading">
          <h3>Read comments:</h3>
          {this.TheComments() }
          <AddComment reviewId={this.props.reviewId} />
        </div>
      </div>
    );
  }
}
import React, {Component} from 'react';


export class Comment extends Component{
	//create new comment form
	render() {
    return(
    <div>
    </div>);
  }
}

export const Comments = ({data}) => {
  const items = data.map((item) => {
    return(<h4 key={item.id} className="panel-body">{item.value}</h4>);
  });

  return(
    <div style={{textAlign: "right"}} className="panel">
      <hr />
      <h3>Read comments:</h3>
      { items }
    </div>
  );
}
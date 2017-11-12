import React, {Component} from 'react';
import {Button} from 'react-bootstrap';


export default class Blog extends Component{
	//create new comment form
	render() {
    return(
    <div>
			<p>Coming soon...</p>
      <Button name="test" onClick={() => alert('hi')}>test</Button>
    </div>
    );
  }
}

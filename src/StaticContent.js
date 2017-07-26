import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as AWS from 'aws-sdk';
import Config from './config.json'

export const LandingPage = () => {
		return(
			<div class="row marketing">
        <div class="col-lg-6">
          <h4>Subheading</h4>
          <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>

          <h4>Subheading</h4>
          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>

          <h4>Subheading</h4>
          <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
        </div>

        <div class="col-lg-6">
          <h4>Subheading</h4>
          <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>

          <h4>Subheading</h4>
          <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>

          <h4>Subheading</h4>
          <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
        </div>
      </div>
		);
}

export const About = () => {
		return(
			<div>
				<h2>Our Mission</h2>
				<p><b>PTREVIEWS.net</b> is the Net's premiere fitness community review site! 
				We aim to bring integrity into the fitness community and present a forum for trainers, gym owners, 
				and the fitness crowd to better converse on.</p>
				<h2>Services</h2>
				<p>Ultimately, we offer our users three services. Namely:</p>
				<ul>
						<li><b>Gym Services</b>, where gym owners can offer discounts to members and let people who travel 
							have the ability to access other PTAlliance gyms at a discount.</li>
						<li>We want to give <b>Personal Trainers</b> a place where they can refer their clients to positive discussion about their abilities and training methods; and a place where they can respond to criticisms.</li>
						<li>We also want to provide a place where <b>Athletes and Trainees</b> can discuss experiences they've had with specific trainers or gyms, and give ratings in relation to other places they have trained at.</li>
				</ul>
				<h2>Join</h2>
				<p>So join today for free, and be part of the fitness review community.</p>  
				<Link className="btn btn-primary" to="/register">Sign up</Link>
			</div>
		);
}

export class Contact extends Component {

	constructor(props){
		super(props);
		this.domain = location.hostname;
		this.state = {new: true, message: ""};
	}

	Send(){
		AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: config.poolId,
    });

		var service = new AWS.SNS();

    var params = {
        Message: document.getElementById('msg').value,
        Subject: this.domain + ': Message',
        TopicArn: config.topicArn,

    }

    service.publish(params, (err, data) => {
				if (err){
					this.setState({new: false, message: "Sorry there was an error!"});
        }
        else{
					this.setState({new: false, message: "Thank you for your email!"});
        }
    });
	}

	render(){
		var display = <div></div>;
		if(!this.state.new){
			display = (
				<h3 className="col-sm-6 col-sm-offset-4">{ this.state.message}</h3>
			) 
		}
		else if(this.state.new){
			display = (
			<form id="form">
            <div className="form-group col-sm-8 col-sm-offset-2">
                <h2>Contact me about domain:</h2>
                <textarea name="msg" id="msg" placeholder="Type your message and contact info." className="form-control"></textarea>
                <button type="button" onClick={() => this.Send()} className="btn btn-primary form-control">Send</button>
            </div>
			</form>
			)
		}

		return(
			<div className="row">
				{display}
			</div>
		);
	}
}

export const Jumbotron = () => {
		return(
			<div className="jumbotron">
        <a href="http://www.ptreviews.com">
          <img src="lift_icon.png" alt="lift!" />
        </a>
        <h1 id="headertext">PERSONAL TRAINER REVIEWS
        	<div className="small">A Community Driven, Fitness Review Site!</div>
        </h1>
        <p><Link className="btn btn-lg btn-success" to="/register">Sign up today</Link></p>
				<div style={{color:'red'}}>
					This is a work in progress right now so account signup and reviews aren't working yet, sorry!
				</div>
      </div>
		);
}

export const Nav = () => {
		return(
			<div className="header clearfix">
        <nav>
          <ul className="nav nav-pills pull-right">
            <li role="presentation"><Link to="/">Home</Link></li>
            <li role="presentation"><Link to="/reviews">Reviews</Link></li>
            <li role="presentation"><Link to="/login">Log in</Link></li>
            <li role="presentation"><Link to="/about">About</Link></li>
            <li role="presentation"><Link to="/contact">Contact</Link></li>
						<li role="presentation"><Link to="/blog">Blog</Link></li>
						<li role="presentation"><a target="_blank" href="http://astore.amazon.com/8khs4-20">Store</a></li>
          </ul>
        </nav>
        <h3 className="text-muted">ptreviews.com</h3>
      </div>
		);
}

export const Login = () => {
		return(
			<div>
				<Link to="register">Register?</Link>
				<div className="sign-in form-inline">
					
					<input placeholder="email" className="form-control" />
					<input placeholder="password" className="form-control" />
					<button className="btn btn-primary">Signin</button>
				</div>
			</div>
		);
}
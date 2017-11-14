import React from 'react';
import {Link} from 'react-router-dom';

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
							have the ability to access other PT Alliance gyms at a discount.</li>
						<li>We want to give <b>Personal Trainers</b> a place where they can refer their clients to positive discussion about their abilities and training methods and a place where they can respond to criticisms.</li>
						<li>We also want to provide a place where <b>Athletes and Trainees</b> can discuss experiences they've had with specific trainers or gyms and give ratings in relation to other places they have trained at.</li>
				</ul>
				<h2>Join</h2>
				<p>So join today for free and be part of the fitness review community.</p>  
				<Link className="btn btn-primary" to="/register">Sign up</Link>
			</div>
		);
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

export const Nav = (data) => {
	console.log('nav',data)
		return(
			<div className="header clearfix">
        <nav>
          <ul className="nav nav-pills pull-right">
            <li role="presentation"><Link to="/">Home</Link></li>
            <li role="presentation"><Link to="/reviews">Reviews</Link></li>
						<li role="presentation"><Link to="/about">About</Link></li>
            <li role="presentation"><Link to="/contact">Contact</Link></li>
						<li role="presentation"><Link to="/blog">Blog</Link></li>
						<Profile {...data} />
          </ul>
        </nav>
        <h3 className="text-muted">ptreviews.com</h3>
      </div>
		);
}

export const Profile = (props) => {
	console.log('profile', props)


			if(!props.LoggedIn)
				return <li role="presentation"><Link to="/login">Log in</Link></li>

			return <li role="presentation">{props.UserInfo.accessToken.payload.username}</li>

}

export const Footer = () => {
	var curDate = new Date();
	
	return(
		<footer className="footer">
			<p>&copy; <span id="curYear">{curDate.getUTCFullYear()}</span> LCB Designs</p>
		</footer>
	);
}


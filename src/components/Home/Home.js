import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import classes from './Home.module.scss';

const Home = (props) => {
  return (
    <div className={classes.Home}>
      <h1>Welcome to Website! </h1>
      <hr />
      <p>
        This is a dummy webshop, NOTHING is real! This website's goal was to practice my
        new knowlendge about React (Javascript framework). Here You can simulate shopping,
        but you can't buy things for real. If you want to test it, Go on and enjoy it.
        <span>
          I would be pleased If I get feedbacks to{' '}
          <Link
            target="_blank"
            to={{
              pathname: 'mailto:dzurikdesign@gmail.com?subject=DummyWebshop',
            }}
          >
            dzurikdesign@gmail.com
          </Link>
        </span>
      </p>
      <Link to="/signup">
        <Button>SIGN UP FREE</Button>
      </Link>
    </div>
  );
};

export default Home;

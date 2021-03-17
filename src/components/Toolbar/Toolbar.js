import classes from './Toolbar.module.scss';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <Logo />
      <nav>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;

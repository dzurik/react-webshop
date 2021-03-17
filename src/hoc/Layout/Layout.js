import classes from './Layout.module.scss';
import Toolbar from '../../components/Toolbar/Toolbar';

const Layout = (props) => {
  return (
    <div>
      <Toolbar />
      <div className={classes.Content}>{props.children}</div>
    </div>
  );
};

export default Layout;

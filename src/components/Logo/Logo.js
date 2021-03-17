import LogoImage from '../../assets/images/logo.png';
import classes from './Logo.module.scss';

const Logo = () => {
  return <img src={LogoImage} alt="Dummy Webshop logo" className={classes.Logo} />;
};

export default Logo;

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions';

class Header extends Component {

  render(){
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.grow} variant="h6" color="inherit">
              <Link to="/" style={{ textDecoration: "none", color: "white"}} >ブラウザハクスラ（仮）</Link>
            </Typography>
            { this.props.users.isLoggedIn ? <Button type="button" color="inherit" onClick={ () => this.onLogout() }>ログアウト</Button> : '' }
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  onLogout() {
    this.props.dispatch(logout());
  }
}

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

export default connect(state => state)(withStyles(styles)(Header));
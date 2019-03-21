import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Button, TextField, Typography, Dialog, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { REGISTER_USER } from '../constants/ActionTypes'
import { registerUser, login } from '../actions';
import { withRouter } from 'react-router-dom';

class RegistrationCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        };
        this.reName = new RegExp('^\\w{3,32}$');
        this.rePassword = new RegExp('^\\w{6,}$');
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        const classes = this.props.classes

        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5">ユーザ登録</Typography>
                    <TextField
                        label="ユーザ名"
                        className={classes.textField}
                        value={this.state.name}
                        margin="normal"
                        onChange={this.handleChange('name')}
                        helperText="半角英数字 3文字以上32文字以下"
                        error={this.state.name && !this.validateName()}
                    />
                    <TextField
                        label="パスワード"
                        className={classes.textField}
                        value={this.state.password}
                        margin="normal"
                        type="password"
                        onChange={this.handleChange('password')}
                        helperText="半角英数字 6文字以上"
                        error={this.state.password && !this.validatePassword()}
                    />
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={() => this.onRegister()}
                        disabled={this.buttonDisabled()}
                    >
                        { this.props.users.isRegistering || this.props.users.isLoggingIn ?
                            <CircularProgress size={25} color="primary"/>
                            : '登録'}
                    </Button>
                </CardContent>
            </Card>
        )
    }

    validateName() {
        return this.reName.test(this.state.name);
    }

    validatePassword() {
        return this.rePassword.test(this.state.password);
    }

    buttonDisabled() {
        return this.props.users.isRegistering || this.props.users.isLoggingIn || !this.validateName() || !this.validatePassword()
    }

    async onRegister() {
        try {
            await this.props.dispatch(registerUser(this.state.name, this.state.password));
            this.props.dispatch(login(this.state.name, this.state.password));
        } catch (error) {
            console.log(error);
        }
    }
}

const styles = theme => ({
    card: {
        margin: theme.spacing.unit,
        display: 'inline-block',
        textAlign: 'left',
        verticalAlign: 'top',
        minWidth: 275
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        display: 'block'
    },
    button: {
        margin: theme.spacing.unit,
    }
});

export default connect( state => state )(withStyles(styles)(RegistrationCard));
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Button, TextField, Typography, Dialog, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { REGISTER_USER } from '../constants/ActionTypes'
import { registerUser } from '../actions';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            showAlert: false
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
            <div className={classes.root}>
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
                            disabled={this.props.users.isRegistering || !this.validateName() || !this.validatePassword()}
                        >
                            { this.props.users.isRegistering ?
                                <CircularProgress size={25} color="primary"/>
                                : '登録'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    validateName() {
        return this.reName.test(this.state.name);
    }

    validatePassword() {
        return this.rePassword.test(this.state.password);
    }

    async onRegister() {
        await this.props.dispatch(registerUser(this.state.name, this.state.password))
        if (this.props.users.error === null) {
            // 成功
            // ログイン処理
            console.log(this.props.users.userId);
        } else {
            // 失敗
            alert('ユーザ登録に失敗しました')
            console.log(this.props.users.error);
        }
    }
}

const styles = theme => ({
    root: {
        textAlign: 'center'
    },
    card: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        display: 'inline-block',
        textAlign: 'left',
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

export default connect( state => state )(withStyles(styles)(Registration));
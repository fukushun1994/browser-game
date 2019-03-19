import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Button, TextField, Typography } from '@material-ui/core';


class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
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
                        onClick={this.onRegister}
                        disabled={!this.validateName() || !this.validatePassword()}
                    >
                        登録
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

    onRegister() {
        //TODO: ユーザ登録APIを叩く
    }
}

const styles = theme => ({
    card: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '60%',
        minWidth: 275,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        display: 'block'
    },
    button: {
        margin: theme.spacing.unit,
    },
});

export default withStyles(styles)(Registration);
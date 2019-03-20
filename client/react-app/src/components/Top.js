import React, { Component } from 'react';
import RegistrationCard from './RegistrationCard';
import LoginCard from './LoginCard';
import { connect } from 'react-redux';

class Top extends Component {
    render() {
        if (this.props.users.isLoggedIn) {
            return (
                <div>
                    Topページ
                </div>
            );
        } else {
            return (
                <div style={{textAlign: 'center'}}>
                    <RegistrationCard />
                    <LoginCard />
                </div>
            );
        }
    }
}
export default connect( state => state )(Top);
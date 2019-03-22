import React, { Component } from 'react';
import RegistrationCard from './RegistrationCard';
import LoginCard from './LoginCard';
import { connect } from 'react-redux';
import StatusCard from './StatusCard';

class Top extends Component {
    render() {
        if (this.props.users.isLoggedIn) {
            return (
                <div>
                    <StatusCard />
                </div>
            );
        } else {
            return (
                <div style={{textAlign: 'center'}}>
                    <LoginCard />
                    <RegistrationCard />
                </div>
            );
        }
    }
}
export default connect( state => state )(Top);
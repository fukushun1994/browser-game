import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Button, TextField, Typography, Dialog, CircularProgress, List, ListItem } from '@material-ui/core';

class StatusCard extends Component {
    render() {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5">ステータス</Typography>
                    <List>
                        <ListItem>
                            <Typography variant="h7">HP: 10,000,000</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant="h7">ATK: 88,460,019</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant="h7">DEF: 54,893,672</Typography>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        )
    }
}

export default StatusCard;
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Button, TextField, Typography, Dialog, CircularProgress, List, ListItem, ListItemText } from '@material-ui/core';

class QuestCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questResult: null
        };
    }

    render() {
        const turnItem = (turn) => (
            <ListItem>
                <div>
                    <Typography variant="h7">{ 'ターン' + turn.number }</Typography>
                    <Typography variant="h7">{ '自分のHP：' + turn.player_info.prev_status.hp }</Typography>
                    <Typography variant="h7">{ '相手のHP：' + turn.enemy_info.prev_status.hp }</Typography>
                    <Typography variant="h7">{ '自分の' + turn.player_info.action.name + '！' }</Typography>
                    <Typography variant="h7">{ '相手に' + turn.player_info.action.damage + 'のダメージ' }</Typography>
                    {
                        turn.enemy_info.action.type !== 'none' ?
                        (
                            <div>
                                <Typography variant="h7">{ '相手の' + turn.enemy_info.action.name + '！' }</Typography>
                                <Typography variant="h7">{ '自分に' + turn.enemy_info.action.damage + 'のダメージ' }</Typography>
                            </div>
                        ) :
                        ''
                    }
                </div>
            </ListItem>
        );
        const questResultList = (result) => {
            if (result === null) return '';
            return (
                <List>
                    { result.turns.map(turnItem) }
                    <ListItem>
                    {
                        result.is_win ?
                        (
                            <div>
                                <Typography variant="h7">{ result.enemy_name + 'を倒した！' }</Typography>
                                <Typography variant="h7">{ 'EXPを' + result.reward.exp + '獲得し，お金を' + result.reward.money + 'G獲得した' }</Typography>
                                {
                                    result.reward.items.length > 0 ?
                                    (
                                        <div>
                                            <Typography variant="h7">さらに以下のアイテムを獲得した！</Typography>
                                            <List>
                                                {
                                                    result.reward.items.map((item) => (
                                                        <ListItem>
                                                            <Typography variant="h7">{ item }</Typography>
                                                        </ListItem>
                                                    ))
                                                }
                                            </List>
                                        </div>
                                    ) : ''
                                }
                            </div>
                        ) : 
                        result.is_draw ?
                        (
                            <Typography variant="h7">引き分けた</Typography>
                        ) :
                        (
                            <Typography variant="h7">{ result.enemy_name + 'に敗北した…' }</Typography>
                        )
                    }
                    </ListItem>
                </List>
            );
        };

        // TODO: クエストを自動的に取得し，ボタンとして配置
        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography variant="h5">クエスト</Typography>
                        <Button onClick={() => this.onStartQuest(0)}>スライム</Button>
                    </CardContent>
                </Card>
                <Dialog open={this.state.questResult !== null} onClose={() => this.setState({questResult: null})}>
                    { questResultList(this.state.questResult) }
                </Dialog>
            </div>
        )
    }

    onStartQuest(questId) {
        // TODO: 指定クエストのバトルを実行し，結果を受け取る
        // response = await battle(questId);
        const response = {
            player_name: 'user',
            enemy_name: 'スライム',
            is_win: true,
            is_draw: false,
            turns : [
                {
                    number: 1,
                    player_info: {
                        prev_status: {
                            hp: 2000
                        },
                        action: {
                            type: 'normal_attack',
                            name: '通常攻撃',
                            damage: 1400
                        },
                        next_status: {
                            hp: 1700
                        }
                    },
                    enemy_info: {
                        prev_status: {
                            hp: 1500
                        },
                        action: {
                            type: 'normal_attack',
                            name: '通常攻撃',
                            damage: 300
                        },
                        next_status: {
                            hp: 0
                        }
                    },
                    is_finish: false
                },
                {
                    number: 2,
                    player_info: {
                        prev_status: {
                            hp: 1700
                        },
                        action: {
                            type: 'normal_attack',
                            name: '通常攻撃',
                            damage: 1300
                        },
                        next_status: {
                            hp: 1700
                        }
                    },
                    enemy_info: {
                        prev_status: {
                            hp: 100
                        },
                        action: {
                            type: 'none'
                        },
                        next_status: {
                            hp: 0
                        }
                    },
                    is_finish: true
                }
            ],
            reward: {
                exp: 10,
                money: 5,
                items: [
                    'やくそう'
                ]
            },
            level_up_info: {
                is_raised: false
            }
        }
        this.setState({questResult: response})
    }
}

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        display: 'block'
    },
    button: {
        margin: theme.spacing.unit,
    }
});


export default withStyles(styles)(QuestCard);
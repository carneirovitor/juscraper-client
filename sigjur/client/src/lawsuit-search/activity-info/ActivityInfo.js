import { List } from 'antd';
import React, { Component } from 'react';
import './ActivityInfo.scss';
import moment from 'moment';

class ActivityInfo extends Component {
    render() {
        if (!this.props.lsTimeline) {
            return null
        }
        else if (this.props.lsTimeline) {
            return (
                <div className="ActivityInfo">
                    <List
                        size="large"
                        header={<h3 style={{ margin: 0 }}>MOVIMENTAÇÕES</h3>}
                        bordered
                        dataSource={this.props.lsTimeline}
                        renderItem={move =>
                            (
                                <List.Item>
                                    <div className="column">
                                        <span>{moment(move.date).format('DD/MM/YYYY')}</span>
                                        <h4>{move.description}</h4>
                                    </div>
                                </List.Item>
                            )
                        }
                    />
                </div>
            )
        } else {
            return null;
        }
    }
}

export default ActivityInfo
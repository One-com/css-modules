import React, { Component } from 'react';
import { browserHistory as history } from 'react-router';
import Page from '../../components/Page';
import Button from '../../components/Button';

export default class Bar extends Component {
    render() {
        return (
            <Page>
                Bar
                <br />
                <br />
                <Button onClick={history && history.goBack}>←</Button>
            </Page>
        );
    }
}

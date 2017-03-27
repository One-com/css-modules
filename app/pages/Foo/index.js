import React, { Component } from 'react';
import { browserHistory as history } from 'react-router';
import Page from '../../components/Page';
import Button from '../../components/Button';

export default class Foo extends Component {
    render() {
        return (
            <Page>
                Foo
                <br />
                <br />
                <Button onClick={history && history.goBack}>←</Button>
            </Page>
        );
    }
}

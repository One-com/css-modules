import React, { Component } from 'react';
import { browserHistory as history } from 'react-router';
import Page from '../../components/Page';
import Button from '../../components/Button';
import styles from './Foo.css';

export default class Foo extends Component {
    render() {
        return (
            <Page>
                <h1 className={styles.Heading}>Foo with class .Heading</h1>
                <br />
                <Button onClick={history && history.goBack}>←</Button>
            </Page>
        );
    }
}

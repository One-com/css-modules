import React, { Component } from 'react';
import { browserHistory as history } from 'react-router';
import Page from '../../components/Page';
import Button from '../../components/Button';
import styles from './Bar.css';

export default class Bar extends Component {
    render() {
        return (
            <Page>
                <h1 className={styles.Heading}>Bar with class .Heading</h1>
                <br />
                <Button onClick={history && history.goBack}>←</Button>
            </Page>
        );
    }
}

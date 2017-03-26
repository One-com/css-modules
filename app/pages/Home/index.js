import React, { Component } from 'react';
import { Link } from 'react-router';
import Page from '../../components/Page';
import Button from '../../components/Button';
import styles from './Home.css';

export default class Home extends Component {
    render() {
        return (
            <Page>
                <h1 className={styles.Heading}>CSS Modules Demo</h1>
                <Link to='/foo'>
                    <Button
                        className={styles.Button}
                        color='blue'
                    >
                        foo
                    </Button>
                </Link>
                <Link to='/bar'>
                    <Button
                        className={styles.Button}
                        color='green'
                    >
                        bar
                    </Button>
                </Link>
            </Page>
        );
    }
}

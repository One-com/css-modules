import React, { Component } from 'react';
import { Link } from 'react-router';
import Page from '../../components/Page';
import Button from '../../components/Button';
import styles from './Home.css';

export default class Home extends Component {
    render() {
        return (
            <Page className={styles.Home}>
                <h1 className={styles.Heading}>CSS Modules Demo</h1>
                <blockquote className={styles.Blockquote}>
                    "A CSS Module is a CSS file in which all class names and animation names are scoped locally by default."<br />
                    <cite>- <a href='https://github.com/css-modules/css-modules'>github.com/css-modules/css-modules</a></cite>
                </blockquote>
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

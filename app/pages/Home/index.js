import React, { Component } from 'react';
import { Link } from 'react-router';
import Button from '../../components/Button';
import styles from './Home.css';

export default class Home extends Component {
    render() {
        return (
            <div className={styles.Home}>
                <div>
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
                </div>
            </div>
        );
    }
}

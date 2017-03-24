import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1 className={styles.Heading}>CSS Modules Demo</h1>
                <ul>
                    <li>
                        <Link to='/foo'>foo</Link>
                    </li>
                    <li>
                        <Link to='/bar'>bar</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

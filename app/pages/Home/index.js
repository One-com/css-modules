import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
    render() {
        return (
            <div>
                Home
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

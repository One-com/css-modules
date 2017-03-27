import React, { Component } from 'react';
import { Link } from 'react-router';
import Page from '../../components/Page';
import Button from '../../components/Button';

export default class Bar extends Component {
    render() {
        return (
            <Page>
                Bar
                <br />
                <br />
                <Link to='/'>
                    <Button>←</Button>
                </Link>
            </Page>
        );
    }
}

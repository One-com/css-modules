import React, { Component } from 'react';
import { Link } from 'react-router';
import Page from '../../components/Page';
import Button from '../../components/Button';

export default class Foo extends Component {
    render() {
        return (
            <Page>
                Foo
                <br />
                <br />
                <Link to='/'>
                    <Button>←</Button>
                </Link>
            </Page>
        );
    }
}

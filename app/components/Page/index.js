import React, { Component, PropTypes } from 'react';
import styles from './Page.css';

export default class Page extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node
    }

    render() {
        const {
            children,
            ...rest
        } = this.props;

        let className = styles.Page;

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return (
            <div
                {...rest}
                className={className}
            >
                <div>
                    {children}
                </div>
            </div>
        );
    }
}

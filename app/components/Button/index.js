import React, { Component, PropTypes } from 'react';
import styles from './Button.css';

export default class Button extends Component {
    static colors = {
        blue: styles.Blue,
        green: styles.Green
    }

    static propTypes = {
        className: PropTypes.string,
        color: PropTypes.oneOf(Object.keys(Button.colors))
    }

    render() {
        let className;

        if (this.props.color) {
            className = Button.colors[this.props.color];
        } else {
            className = styles.Button;
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return (
            <button
                {...this.props}
                className={className}
            />
        );
    }
}

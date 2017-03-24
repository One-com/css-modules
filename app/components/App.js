import { Component, PropTypes } from 'react';

export default class App extends Component {
    static childContextTypes = {
        scriptUrl: PropTypes.string.isRequired,
        stylesUrl: PropTypes.string.isRequired,
        protocol: PropTypes.string.isRequired,
        host: PropTypes.string.isRequired
    }

    static propTypes = {
        scriptUrl: PropTypes.string.isRequired,
        stylesUrl: PropTypes.string.isRequired,
        protocol: PropTypes.string.isRequired,
        host: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired
    }

    getChildContext() {
        return {
            scriptUrl: this.props.scriptUrl,
            stylesUrl: this.props.stylesUrl,
            protocol: this.props.protocol,
            host: this.props.host
        };
    }

    render() {
        return this.props.children;
    }
}

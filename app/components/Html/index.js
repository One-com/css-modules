import React, { PureComponent as Component, PropTypes } from 'react';
import { oneLine } from 'common-tags';
import './Html.css';

export default class Html extends Component {
    static propTypes = {
        children: PropTypes.node,
        params: PropTypes.object.isRequired
    }

    static contextTypes = {
        scriptUrl: PropTypes.string.isRequired,
        stylesUrl: PropTypes.string.isRequired,
        protocol: PropTypes.string.isRequired,
        host: PropTypes.string.isRequired
    }

    render() {
        const {
            children,
            params: {
                title
            }
        } = this.props;

        const {
            scriptUrl,
            stylesUrl,
            protocol,
            host
        } = this.context;

        return (
            <html>
                <head>
                    <meta charSet='utf-8' />
                    <meta httpEquiv='x-ua-compatible' content='ie=edge' />
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <title>{title}</title>
                    <script dangerouslySetInnerHTML={{ __html: oneLine`
                        window.scriptUrl = '${scriptUrl}';
                        window.stylesUrl = '${stylesUrl}';
                        window.protocol = '${protocol}';
                        window.host = '${host}';
                    `}} />
                    <script defer src={scriptUrl} />
                    <link href={stylesUrl} rel='stylesheet' />
                </head>
                <body>
                    {children}
                </body>
            </html>
        );
    }
}

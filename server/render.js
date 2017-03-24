import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import App from '../app/components/App';

export default options => renderToString(
    <App
        scriptUrl={`/static/${options.client[0]}`}
        stylesUrl={`/static/${options.client[1]}`}
        protocol={options.protocol}
        host={options.host}
    >
        <RouterContext
            {...options.renderProps}
        />
    </App>
);

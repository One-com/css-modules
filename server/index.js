import { resolve, extname, basename } from 'path';
import MemoryFS from 'memory-fs';
import { stripIndents } from 'common-tags';
import { exec } from 'child_process';
import webpack from 'webpack';
import Koa from 'koa';
import createLogger from 'concurrency-logger';
import Router from 'koa-router';
import { match } from 'react-router';
import defaults from '../config.example';

let config = defaults;

const requireFromString = (src, filename) => {
    const Module = module.constructor;
    const _module = new Module();
    _module._compile(src, filename);
    return _module.exports;
};

const memoryFS = new MemoryFS;

(async () => {
    try {
        config = require('../config').default;
    } catch (error) {
        try {
            await new Promise((resolve, reject) => {
                exec('cp config.example.js config.js', error => {
                    if (error) {
                        return reject(error);
                    }

                    resolve();
                });
            });

            // eslint-disable-next-line no-console
            console.info('No config file found, created new config.js');
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Failed trying to create config.js', error);
        }
    }

    let client;
    let render;
    let routes;

    if (process.env.NODE_ENV === 'production') {
        const assets = require('./build/assets').client;
        client = [assets.js, assets.css];

        render = require('./build/render').default;
        routes = require('./build/routes').default;
    } else {
        const packer = options => {
            const {
                path,
                onCompiled
            } = options;

            return new Promise(resolve => {
                const compiler = webpack(require(path).default);

                compiler.outputFileSystem = memoryFS;

                const done = (err, stats) => {
                    if (err) {
                        // eslint-disable-next-line no-console
                        console.error(err);
                    }

                    const _stats = stats.toJson();

                    if (_stats.errors.length) {
                        // eslint-disable-next-line no-console
                        console.error(_stats.errors);
                    }

                    const info = stats.toString('minimal');

                    // eslint-disable-next-line no-console
                    console.info(info);

                    onCompiled(stats, _stats.assetsByChunkName);
                };

                let once = function (...args) {
                    done.apply(this, args);
                    once = done;
                    resolve();
                };

                compiler.watch({}, once);
            });
        };

        await Promise.all([
            packer({
                path: './webpack/client',
                onCompiled(stats, assets) {
                    client = assets.client;
                }
            }),
            packer({
                path: './webpack/server',
                onCompiled(stats, assets) {
                    render = requireFromString(
                        stats.compilation.assets[assets.render].source(),
                        `./build/${assets.render}`
                    ).default;

                    routes = requireFromString(
                        stats.compilation.assets[assets.routes].source(),
                        `./build/${assets.routes}`
                    ).default;
                }
            })
        ]);
    }

    const app = new Koa;
    const router = new Router;

    if (process.env.NODE_ENV !== 'production') {
        router.get('/static/*', async context => {
            const file = context.params[0];
            context.type = extname(basename(file));
            context.body = memoryFS.createReadStream(resolve(`./public/${context.params[0]}`));
        });
    }

    router.get('/*', async context => {
        const runRoutes = config => new Promise((resolve, reject) => {
            match(config, (error, redirectLocation, renderProps) => {
                if (error) {
                    return reject(error);
                }

                resolve({
                    redirectLocation,
                    renderProps
                });
            });
        });

        const {
            redirectLocation,
            renderProps
        } = await runRoutes({
            routes,
            location: context.url
        });

        if (redirectLocation) {
            const {
                pathname,
                search
            } = redirectLocation;

            context.status = 302;
            context.redirect = pathname + search;
        } else if (renderProps) {
            const document = render({
                client,
                protocol: context.protocol,
                host: context.host,
                renderProps
            });

            const notFound = renderProps.routes.some(({ path }) =>
                path === '*'
            );

            context.status = notFound ? 404 : 200,
            context.body = stripIndents`
                <!doctype html>
                ${document}
            `;
        }
    });

    const logger = createLogger();

    app.use(async (context, next) => {
        try {
            await next();
        } catch (error) {
            context.status = 500;

            context.body = stripIndents`
                ${error.message}

                ${error.stack}
            `;
        }
    });

    app.use(logger);
    app.use(router.routes());

    const server = app.listen(config.port, () => {
        const address = `http://0.0.0.0:${server.address().port}`;
        // eslint-disable-next-line no-console
        console.info(address);

        if (process.env.NODE_ENV !== 'production') {
            exec(`sensible-browser ${address}`);
        }
    });
})().catch(error => {
    // eslint-disable-next-line no-console
    console.error(error);
});

import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { renderToString } from 'react-dom/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Отель Летягинъ';

// PORT 13716 — pinned to avoid cross-project bleed with na-ugle (13714) or
// dom-na-utese (13715). See playbook/STACK.md §R5.
createServer(
    (page) =>
        createInertiaApp({
            page,
            render: renderToString,
            title: (title) => (title ? `${title} — ${appName}` : appName),
            resolve: (name) =>
                resolvePageComponent(
                    `./Pages/${name}.jsx`,
                    import.meta.glob('./Pages/**/*.jsx'),
                ),
            setup: ({ App, props }) => <App {...props} />,
        }),
    13716,
);

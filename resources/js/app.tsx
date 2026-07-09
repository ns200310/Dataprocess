import { createInertiaApp } from '@inertiajs/react';
import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client';
import 'leaflet/dist/leaflet.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: '#4B5563',
    },
    setup({ el, App, props }) {
    createRoot(el).render(
      <MantineProvider defaultColorScheme='dark'>
        <App {...props} />
      </MantineProvider>
    );
  },
});

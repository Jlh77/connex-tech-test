import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './app';

// The real DataGrid imports CSS that Node can't load in tests
vi.mock('@mui/x-data-grid', () => ({ DataGrid: () => null }));

const renderApp = () =>
  render(
    <BrowserRouter>
      <QueryClientProvider
        client={
          new QueryClient({ defaultOptions: { queries: { retry: false } } })
        }
      >
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  );

describe('App', () => {
  it('renders the dashboard', () => {
    renderApp();

    expect(screen.getByText('ConnexAI Dashboard')).toBeTruthy();
    expect(screen.getByText('Agents Daily Report')).toBeTruthy();
  });
});

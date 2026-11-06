import { Route, Routes, Link } from 'react-router-dom';
import Dashboard from '../pages';
import AppTheme from '../theme/AppTheme';

export function App() {
  return (
    <AppTheme>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </AppTheme>
  );
}

export default App;

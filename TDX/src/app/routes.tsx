import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Technology } from './pages/Technology';
import { CaseStudies } from './pages/CaseStudies';
import { Contact } from './pages/Contact';
import { Lumenore } from './pages/Lumenore';
import { Blog } from './pages/Blog';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'services', Component: Services },
      { path: 'technology', Component: Technology },
      { path: 'lumenore', Component: Lumenore },
      { path: 'case-studies', Component: CaseStudies },
      { path: 'contact', Component: Contact },
      { path: 'blog', Component: Blog },
    ],
  },
]);

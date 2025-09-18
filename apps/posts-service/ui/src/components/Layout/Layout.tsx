import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
      <>
        <Header />
        <main className="dashboard-content">
          <div className="container">
            {children}
          </div>
        </main>
      </>
  );
};

export default Layout;

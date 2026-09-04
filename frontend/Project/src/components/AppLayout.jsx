import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { TaskProvider } from '../context/TaskContext';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <TaskProvider>
      <div className="min-h-screen flex bg-ink-50">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 min-w-0 flex flex-col">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-6xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </TaskProvider>
  );
}

import React from 'react';
import { Button } from '@/components/ui/enhanced-button';
import { BookOpen, LogOut, User, Search, BarChart3, Clock } from 'lucide-react';

interface LibraryLayoutProps {
  children: React.ReactNode;
  userType: 'student' | 'admin';
  userName: string;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const LibraryLayout: React.FC<LibraryLayoutProps> = ({
  children,
  userType,
  userName,
  onLogout,
  currentPage,
  onNavigate
}) => {
  const studentPages = [
    { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
    { id: 'search', label: 'Search Books', icon: Search },
    { id: 'issued', label: 'My Books', icon: Clock },
    { id: 'leaderboard', label: 'Leaderboard', icon: BarChart3 }
  ];

  const adminPages = [
    { id: 'dashboard', label: 'Admin Dashboard', icon: BookOpen },
    { id: 'books', label: 'Manage Books', icon: Search },
    { id: 'students', label: 'Students', icon: User },
    { id: 'leaderboard', label: 'Leaderboard', icon: BarChart3 }
  ];

  const pages = userType === 'admin' ? adminPages : studentPages;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-hero shadow-elegant sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-primary-foreground" />
            <h1 className="text-2xl font-bold text-primary-foreground">
              Library Management System
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-primary-foreground font-medium">
              Welcome, {userName}
            </span>
            <Button variant="outline" size="sm" onClick={onLogout} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex gap-6">
        <aside className="w-64 bg-card rounded-lg shadow-card p-6 h-fit sticky top-24">
          <nav className="space-y-2">
            {pages.map((page) => {
              const Icon = page.icon;
              return (
                <button
                  key={page.id}
                  onClick={() => onNavigate(page.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    currentPage === page.id
                      ? 'bg-primary text-primary-foreground shadow-book'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{page.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};
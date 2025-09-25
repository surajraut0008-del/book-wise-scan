import React, { useState } from 'react';
import { LibraryLayout } from '@/components/LibraryLayout';
import { LoginPage } from '@/components/LoginPage';
import { Dashboard } from '@/components/Dashboard';
import { SearchBooks } from '@/components/SearchBooks';
import { BookDetailsPage } from '@/components/BookDetailsPage';
import { Leaderboard } from '@/components/Leaderboard';
import { Book } from '@/data/mockBooks';

type User = {
  type: 'student' | 'admin';
  name: string;
  id: string;
};

type Page = 'dashboard' | 'search' | 'books' | 'students' | 'issued' | 'leaderboard' | 'book-details';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleLogin = (userType: 'student' | 'admin', credentials: any) => {
    // Mock authentication - in real app, this would validate against backend
    const mockUser: User = {
      type: userType,
      name: userType === 'student' ? 'John Doe' : 'Ms. Librarian',
      id: credentials.studentId || credentials.idCard
    };
    setUser(mockUser);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
    setSelectedBook(null);
  };

  const handleViewBook = (book: Book) => {
    setSelectedBook(book);
    setCurrentPage('book-details');
  };

  const handleBackFromBook = () => {
    setSelectedBook(null);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const renderCurrentPage = () => {
    if (!user) return null;

    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            userType={user.type}
            onViewBook={handleViewBook}
            onNavigate={handleNavigate}
          />
        );
      case 'search':
      case 'books':
        return (
          <SearchBooks
            onViewBook={handleViewBook}
            userType={user.type}
          />
        );
      case 'leaderboard':
        return <Leaderboard />;
      case 'book-details':
        return selectedBook ? (
          <BookDetailsPage
            book={selectedBook}
            onBack={handleBackFromBook}
            userType={user.type}
            isIssued={Math.random() > 0.7} // Mock issued status
            issueDate="2024-01-15"
            returnDate="2024-01-30"
          />
        ) : null;
      case 'issued':
        return (
          <Dashboard
            userType={user.type}
            onViewBook={handleViewBook}
            onNavigate={handleNavigate}
          />
        );
      case 'students':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Student Management</h2>
            <p className="text-muted-foreground">
              Student management features would be implemented here with database integration.
            </p>
          </div>
        );
      default:
        return (
          <Dashboard
            userType={user.type}
            onViewBook={handleViewBook}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <LibraryLayout
      userType={user.type}
      userName={user.name}
      onLogout={handleLogout}
      currentPage={currentPage}
      onNavigate={handleNavigate}
    >
      {renderCurrentPage()}
    </LibraryLayout>
  );
};

export default Index;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { BookCard } from './BookCard';
import { Book, mockBooks, departments } from '@/data/mockBooks';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Clock,
  Bell,
  Calendar,
  Award
} from 'lucide-react';

interface DashboardProps {
  userType: 'student' | 'admin';
  onViewBook: (book: Book) => void;
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userType, onViewBook, onNavigate }) => {
  // Mock data for dashboard stats
  const studentStats = {
    currentlyIssued: 2,
    totalIssued: 15,
    overdueBooks: 0,
    renewals: 3
  };

  const adminStats = {
    totalBooks: mockBooks.length,
    totalStudents: 245,
    issuedToday: 12,
    overdueBooks: 8
  };

  const recentlyIssued = mockBooks.slice(0, 3);
  const popularBooks = mockBooks.filter(book => book.available < book.total).slice(0, 4);

  const departmentStats = departments.map(dept => ({
    name: dept,
    issued: Math.floor(Math.random() * 50) + 10,
    students: Math.floor(Math.random() * 30) + 15
  })).sort((a, b) => b.issued - a.issued);

  const notifications = [
    { id: 1, message: "Return 'Data Structures in C' by tomorrow", type: 'warning' },
    { id: 2, message: "New AI books added to collection", type: 'info' },
    { id: 3, message: "Library will be closed on Sunday", type: 'info' }
  ];

  if (userType === 'student') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
          <Badge variant="outline" className="text-sm">
            Welcome back! 📚
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-card bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Currently Issued</p>
                  <p className="text-2xl font-bold text-primary">{studentStats.currentlyIssued}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Issued</p>
                  <p className="text-2xl font-bold text-success">{studentStats.totalIssued}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue Books</p>
                  <p className="text-2xl font-bold text-destructive">{studentStats.overdueBooks}</p>
                </div>
                <Clock className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Renewals</p>
                  <p className="text-2xl font-bold text-warning">{studentStats.renewals}</p>
                </div>
                <Calendar className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-primary" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-3 rounded-lg border-l-4 ${
                    notification.type === 'warning' 
                      ? 'border-warning bg-warning/10' 
                      : 'border-primary bg-primary/10'
                  }`}
                >
                  <p className="text-sm">{notification.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle>Recently Issued Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentlyIssued.map((book) => (
                  <div key={book.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{book.title}</p>
                      <p className="text-xs text-muted-foreground">{book.author}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => onViewBook(book)}>
                      View
                    </Button>
                  </div>
                ))}
              </div>
              <Button 
                className="w-full mt-4" 
                variant="secondary"
                onClick={() => onNavigate('issued')}
              >
                View All My Books
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-secondary" />
                <span>Department Leaderboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {departmentStats.slice(0, 5).map((dept, index) => (
                  <div key={dept.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-secondary text-secondary-foreground' :
                        index === 1 ? 'bg-muted text-muted-foreground' :
                        'bg-accent text-accent-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium">{dept.name.split(' ')[0]}</span>
                    </div>
                    <Badge variant="outline">{dept.issued} books</Badge>
                  </div>
                ))}
              </div>
              <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={() => onNavigate('leaderboard')}
              >
                View Full Leaderboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <Badge variant="outline" className="bg-accent text-accent-foreground">
          Librarian Panel 👨‍💼
        </Badge>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Books</p>
                <p className="text-2xl font-bold text-primary">{adminStats.totalBooks}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold text-success">{adminStats.totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Issued Today</p>
                <p className="text-2xl font-bold text-warning">{adminStats.issuedToday}</p>
              </div>
              <Calendar className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue Books</p>
                <p className="text-2xl font-bold text-destructive">{adminStats.overdueBooks}</p>
              </div>
              <Clock className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Books */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Most Issued Books</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onViewDetails={onViewBook}
                onGenerateQR={(book) => alert(`QR Generated for: ${book.title}`)}
                showAvailability={true}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Analytics */}
      <Card className="shadow-card bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-secondary" />
            <span>Department Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold">Top Performing Departments</h3>
              {departmentStats.slice(0, 6).map((dept, index) => (
                <div key={dept.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-secondary text-secondary-foreground' :
                      index === 1 ? 'bg-warning text-warning-foreground' :
                      index === 2 ? 'bg-accent text-accent-foreground' :
                      'bg-muted-foreground text-background'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{dept.name}</p>
                      <p className="text-xs text-muted-foreground">{dept.students} students</p>
                    </div>
                  </div>
                  <Badge variant="outline">{dept.issued} books</Badge>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold">Quick Actions</h3>
              <div className="grid gap-3">
                <Button variant="hero" onClick={() => onNavigate('books')}>
                  Manage Books
                </Button>
                <Button variant="secondary" onClick={() => onNavigate('students')}>
                  View Students
                </Button>
                <Button variant="outline" onClick={() => onNavigate('leaderboard')}>
                  Full Leaderboard
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
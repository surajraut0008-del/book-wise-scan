import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, User, Shield, Eye, EyeOff } from 'lucide-react';
import heroImage from '@/assets/library-hero.jpg';

interface LoginPageProps {
  onLogin: (userType: 'student' | 'admin', credentials: any) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [studentCredentials, setStudentCredentials] = useState({
    studentId: '',
    password: ''
  });
  const [adminCredentials, setAdminCredentials] = useState({
    idCard: '',
    password: ''
  });

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentCredentials.studentId && studentCredentials.password) {
      onLogin('student', studentCredentials);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCredentials.idCard && adminCredentials.password) {
      onLogin('admin', adminCredentials);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src={heroImage} 
          alt="Modern Library" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white">
          <BookOpen className="h-16 w-16 mb-6" />
          <h1 className="text-4xl font-bold mb-4">
            Digital Library Management
          </h1>
          <p className="text-xl mb-6 text-white/90">
            Streamline your academic journey with our comprehensive library system
          </p>
          <div className="space-y-3 text-white/80">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span>Search & Discover Books</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span>QR Code Integration</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span>Smart Notifications</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span>Department Leaderboard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground mt-2">Sign in to access your library account</p>
          </div>

          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Student</span>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <Card className="shadow-card bg-gradient-card">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <User className="h-5 w-5 text-primary" />
                    <span>Student Login</span>
                  </CardTitle>
                  <CardDescription>
                    Enter your student ID and password to continue
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleStudentLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentId">Student ID (14000-15000)</Label>
                      <Input
                        id="studentId"
                        type="text"
                        placeholder="Enter your student ID"
                        value={studentCredentials.studentId}
                        onChange={(e) => setStudentCredentials(prev => ({ ...prev, studentId: e.target.value }))}
                        className="bg-background"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="studentPassword">Password</Label>
                      <div className="relative">
                        <Input
                          id="studentPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={studentCredentials.password}
                          onChange={(e) => setStudentCredentials(prev => ({ ...prev, password: e.target.value }))}
                          className="bg-background pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" variant="hero">
                      Sign In as Student
                    </Button>
                  </form>
                  <div className="mt-4 text-center space-y-2">
                    <Button variant="ghost" size="sm">
                      New Registration
                    </Button>
                    <Button variant="ghost" size="sm">
                      Forgot Password?
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admin">
              <Card className="shadow-card bg-gradient-card">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <Shield className="h-5 w-5 text-accent" />
                    <span>Admin Login</span>
                  </CardTitle>
                  <CardDescription>
                    Librarian access - enter your credentials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="idCard">ID Card Number</Label>
                      <Input
                        id="idCard"
                        type="text"
                        placeholder="Enter your ID card number"
                        value={adminCredentials.idCard}
                        onChange={(e) => setAdminCredentials(prev => ({ ...prev, idCard: e.target.value }))}
                        className="bg-background"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminPassword">Password</Label>
                      <div className="relative">
                        <Input
                          id="adminPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={adminCredentials.password}
                          onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                          className="bg-background pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" variant="academic">
                      Sign In as Admin
                    </Button>
                  </form>
                  <div className="mt-4 text-center">
                    <Button variant="ghost" size="sm">
                      Forgot Password?
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
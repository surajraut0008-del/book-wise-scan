import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { departments } from '@/data/mockBooks';
import { Award, Trophy, Medal, Users, BookOpen, TrendingUp } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const departmentStats = departments.map((dept, index) => ({
    name: dept,
    shortName: dept.split(' ')[0] + (dept.includes('&') ? ' & ' + dept.split('& ')[1].split(' ')[0] : ''),
    issued: Math.floor(Math.random() * 100) + 50,
    students: Math.floor(Math.random() * 40) + 20,
    averagePerStudent: 0,
    growth: Math.floor(Math.random() * 30) - 15
  })).map(dept => ({
    ...dept,
    averagePerStudent: Math.round((dept.issued / dept.students) * 10) / 10
  })).sort((a, b) => b.issued - a.issued);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Medal className="h-6 w-6 text-amber-600" />;
      default: return <Award className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-secondary text-secondary-foreground';
      case 2: return 'bg-muted text-muted-foreground';
      case 3: return 'bg-warning text-warning-foreground';
      default: return 'bg-accent text-accent-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Department Leaderboard</h1>
        <p className="text-muted-foreground">
          Ranking based on total books issued across all departments
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {departmentStats.slice(0, 3).map((dept, index) => {
          const rank = index + 1;
          return (
            <Card key={dept.name} className={`shadow-elegant relative overflow-hidden ${
              rank === 1 ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200' : 
              rank === 2 ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200' :
              'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200'
            }`}>
              <div className={`absolute top-0 right-0 w-16 h-16 ${
                rank === 1 ? 'bg-secondary' :
                rank === 2 ? 'bg-muted' :
                'bg-warning'
              } rounded-bl-full flex items-center justify-center`}>
                <span className="text-2xl font-bold text-white mt-2 mr-2">
                  {rank}
                </span>
              </div>
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  {getRankIcon(rank)}
                </div>
                <h3 className="font-bold text-lg mb-2">{dept.shortName}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-2xl font-bold text-primary">{dept.issued}</span>
                    <span className="text-sm text-muted-foreground">books</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{dept.students} students</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {dept.averagePerStudent} books/student
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Full Rankings Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Complete Rankings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {departmentStats.map((dept, index) => {
              const rank = index + 1;
              return (
                <div 
                  key={dept.name}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-card ${
                    rank <= 3 ? 'bg-gradient-card' : 'bg-background'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${getRankBadgeColor(rank)}`}>
                      {rank}
                    </div>
                    <div className="flex items-center space-x-3">
                      {rank <= 3 && getRankIcon(rank)}
                      <div>
                        <h3 className="font-semibold">{dept.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {dept.students} active students
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="text-xl font-bold text-primary">
                          {dept.issued}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Total Books</p>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-success" />
                        <span className="font-semibold text-success">
                          {dept.averagePerStudent}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Per Student</p>
                    </div>

                    <div className="text-right">
                      <div className={`flex items-center space-x-1 ${
                        dept.growth > 0 ? 'text-success' : 'text-destructive'
                      }`}>
                        <TrendingUp className={`h-4 w-4 ${
                          dept.growth < 0 ? 'rotate-180' : ''
                        }`} />
                        <span className="font-semibold">
                          {dept.growth > 0 ? '+' : ''}{dept.growth}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">This Month</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Statistics Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="shadow-card bg-gradient-card">
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">
              {departmentStats.reduce((sum, dept) => sum + dept.issued, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Total Books Issued</p>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-card">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-success">
              {departmentStats.reduce((sum, dept) => sum + dept.students, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Active Students</p>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-card">
          <CardContent className="p-6 text-center">
            <Award className="h-8 w-8 text-secondary mx-auto mb-2" />
            <p className="text-2xl font-bold text-secondary">
              {Math.round(
                departmentStats.reduce((sum, dept) => sum + dept.averagePerStudent, 0) / 
                departmentStats.length * 10
              ) / 10}
            </p>
            <p className="text-sm text-muted-foreground">Average Books/Student</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card bg-gradient-card">
        <CardContent className="p-6 text-center">
          <Trophy className="h-12 w-12 text-secondary mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">🎉 Congratulations!</h2>
          <p className="text-muted-foreground">
            <strong>{departmentStats[0].name}</strong> leads the leaderboard with{' '}
            <strong>{departmentStats[0].issued} books issued</strong>! Keep up the excellent reading culture! 📚
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
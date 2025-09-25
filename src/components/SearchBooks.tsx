import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookCard } from './BookCard';
import { Book, searchBooks } from '@/data/mockBooks';
import { Search, Filter, ScanLine } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SearchBooksProps {
  onViewBook: (book: Book) => void;
  userType: 'student' | 'admin';
}

export const SearchBooks: React.FC<SearchBooksProps> = ({ onViewBook, userType }) => {
  const [searchQuery, setSearchQuery] = useState({
    title: '',
    author: '',
    edition: ''
  });
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);

  const handleSearch = () => {
    // At least one field must be filled
    if (!searchQuery.title && !searchQuery.author && !searchQuery.edition) {
      return;
    }

    const results = searchBooks(searchQuery);
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleClear = () => {
    setSearchQuery({ title: '', author: '', edition: '' });
    setSearchResults([]);
    setHasSearched(false);
  };

  const simulateQRScan = () => {
    // Simulate QR code scan - in real implementation, this would use camera
    const mockBookId = "1"; // Simulate scanning the first book's QR
    const book = searchResults.find(b => b.id === mockBookId) || searchBooks({})[0];
    if (book) {
      onViewBook(book);
    }
  };

  const getRecommendations = () => {
    // Simple AI recommendation based on Computer Science books
    return searchBooks({}).filter(book => 
      book.department === 'Computer Engineering' || 
      book.department === 'AI & Data Science' ||
      book.title.toLowerCase().includes('algorithm') ||
      book.title.toLowerCase().includes('data')
    ).slice(0, 3);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Search Books</h1>
        <Button 
          onClick={() => setShowQRScanner(!showQRScanner)}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <ScanLine className="h-4 w-4" />
          <span>QR Scanner</span>
        </Button>
      </div>

      {/* QR Scanner Mock */}
      {showQRScanner && (
        <Card className="shadow-card bg-gradient-card">
          <CardContent className="p-6 text-center">
            <ScanLine className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">QR Code Scanner</h3>
            <p className="text-muted-foreground mb-4">
              Point your camera at the book's QR code to instantly access book details
            </p>
            <Button onClick={simulateQRScan} variant="hero">
              Simulate QR Scan
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Search Form */}
      <Card className="shadow-card bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-primary" />
            <span>Manual Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                placeholder="e.g., Data Structures"
                value={searchQuery.title}
                onChange={(e) => setSearchQuery(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author Name</Label>
              <Input
                id="author"
                placeholder="e.g., Reema Thareja"
                value={searchQuery.author}
                onChange={(e) => setSearchQuery(prev => ({ ...prev, author: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edition">Edition</Label>
              <Input
                id="edition"
                placeholder="e.g., 2nd Edition"
                value={searchQuery.edition}
                onChange={(e) => setSearchQuery(prev => ({ ...prev, edition: e.target.value }))}
              />
            </div>
          </div>

          <Alert>
            <Filter className="h-4 w-4" />
            <AlertDescription>
              <strong>Search Tip:</strong> Fill at least one field to search. You can search by title, author, or edition individually, or combine them for precise results.
            </AlertDescription>
          </Alert>

          <div className="flex space-x-3">
            <Button 
              onClick={handleSearch}
              variant="hero"
              disabled={!searchQuery.title && !searchQuery.author && !searchQuery.edition}
              className="flex items-center space-x-2"
            >
              <Search className="h-4 w-4" />
              <span>Search Books</span>
            </Button>
            <Button onClick={handleClear} variant="outline">
              Clear Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {hasSearched && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Search Results ({searchResults.length} found)</CardTitle>
          </CardHeader>
          <CardContent>
            {searchResults.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onViewDetails={onViewBook}
                    showAvailability={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No books found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or check the spelling
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* AI Recommendations */}
      <Card className="shadow-card bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="bg-gradient-hero bg-clip-text text-transparent">🤖</span>
            <span>AI Recommended Books</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Based on your academic profile and popular choices
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getRecommendations().map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onViewDetails={onViewBook}
                showAvailability={true}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
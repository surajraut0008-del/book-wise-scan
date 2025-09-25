import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Book } from '@/data/mockBooks';
import { BookOpen, User, Calendar, IndianRupee, QrCode } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onViewDetails: (book: Book) => void;
  onGenerateQR?: (book: Book) => void;
  showAvailability?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  onViewDetails, 
  onGenerateQR,
  showAvailability = true 
}) => {
  const availabilityColor = book.available > 0 ? 'success' : 'destructive';
  const availabilityText = book.available > 0 ? 'Available' : 'Out of Stock';

  return (
    <Card className="shadow-card bg-gradient-card hover:shadow-book transition-all duration-300 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-foreground line-clamp-2">
            {book.title}
          </CardTitle>
          {showAvailability && (
            <Badge 
              variant={book.available > 0 ? "default" : "destructive"}
              className={book.available > 0 ? 'bg-success text-success-foreground' : ''}
            >
              {availabilityText}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-2" />
            <span>{book.author}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4 mr-2" />
            <span>{book.edition}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{book.publishedYear}</span>
          </div>
          <div className="flex items-center text-sm font-medium text-foreground">
            <IndianRupee className="h-4 w-4 mr-1" />
            <span>₹{book.price}</span>
          </div>
        </div>

        {showAvailability && (
          <div className="bg-muted rounded-lg p-3">
            <div className="text-sm font-medium text-foreground mb-1">
              Availability Status
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Available:</span>
              <span className={`font-medium ${book.available > 0 ? 'text-success' : 'text-destructive'}`}>
                {book.available} / {book.total}
              </span>
            </div>
          </div>
        )}

        {book.department && (
          <Badge variant="outline" className="w-fit">
            {book.department}
          </Badge>
        )}

        <div className="flex space-x-2">
          <Button 
            onClick={() => onViewDetails(book)} 
            className="flex-1"
            variant="default"
          >
            View Details
          </Button>
          {onGenerateQR && (
            <Button 
              onClick={() => onGenerateQR(book)} 
              variant="outline"
              size="icon"
            >
              <QrCode className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
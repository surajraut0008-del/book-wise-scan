import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/enhanced-button';
import { Badge } from '@/components/ui/badge';
import { Book } from '@/data/mockBooks';
import { 
  BookOpen, 
  User, 
  Calendar, 
  IndianRupee, 
  ArrowLeft, 
  CheckCircle,
  RotateCcw,
  XCircle,
  AlertCircle,
  QrCode
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface BookDetailsPageProps {
  book: Book;
  onBack: () => void;
  userType: 'student' | 'admin';
  isIssued?: boolean;
  issueDate?: string;
  returnDate?: string;
}

export const BookDetailsPage: React.FC<BookDetailsPageProps> = ({
  book,
  onBack,
  userType,
  isIssued = false,
  issueDate,
  returnDate
}) => {
  const [currentAction, setCurrentAction] = useState<'issue' | 'return' | 'renew' | null>(null);
  const { toast } = useToast();

  const handleIssue = () => {
    setCurrentAction('issue');
    toast({
      title: "Book Issued Successfully!",
      description: `${book.title} has been issued. Return date: ${new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString()}`,
      variant: "default",
      className: "bg-success text-success-foreground"
    });
  };

  const handleReturn = () => {
    setCurrentAction('return');
    toast({
      title: "Return Request Sent",
      description: "Confirmation sent to librarian. Please wait for approval.",
      variant: "default",
      className: "bg-warning text-warning-foreground"
    });
  };

  const handleRenew = () => {
    setCurrentAction('renew');
    toast({
      title: "Book Renewed Successfully!",
      description: `Return date extended by 15 days from today.`,
      variant: "default",
      className: "bg-success text-success-foreground"
    });
  };

  const generateQRCode = () => {
    const qrData = `${window.location.origin}/book/${book.id}`;
    toast({
      title: "QR Code Generated",
      description: `QR Code for ${book.title}: ${qrData}`,
      variant: "default"
    });
  };

  const canIssue = !isIssued && book.available > 0;
  const canReturn = isIssued;
  const canRenew = isIssued;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button onClick={onBack} variant="outline" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Book Details</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Book Cover and Basic Info */}
        <Card className="shadow-card bg-gradient-card">
          <CardContent className="p-6">
            <div className="aspect-[3/4] bg-muted rounded-lg mb-4 flex items-center justify-center">
              <BookOpen className="h-16 w-16 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="font-semibold text-lg">{book.title}</h2>
              <p className="text-muted-foreground">{book.author}</p>
              <Badge variant="outline">{book.category}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Card className="lg:col-span-2 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>Book Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Author:</span>
                  <span className="font-medium">{book.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Edition:</span>
                  <span className="font-medium">{book.edition}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Published:</span>
                  <span className="font-medium">{book.publishedYear}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Price:</span>
                  <span className="font-medium">₹{book.price}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">ISBN:</span>
                  <span className="font-medium ml-2">{book.isbn}</span>
                </div>
                {book.department && (
                  <div>
                    <span className="text-sm text-muted-foreground">Department:</span>
                    <Badge variant="outline" className="ml-2">{book.department}</Badge>
                  </div>
                )}
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-sm font-medium mb-2">Availability</div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Available:</span>
                    <span className={`font-bold text-lg ${book.available > 0 ? 'text-success' : 'text-destructive'}`}>
                      {book.available} / {book.total}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Issue Status */}
            {isIssued && issueDate && returnDate && (
              <Alert className="border-warning bg-warning/10">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Currently Issued</strong><br />
                  Issue Date: {issueDate}<br />
                  Return Date: {returnDate}
                </AlertDescription>
              </Alert>
            )}

            {/* Availability Alert */}
            {!book.available && (
              <Alert className="border-destructive bg-destructive/10">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Currently not available</strong><br />
                  This book will be available after 2 days. Please check later.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Available Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleIssue}
              disabled={!canIssue}
              variant={canIssue ? "success" : "outline"}
              className="flex items-center space-x-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Issue This Book</span>
            </Button>

            <Button
              onClick={handleReturn}
              disabled={!canReturn}
              variant={canReturn ? "warning" : "outline"}
              className="flex items-center space-x-2"
            >
              <XCircle className="h-4 w-4" />
              <span>Return This Book</span>
            </Button>

            <Button
              onClick={handleRenew}
              disabled={!canRenew}
              variant={canRenew ? "secondary" : "outline"}
              className="flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Renew This Book</span>
            </Button>

            {userType === 'admin' && (
              <Button
                onClick={generateQRCode}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <QrCode className="h-4 w-4" />
                <span>Generate QR Code</span>
              </Button>
            )}
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <p><strong>Note:</strong> Books can be issued for 15 days. Penalty: ₹2 per day for late returns.</p>
            <p>Renewal extends the return date by another 15 days from today.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export interface Book {
  id: string;
  title: string;
  author: string;
  edition: string;
  isbn: string;
  price: number;
  coverImage: string;
  department?: string;
  available: number;
  total: number;
  category: 'academic' | 'non-academic';
  description: string;
  publishedYear: number;
}

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "Data Structures and Algorithms in C",
    author: "Reema Thareja",
    edition: "2nd Edition",
    isbn: "978-0199452064",
    price: 650,
    coverImage: "/placeholder.svg",
    department: "Computer Engineering",
    available: 8,
    total: 10,
    category: 'academic',
    description: "Comprehensive guide to data structures and algorithms with practical implementations in C programming language.",
    publishedYear: 2018
  },
  {
    id: "2",
    title: "Introduction to Artificial Intelligence",
    author: "Stuart Russell",
    edition: "4th Edition",
    isbn: "978-0134610993",
    price: 1200,
    coverImage: "/placeholder.svg",
    department: "AI & Data Science",
    available: 5,
    total: 8,
    category: 'academic',
    description: "Modern approach to artificial intelligence covering machine learning, neural networks, and cognitive computing.",
    publishedYear: 2020
  },
  {
    id: "3",
    title: "Digital Signal Processing",
    author: "John G. Proakis",
    edition: "5th Edition",
    isbn: "978-0133737622",
    price: 890,
    coverImage: "/placeholder.svg",
    department: "Electronics & Telecommunication",
    available: 0,
    total: 6,
    category: 'academic',
    description: "Fundamental concepts and applications of digital signal processing for engineering students.",
    publishedYear: 2019
  },
  {
    id: "4",
    title: "Clean Code",
    author: "Robert Martin",
    edition: "1st Edition",
    isbn: "978-0132350884",
    price: 750,
    coverImage: "/placeholder.svg",
    department: "Information Technology",
    available: 12,
    total: 15,
    category: 'non-academic',
    description: "A handbook of agile software craftsmanship focusing on writing clean, maintainable code.",
    publishedYear: 2008
  },
  {
    id: "5",
    title: "Fundamentals of Electric Circuits",
    author: "Charles Alexander",
    edition: "6th Edition",
    isbn: "978-0078028229",
    price: 980,
    coverImage: "/placeholder.svg",
    department: "Electrical Engineering",
    available: 3,
    total: 7,
    category: 'academic',
    description: "Comprehensive introduction to electric circuit analysis and design principles.",
    publishedYear: 2017
  }
];

export const departments = [
  "Computer Engineering",
  "Information Technology", 
  "AI & Data Science",
  "Electronics & Telecommunication",
  "Mechanical Engineering",
  "Electrical Engineering"
];

export const searchBooks = (query: { title?: string; author?: string; edition?: string }) => {
  return mockBooks.filter(book => {
    const titleMatch = !query.title || book.title.toLowerCase().includes(query.title.toLowerCase());
    const authorMatch = !query.author || book.author.toLowerCase().includes(query.author.toLowerCase());
    const editionMatch = !query.edition || book.edition.toLowerCase().includes(query.edition.toLowerCase());
    
    return titleMatch && authorMatch && editionMatch;
  });
};
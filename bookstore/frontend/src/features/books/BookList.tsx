import type { Book } from './types';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function BookList({ books }: { books: Book[] }) {
  if (books.length === 0) return <p>No books yet. Add your first book using the form.</p>;
  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id}>
          <div><h3>{book.title}</h3><p>{book.author}</p></div>
          <strong>{currency.format(Number(book.price))}</strong>
        </li>
      ))}
    </ul>
  );
}

import { useEffect, useState } from 'react';
import { listBooks } from './features/books/api';
import { BookForm } from './features/books/BookForm';
import { BookList } from './features/books/BookList';
import type { Book } from './features/books/types';

export function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    listBooks(controller.signal)
      .then(setBooks)
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setError(error instanceof Error ? error.message : 'Could not load books.');
        }
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [attempt]);

  return (
    <main>
      <header><p className="eyebrow">The classroom bookstore</p><h1>A good story starts here.</h1>
        <p>Build your collection, one book at a time.</p></header>
      <div className="layout">
        <section className="panel" aria-labelledby="books-heading" aria-busy={loading}>
          <h2 id="books-heading">Books</h2>
          {loading ? <p role="status">Loading books…</p> : error ? (
            <><p role="alert" className="error">{error}</p>
              <button onClick={() => setAttempt((value) => value + 1)}>Try again</button></>
          ) : <BookList books={books} />}
        </section>
        {/* Wait for the initial list so a late response cannot hide a newly created book. */}
        {!loading && !error && <BookForm onCreated={(book) => setBooks((current) => [book, ...current])} />}
      </div>
    </main>
  );
}

import { useState, type FormEvent } from 'react';
import { createBook } from './api';
import type { Book } from './types';

interface Props { onCreated: (book: Book) => void }

export function BookForm({ onCreated }: Props) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const book = await createBook({
        title: String(data.get('title')).trim(),
        author: String(data.get('author')).trim(),
        price: String(data.get('price')),
      });
      onCreated(book);
      form.reset();
      setMessage(`Added “${book.title}”.`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Could not create the book.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="panel" aria-labelledby="create-heading">
      <h2 id="create-heading">Add a book</h2>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={saving}>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" required maxLength={200} />
          <label htmlFor="author">Author</label>
          <input id="author" name="author" required maxLength={150} />
          <label htmlFor="price">Price (USD)</label>
          <input id="price" name="price" type="number" required min="0.01" max="99999999.99" step="0.01" />
          <button type="submit">{saving ? 'Saving…' : 'Create book'}</button>
        </fieldset>
        {error && <p role="alert" className="error">{error}</p>}
        <p role="status">{message}</p>
      </form>
    </section>
  );
}

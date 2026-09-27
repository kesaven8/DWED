import type { Book, BookInput } from './types';

const apiUrl = (import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api').replace(/\/$/, '');

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${apiUrl}${path}`, options);
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    throw new Error('Cannot reach the API. Check that the backend is running.');
  }
  if (!response.ok) {
    if (response.status === 422) throw new Error('Check the title, author, and price (up to two decimal places).');
    throw new Error(`The request failed (${response.status}). Please try again.`);
  }
  return response.json() as Promise<T>;
}

export function listBooks(signal?: AbortSignal): Promise<Book[]> {
  return request<Book[]>('/books', { signal });
}

export function createBook(book: BookInput): Promise<Book> {
  return request<Book>('/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
}

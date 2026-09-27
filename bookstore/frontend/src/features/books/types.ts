export interface BookInput {
  title: string;
  author: string;
  // Decimal strings preserve money exactly across the API boundary.
  price: string;
}

export interface Book extends BookInput {
  id: number;
}

// Strips server-generated fields for insert payloads, e.g.:
//   type NewsInsert = Insertable<News>;
export type Insertable<T> = Omit<T, "id" | "created_at" | "updated_at">;

// Partial insert shape, for PATCH-style update payloads.
export type Updatable<T> = Partial<Insertable<T>>;

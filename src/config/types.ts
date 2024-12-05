export interface Schema {
  description: string;
  dynamic: boolean;
  label: string;
  tag: string;
  writers: string[] | null;
}

export interface Transaction {
  description: string;
  label: string;
  tag: string;
}

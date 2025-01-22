export interface FormValues {
  supplier: number; // ID of the selected supplier
  shipFrom: number; // ID of the selected terminal
  paymentTerm: number; // ID of the selected payment term
  product: number; // ID of the selected product
  comments?: string; // Optional comments field
}

export interface InputFieldOption {
  id: number;
  name: string; // Required for input fields.
}

export interface SelectFieldOption {
  label: string;
  value: string; // Required for select fields.
}

export type FieldOption = InputFieldOption | SelectFieldOption;

export interface FieldValues {
  id: string; // Assuming `id` is a string based on the schema.
  label: string;
  type: string; // Could be 'select', 'searchable', etc.
  options: FieldOption[]; // Array of `FieldOption` objects.
  required: boolean;
  inputField?: string;
}

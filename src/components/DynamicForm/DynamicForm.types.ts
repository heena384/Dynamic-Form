export interface FormValues {
  supplier: string;
  shipFrom: string;
  shipVia: string;
  paymentTerm: string;
  taxState: string;
  ref?: string;
  invoiceNumber: number;
  invoiceDate: Date;
  dueDate: Date;
  discDueDate?: Date;
  postingDate: Date;
  paymentMethod: string;
  paymentOnHold?: boolean;
  contractNumber?: number;
  deferredInvoiceNumber?: number;
  deferredTaxDueDate?: Date;
  listOfProducts: string;
  listOfChartOfAccount?: string;
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
  options?: FieldOption[] | undefined; // Array of `FieldOption` objects.
  required?: boolean;
  inputField?: string;
}

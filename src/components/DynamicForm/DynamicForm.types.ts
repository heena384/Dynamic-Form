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
  listOfChartOfAccount?: string;
}

export interface ProductFormValues {
  listOfProducts: string;
  billOfLanding: string;
  pickupDate: Date;
  grossQuantity: number;
  netquantity: number;
  rate: number;
  taxes: number;
  defTaxes: number;
  lineTotal: number;
}

export interface InputFieldOption {
  id: number;
  name: string;
}

export interface SelectFieldOption {
  label: string;
  value: string;
}

export type FieldOption = InputFieldOption | SelectFieldOption;

export interface FieldValues {
  id: string;
  label: string;
  type: string;
  options?: FieldOption[] | undefined;
  required?: boolean;
  inputField?: string;
}

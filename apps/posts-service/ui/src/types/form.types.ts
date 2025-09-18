export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel';
  required?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    message?: string;
  };
}

export interface FormErrors {
  [key: string]: {
    type: string;
    message: string;
  };
}

export interface Customer {
  id: string;
  name: string | null;
  email: string | null;
  image_url: string | null;
}

export type CreateCustomerInput = Omit<Customer, "id">;

export type UpdateCustomerInput = Partial<CreateCustomerInput>;
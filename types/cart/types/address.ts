export interface Address {
  fullAddress: string;
  city: string;
  phone: string;
}

export interface AddressState {
  hasAddress: boolean;
  address: Address | null;
  setAddress: (address: Address) => void;
  clearAddress: () => void;
}

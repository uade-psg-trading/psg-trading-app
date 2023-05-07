export type Credentials = {
  username: string;
  jwt: string;
  refreshToken: string;
  tenant: string;
};

export type Tenant = {
  tenantId: string;
  domain: string;
};

export type User = {
  firstName: string;
  lastName: string;
  dni: number;
  email: string;
  tenant: Tenant;
  location: {
    country: string;
    address: string;
    city: string;
    province: string;
    zipCode: string;
  };
};

export type Payment = {
  amount: number;
  paymentMethod: string;
};

export type Balance = {
  symbol: {
    symbol: string;
    name: string;
    token: boolean;
  };
  price: number;
  percent_change_24h: number;
  amount: number;
  yield: number;
  total: number;
};

export type FiatBalance = {
  balance_id: number;
  symbol: {
    symbol: string;
    name: string;
    token: boolean;
  };
  amount: number;
  updateTime: string;
};

export type Token = {
  symbol: string;
  name: string;
  token: boolean;
  tokenPrice: {
    price: number;
  }
};

export type AlertOperator = 'GREATER' | 'LOWER';
export type Alert = {
  alertId: number;
  symbol: Token;
  amount: number;
  operator: AlertOperator;
};

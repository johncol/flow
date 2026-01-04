export type EncryptedString = string;

export type User = {
  id: string;
  name: string;
  email: string;
  password: EncryptedString;
  createdAt: Date;
};

export type NewUserInput = {
  name: string;
  email: string;
  password: EncryptedString;
};

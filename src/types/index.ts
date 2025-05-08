export interface PolicyAcceptance {
  id: string;
  fullName: string;
  identificationNumber: string;
  signature: string; // Data URL of the signature image
  timestamp: string; // ISO string date
}

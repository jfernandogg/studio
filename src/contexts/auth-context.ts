
import type { User as FirebaseUser } from 'firebase/auth';
import { createContext } from 'react'; // Import createContext

export interface AuthContextType {
  user: FirebaseUser | null;
  isLoading: boolean;
  isAuthorized: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

// We will create the actual context in the provider file to avoid circular dependencies with default values.
// Or provide a default context value here. For now, type definition is key.
export const AuthContext = createContext<AuthContextType | undefined>(undefined);


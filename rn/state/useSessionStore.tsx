import { create } from 'zustand';

interface Session {
  accessToken: string;
}

const useSessionStore = create<{
  session: Session | null;
  setSession: (session: Session) => void;
  clear: () => void;
}>((set, get) => ({
  // session: {
  //   accessToken:
  //     'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhY2Nlc3MgdG9rZW4iLCJ1c2VySW5mbyI6IntcImlkXCI6MSxcImVtYWlsXCI6XCJzb2wxQHNvbC5jb21cIixcIm5hbWVcIjpcImFkbWluXCIsXCJhdXRob3JpdGllc1wiOlt7XCJhdXRob3JpdHlcIjpcIlVTRVJcIn1dfSIsImlhdCI6MTczODU4MDcwOCwiZXhwIjoxNzM4NTg0MzA4fQ.7rJG9r7GnyLEK4ApQPRXOGD3tGuQ7kLeGJMd25',
  // } as Session,
  session: null,
  setSession: (session: Session) => {
    set({ session });
  },
  clear: () => {
    set({ session: null });
  },
}));

export default useSessionStore;

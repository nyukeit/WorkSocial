import { create } from "zustand";

const useUserStore = create((set) => ({
  currentUser: null,
  setCurrentUser: (user) => {
    console.info("setting user", user);
    set({ currentUser: user });
  },
  clearCurrentUser: () => set({ currentUser: null }),
}));

export default useUserStore;

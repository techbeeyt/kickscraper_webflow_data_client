import { create } from "zustand";

const useApplication = create((set) => ({
  access_token: "",
  gotAccessToken: false,
  stepPosition: 0,
  selected_site_id: "",
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setStep: (stepPosition: number) => set({ stepPosition }),
  setAccessToken: (token: string) => set({ access_token: token }),
  setGotAccessToken: (token: boolean) => set({ gotAccessToken: token }),
  setSelectedSiteId: (id: string) => set({ selected_site_id: id }),
}));

export default useApplication;

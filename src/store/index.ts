import { GenderType, StatusType } from "components/CharacterCard/CharacterCard";
import create, { StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface FiltersSlice {
  gender: string | undefined;
  status: string | undefined;
  name: string | undefined;
  addGenderFilter: ({ gender }: { gender: GenderType }) => void;
  addStatusFilter: ({ status }: { status: StatusType }) => void;
  addNameFilter: ({ name }: { name: string }) => void;
  clearAllFilters: () => void;
}
const createFiltersSlice: StateCreator<
  FiltersSlice,
  [["zustand/devtools", never]],
  [],
  FiltersSlice
> = (set) => ({
  gender: "",
  status: "",
  name: "",
  addGenderFilter: ({ gender }) => set((state) => ({ gender: gender })),
  addStatusFilter: ({ status }) => set((state) => ({ status: status })),
  addNameFilter: ({ name }) => set((state) => ({ name: name })),
  clearAllFilters: () => set(() => ({ name: "", gender: "", status: "" })),
});

export const useBoundStore = create<ReturnType<typeof createFiltersSlice>>()(
  devtools((...a) => ({
    ...createFiltersSlice(...a),
  }))
);

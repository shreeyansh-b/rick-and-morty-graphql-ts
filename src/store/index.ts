import { GenderType, StatusType } from "components/CharacterCard/CharacterCard";
import create, { StateCreator } from "zustand";

interface ModalSlice {
  isOpen: boolean;
  showModal: () => void;
  hideModal: () => void;
}
const createModalSlice: StateCreator<ModalSlice, [], [], ModalSlice> = (
  set
) => ({
  isOpen: false,
  showModal: () =>
    set(() => ({
      isOpen: true,
    })),
  hideModal: () => set(() => ({ isOpen: false })),
});

interface FiltersSlice {
  gender: string | undefined;
  status: string | undefined;
  name: string | undefined;
  addGenderFilter: ({ gender }: { gender: GenderType }) => void;
  addStatusFilter: ({ status }: { status: StatusType }) => void;
  addNameFilter: ({ name }: { name: string }) => void;
}
const createFiltersSlice: StateCreator<FiltersSlice, [], [], FiltersSlice> = (
  set
) => ({
  gender: "",
  status: "",
  name: "",
  addGenderFilter: ({ gender }) => set((state) => ({ gender: gender })),
  addStatusFilter: ({ status }) => set((state) => ({ status: status })),
  addNameFilter: ({ name }) => set((state) => ({ name: name })),
});

export const useBoundStore = create<
  ReturnType<typeof createModalSlice> & ReturnType<typeof createFiltersSlice>
>()((...a) => ({
  ...createModalSlice(...a),
  ...createFiltersSlice(...a),
}));

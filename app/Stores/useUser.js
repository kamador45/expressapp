import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUser = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isHydrated: false, // Inicializamos en false para manejar la hidratación correctamente
            setUser: (user) => {
                set({ user, isAuthenticated: true });
            },
            setToken: (token) => {
                set({ token });
            },
            logout: () => {
                set({ user: null, isAuthenticated: false, token: null });
            },
            setHydrated: (hydrated) => {
                set({ isHydrated: hydrated });
            },
        }),
        {
            name: 'user',
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(false); // Establecemos isHydrated a false antes de comenzar
            },
            onRehydrateStorageFinished: () => (state) => {
                state?.setHydrated(true); // Cambiamos isHydrated a true una vez que finaliza la hidratación
            },
        }
    )
);

export default useUser;

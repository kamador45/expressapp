import useUser from "../Stores/useUser";


const useUpdateStoreUser = () => {
    const {
        setUser
    } = useUser();

    const updateUserInStore = (newUser) => {
        if(newUser) {
            setUser(newUser);
        }
    };

    return updateUserInStore;
}

export default useUpdateStoreUser;

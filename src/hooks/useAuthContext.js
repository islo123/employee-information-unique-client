import AuthContext from "../context/AuthProvider";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside AtuhContectProvider')
    }
    return context
}
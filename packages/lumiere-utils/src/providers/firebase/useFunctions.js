import "firebase/functions";
import { useAuthState } from  "../../useAuth"

export const useFunctions = () => {
    const { provider } = useAuthState()
    return provider.functions
}
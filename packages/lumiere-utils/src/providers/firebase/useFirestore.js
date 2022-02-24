import "firebase/database";
import { useAuthState } from  "../../useAuth"

export const useFirestore = () => {
    const { provider } = useAuthState()
    return provider.firestore
}
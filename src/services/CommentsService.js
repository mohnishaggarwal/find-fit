import { db } from "./../firebase";
import { collection, getDocs, addDoc } from 'firebase/firestore';

const CommentsService = {
    fetchComments: async (regime) => {
        const regimesRef = collection(db, `regimes/${regime}/comments`);
        const snapshot = await getDocs(regimesRef);
        const data = snapshot.docs.map((doc) => (
            { ...doc.data()})
        );
        return data;
    },
    addComment: async(regime, comment) => {
        const regimesRef = collection(db, `regimes/${regime}/comments`);
        await addDoc(regimesRef, { "comment": comment });
    }
}

export default CommentsService;
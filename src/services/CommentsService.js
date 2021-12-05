import { db } from "./../firebase";
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';

function mapComment(doc) {
    const comment = {
        comment: doc.data().comment,
        time: doc.data().time.toDate()
    }
    return comment;
}

const CommentsService = {
    fetchComments: async (regime, setComments) => {
        const regimesRef = collection(db, `regimes/${regime}/comments`);
        const snapshot = await getDocs(regimesRef);
        const data = snapshot.docs.map(mapComment).sort((t1, t2) => t1.time - t2.time);
        setComments(data);
    },
    addComment: async(regime, comment) => {
        const timestamp = Timestamp.fromDate(new Date());
        const regimesRef = collection(db, `regimes/${regime}/comments`);
        await addDoc(regimesRef, { "comment": comment, "time": timestamp });
    }
}

export default CommentsService;
import firebaseDB from "@configs/firebase.config";
import { addDoc, collection, getDocs } from "firebase/firestore";

type Post = {
  title: string;
  content: string;
};

type PostData = {
  id: string;
  data: Post;
};

export const postsService = async () => {
  try {
    const postsQuerySnapshot = await getDocs(collection(firebaseDB, "posts"));

    const posts: PostData[] = [];

    postsQuerySnapshot.forEach((doc) => {
      const { title, content } = doc.data();

      posts.push({
        id: doc.id,
        data: { title, content },
      });
    });
    return posts;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const createPostService = async ({ title, content }: Post) => {
  try {
    const docRef = await addDoc(collection(firebaseDB, "posts"), {
      title,
      content,
    });

    return docRef.id;
  } catch (error) {
    console.error(error);
    return error;
  }
};

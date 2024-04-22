import firebaseDB from "@configs/firebase.config";
import { collection, getDocs } from "firebase/firestore";

type Post = {
  id: string;
  data: {
    title: string;
    content: string;
  };
};

export const postsService = async () => {
  try {
    const postsQuerySnapshot = await getDocs(collection(firebaseDB, "posts"));

    const posts: Post[] = [];

    postsQuerySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        data: doc.data() as {
          title: string;
          content: string;
        },
      });
    });
    return posts;
  } catch (error) {
    console.error(error);
    return error;
  }
};

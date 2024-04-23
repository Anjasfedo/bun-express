import firebaseDB from "@configs/firebase.config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

type Post = {
  title: string;
  content: string;
};

type PostData = {
  id: string;
  data: Post;
};

const postRef = collection(firebaseDB, "posts");

export const getPostsService = async () => {
  try {
    const postsQuerySnapshot = await getDocs(postRef);

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
    throw error;
  }
};

export const getPostByIdService = async (id: string) => {
  try {
    const docRef = doc(firebaseDB, "posts", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      // console.error("No such document!");
      // return null;
      throw new Error("No such document");
    }

    const { title, content } = docSnap.data() as Post;

    // Create a PostData object
    const postData: PostData = {
      id: docSnap.id,
      data: { title, content },
    };

    return postData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createPostService = async ({ title, content }: Post) => {
  try {
    const docRef = await addDoc(postRef, {
      title,
      content,
    });

    return { id: docRef.id, data: { title, content } };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePostByIdService = async (
  { title, content }: Post,
  id: string
) => {
  try {
    const docRef = doc(firebaseDB, "posts", id);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("No such document");
    }

    await updateDoc(docRef, {
      title,
      content,
    });

    return { id, data: { title, content } };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePostByIdService = async (id: string) => {
  try {
    const docRef = doc(firebaseDB, "posts", id);
    
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("No such document");
    }
    
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

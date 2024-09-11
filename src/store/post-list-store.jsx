/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currentPostList, action) => {
  let newPostList = currentPostList;

  if (action.type === "DELETE_POST") {
    newPostList = currentPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currentPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    defaultPostList
  );

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    console.log(userId, postTitle, postBody, reactions, tags);
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: tags,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

const defaultPostList = [
  {
    id: "1",
    title: "Going To Mumbai",
    body: "Hi Friends, I am going to Mumbai for my vacations, Hope to enjoy a lot.",
    reactions: 2,
    userId: "user-9",
    tags: ["vacation", "mumbai", "Enjoying"],
  },
  {
    id: "2",
    title: "Pass Ho gaye",
    body: "Passed the exams, hard to believe.",
    reactions: 15,
    userId: "user-12",
    tags: ["graduating", "unbelievable"],
  },
];

export default PostListProvider;

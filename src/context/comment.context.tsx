import { createContext, ReactNode, useCallback } from 'react';

// Import localStorage
import useLocalStorage from '../utils/hooks/useLocalStorage';

type Comment = {
  id: number;
  productId: number;
  text: string;
};

type ContextValue = {
  comments: Comment[];
  addComment: (productId: number, comment: string) => void;
  deleteComment: (commentId: number) => void;
  updateComment: (commentId: number, newCommentText: string) => void;
};

type Props = {
  children: ReactNode;
};

// Context
export const CommentsContext = createContext<ContextValue>({
  comments: [],
  addComment: () => {},
  deleteComment: () => {},
  updateComment: () => {},
});

// Provider
export const CommentsProvider = ({ children }: Props): JSX.Element => {
  // Using a custom hook for useLocalStorage
  const [comments, setComments] = useLocalStorage<Comment[]>('comments', []);

  // // Get comments from localstorage
  // useEffect(() => {
  //   const commentsFromStorage: Comment[] =
  //     JSON.parse(localStorage.getItem('comments')!) || [];
  //   setComments(commentsFromStorage);
  // }, []);

  // // Set comments to localstorage
  // useEffect(() => {
  //   localStorage.setItem('comments', JSON.stringify(comments));
  // }, [comments]);

  // Add comment
  const addComment = (productId: number, comment: string): void => {
    setComments((prevComments: Comment[]) => {
      const newComment = { id: Date.now(), productId, text: comment };
      const updatedComments = prevComments.map((c) =>
        c.productId === productId ? newComment : c
      );
      return updatedComments.length === prevComments.length
        ? [...prevComments, newComment]
        : updatedComments;
    });
  };

  // Delte comment
  const deleteComment = (commentId: number): void => {
    setComments((prevComments: Comment[]) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  // Update comment
  const updateComment = useCallback(
    (commentId: number, newCommentText: string): void => {
      setComments((prevComments: Comment[]) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, id: Date.now(), text: newCommentText };
          } else {
            return comment;
          }
        })
      );
    },
    [setComments]
  );

  const value: ContextValue = {
    comments,
    addComment,
    deleteComment,
    updateComment,
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};

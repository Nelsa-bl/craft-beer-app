import { useState, useContext, ChangeEvent, FormEvent } from 'react';
import { CommentsContext } from '../../context/comment.context';

// Import component
import Comment from '../comment/comment.component';
import Button from '../button/button.component';
import ConfirmationBox from '../confirmation-box/confirmation-box.component';

// Import types
import { ProductsTypes } from '../../@types/products';
import { CommentsTypes } from '../../@types/comments';

// Import styles
import './comments.style.scss';

type CommentsProps = {
  product: ProductsTypes;
};

const Comments = ({ product }: CommentsProps): JSX.Element => {
  // Comment context
  const { comments, addComment, deleteComment, updateComment } =
    useContext(CommentsContext);

  // State
  const [newComment, setNewComment] = useState<string>('');
  const [editingComment, setEditingComment] = useState<boolean>(false);
  const [editCommentId, setEditCommentId] = useState<string>('');
  const [confirmationMessage, setConfirmationMessage] = useState<{
    message: string;
    type: 'added' | 'edited' | 'deleted';
  } | null>(null);

  // Convert comment id to date
  const getDate = (timestamp: number): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };

    const formattedDate = new Intl.DateTimeFormat('da-DK', options).format(
      timestamp
    );

    return formattedDate;
  };

  // Handle comment change
  const handleCommentChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setNewComment(event.target.value);
  };

  // Handle comment submit
  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (editingComment) {
      updateComment(+editCommentId, newComment);
      setEditingComment(false);
      setEditCommentId('');
      setConfirmationMessage({ message: 'Comment edited', type: 'edited' });
    } else if (newComment) {
      addComment(product.id, newComment);
      setConfirmationMessage({ message: 'Comment added', type: 'added' });
    } else return;
    setNewComment('');
  };

  // Handle comment edit
  const handleEditComment = (commentId: number, commentText: string): void => {
    setEditingComment(true);
    setEditCommentId(commentId.toString());
    setNewComment(commentText);
  };

  // Handle comment cancel edit
  const handleCancelEdit = (): void => {
    setEditingComment(false);
    setEditCommentId('');
    setNewComment('');
  };

  // Handle comment delete
  const handleCommentDelete = (commentId: number): void => {
    deleteComment(+commentId);
    setNewComment('');
    setEditingComment(false);
    setConfirmationMessage({ message: 'Comment deleted', type: 'deleted' });
  };

  // Get comment based on product
  const productComments = comments.filter(
    (comment: CommentsTypes) => comment.productId === product.id
  );

  return (
    <>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          rows={4}
          cols={40}
          value={newComment}
          onChange={handleCommentChange}
          placeholder='Write a comment...'
          className='comment-field'
        />
        <Button type='submit'>{editingComment ? 'Save' : 'Add Comment'}</Button>
        {editingComment && (
          <Button
            type='button'
            style={{ marginLeft: '5px' }}
            onClick={handleCancelEdit}
          >
            Cancel
          </Button>
        )}
      </form>
      {confirmationMessage && (
        <ConfirmationBox
          message={confirmationMessage.message}
          type={confirmationMessage.type}
          setConfirmationMessage={setConfirmationMessage}
        />
      )}
      {productComments.length > 0 ? (
        <div className='comments-container'>
          {productComments
            .sort((a: CommentsTypes, b: CommentsTypes) => b.id - a.id)
            .map((comment: CommentsTypes) => (
              <Comment
                key={comment.id}
                comment={comment}
                getDate={getDate}
                handleEditComment={handleEditComment}
                handleCommentDelete={handleCommentDelete}
              />
            ))}
        </div>
      ) : (
        <div className='no-comments'>No comments yet</div>
      )}
    </>
  );
};

export default Comments;

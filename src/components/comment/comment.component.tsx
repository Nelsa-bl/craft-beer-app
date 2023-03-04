// Import styles
import './comment.style.scss';

// Import components
import Button from '../button/button.component';

// Import types
import { CommentsTypes } from '../../@types/comments';

type CommentProps = {
  comment: CommentsTypes;
  getDate: (id: number) => string;
  handleEditComment: (id: number, text: string) => void;
  handleCommentDelete: (id: number) => void;
};

const Comment = ({
  comment,
  getDate,
  handleEditComment,
  handleCommentDelete,
}: CommentProps) => {
  return (
    <div className='comment-item'>
      <span className='date'>{getDate(comment.id)}</span>
      <div className='comment-text'>{comment.text}</div>
      <div className='comment-btns'>
        <Button onClick={() => handleEditComment(comment.id, comment.text)}>
          Edit
        </Button>
        <Button
          style={{ marginLeft: '5px' }}
          onClick={() => handleCommentDelete(comment.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Comment;

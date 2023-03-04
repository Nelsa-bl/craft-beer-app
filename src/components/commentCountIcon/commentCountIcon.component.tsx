import { useContext, useMemo } from 'react';

// Import context
import { CommentsContext } from '../../context/comment.context';

// Import types
import { CommentsTypes } from '../../@types/comments';
import { ProductsTypes } from '../../@types/products';

// Import styles
import './commentCountIcon.style.scss';

type CommentCountIconProps = {
  product: ProductsTypes;
};

const CommentCountIcon = ({ product }: CommentCountIconProps) => {
  const { comments } = useContext(CommentsContext);

  const getCommentCount = useMemo(() => {
    const matchingItems = comments.filter(
      (item: CommentsTypes) => item.productId === product.id
    );
    const count = matchingItems.length;
    return count;
  }, [comments, product.id]);

  return (
    <>
      {getCommentCount > 0 && (
        <div className='comment-count'>
          <span>{getCommentCount}</span>
        </div>
      )}
    </>
  );
};

export default CommentCountIcon;

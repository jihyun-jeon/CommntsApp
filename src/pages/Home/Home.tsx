import { useEffect, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CommentsSliceState, loadCommentDone, setCurrentPage } from '../../store/commentsSlice';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { RootState } from '../../store';

const Home = () => {
  const dispatch = useDispatch();

  const commentsData = useSelector<RootState, CommentsSliceState>(state => state.comments);

  const { comments, currentPage, totalLegnth } = commentsData;

  const COUNT_PER_PAGE = 4;

  const CurrnetDataArr = comments.slice(
    (currentPage - 1) * COUNT_PER_PAGE,
    currentPage * COUNT_PER_PAGE
  );

  const pagenationArr = Array(Math.ceil(totalLegnth / COUNT_PER_PAGE))
    .fill('_')
    .map((_, idx) => idx + 1);

  useEffect(() => {
    dispatch(loadCommentDone());
  }, []);

  const pageChange = (e: MouseEvent<HTMLButtonElement>) => {
    const clickedNum = (e.target as HTMLButtonElement).value;
    dispatch(setCurrentPage(clickedNum));
  };

  return (
    <ListWrapper>
      {CurrnetDataArr.length > 0 && (
        <div>
          {CurrnetDataArr.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      {pagenationArr.length > 0 && (
        <PageBox>
          {pagenationArr.map(num => (
            <PageButton key={num} value={num} onClick={pageChange}>
              {num}
            </PageButton>
          ))}
        </PageBox>
      )}

      <CommentForm />
    </ListWrapper>
  );
};
export default Home;

const ListWrapper = styled.div`
  width: 80%;
  margin: 0 10%;
`;

const PageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: gray;
`;

const PageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  margin: 0 5px;
  border: 1px solid black;
  border-radius: 10%;
  cursor: pointer;
`;

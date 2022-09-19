import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Comment, deleteComment, setCommentItem } from '../../store/commentsSlice';

const CommentItem = ({ comment }: { comment: Comment }) => {
  const { id, author, content, createdAt, profile_url } = comment;
  const dispatch = useDispatch();

  const deleteRequest = () => {
    dispatch(deleteComment(id));
  };

  const putRequest = () => {
    dispatch(setCommentItem(id));
  };

  return (
    <CommentWrapper>
      <CommentHeader>
        <User>
          <span>{id}</span>
          <UserImg src={profile_url} alt="userImg" />
          <span>{author}</span>
        </User>
        <CreatDate>{createdAt}</CreatDate>
      </CommentHeader>
      <Content>{content}</Content>
      <Buttons>
        <button type="button" onClick={putRequest}>
          수정
        </button>
        <button type="button" onClick={deleteRequest}>
          삭제
        </button>
      </Buttons>
    </CommentWrapper>
  );
};

export default CommentItem;

const CommentWrapper = styled.div`
  width: 100%;
  padding: 5px 10px;
  border: 1px solid black;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const UserImg = styled.img`
  margin-right: 1rem;
  border-radius: 50%;
`;

const CreatDate = styled.p`
  margin: 0.6rem;
`;

const Content = styled.div`
  padding: 1rem 0;
`;

const Buttons = styled.div`
  padding-bottom: 1rem;
  display: flex;
  justify-content: right;

  button {
    background-color: whitesmoke;
    border: 0.2px solid gray;
    border-radius: 15%;
    padding: 5px 10px;
    margin-left: 1rem;
  }
`;

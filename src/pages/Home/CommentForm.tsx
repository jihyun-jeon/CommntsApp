import React, { useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import {
  CommentsSliceState,
  postComment,
  putComment,
  setCommentItem,
  Comment,
} from '../../store/commentsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

const CommentForm = () => {
  const dispatch = useDispatch();
  const [commentValue, setCommentValue] = useState({
    profile_url: '',
    author: '',
    content: '',
    createdAt: '',
  });

  const { commentItem } = useSelector<RootState, CommentsSliceState>(state => state.comments);

  useEffect(() => {
    if (commentItem && commentItem.id) {
      setCommentValue(commentItem);
    }
  }, [commentItem]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setCommentValue(prev => {
      return { ...prev, [name]: value };
    });
  };

  const onClickBtn = (buttonType: 'add' | 'cancel') => {
    if (!commentItem) {
      return;
    }

    if (commentItem.id && buttonType === 'add') {
      dispatch(putComment({ id: commentItem.id, commentValue }));
    }

    if (!commentItem.id && buttonType === 'add') {
      dispatch(postComment(commentValue));
    }

    setCommentValue({ profile_url: '', author: '', content: '', createdAt: '' });
    dispatch(setCommentItem(0));
  };

  return (
    <FormEl>
      {formSet.map((setData, idx) => {
        if (setData.type === 'textarea') {
          return (
            <TextareaEl
              key={idx}
              placeholder="내용"
              name="content"
              value={commentValue.content}
              onChange={e => onChange(e)}
            />
          );
        }
        return (
          <InputEl
            key={idx}
            type={setData.type}
            placeholder={setData.placeholder}
            name={setData.name}
            value={commentValue[setData.name]}
            onChange={e => onChange(e)}
          />
        );
      })}
      <button type="button" onClick={() => onClickBtn('add')}>
        등록
      </button>
      <button type="button" onClick={() => onClickBtn('cancel')}>
        취소
      </button>
    </FormEl>
  );
};

export default CommentForm;

const formSet: { type: string; placeholder: string; name: keyof Omit<Comment, 'id'> }[] = [
  { type: 'text', placeholder: 'https://picsum.photos/id/1/50/50', name: 'profile_url' },
  { type: 'text', placeholder: '작성자', name: 'author' },
  { type: 'textarea', placeholder: '내용', name: 'content' },
  { type: 'date', placeholder: 'date', name: 'createdAt' },
];

const FormEl = styled.form`
  margin: 1rem 0;
  padding: 10px;
`;

const InputEl = styled.input`
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 5px;
  margin-bottom: 10px;
`;

const TextareaEl = styled.textarea`
  width: 100%;
  resize: vertical;
  margin-bottom: 10px;
`;

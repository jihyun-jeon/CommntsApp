import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getCommentsRequest = async () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { data } = await axios.get(BASE_URL!);
  return data;
};

export const loadCommentDone = createAsyncThunk('GET_COMMENT', async (_, thunkApi) => {
  try {
    return getCommentsRequest();
  } catch {
    return thunkApi.rejectWithValue('err');
  }
});

export const deleteComment = createAsyncThunk(
  'DELETE_COMMENT',
  async (id: string | number, thunkApi) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return getCommentsRequest();
    } catch {
      return thunkApi.rejectWithValue('err');
    }
  }
);

export const postComment = createAsyncThunk(
  'POST_COMMENT',
  async (commentValue: Omit<Comment, 'id'>, thunkApi) => {
    try {
      axios({
        method: 'post',
        url: BASE_URL,
        headers: {
          'Content-Type': 'application/json',
        },
        data: commentValue,
      });

      return getCommentsRequest();
    } catch {
      return thunkApi.rejectWithValue('err');
    }
  }
);

export const putComment = createAsyncThunk(
  'PUT_COMMENT',
  async (commentValue: { id: string | number; commentValue: Omit<Comment, 'id'> }, thunkApi) => {
    try {
      await axios({
        method: 'put',
        url: `${BASE_URL}/${commentValue.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: commentValue.commentValue,
      });

      return getCommentsRequest();
    } catch {
      return thunkApi.rejectWithValue('err');
    }
  }
);

export interface Comment {
  id: number;
  profile_url: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface CommentsSliceState {
  comments: Comment[];
  currentPage: number;
  totalLegnth: number;
  commentItem: null | Comment;
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    currentPage: 1,
    totalLegnth: 0,
    commentItem: null,
  } as CommentsSliceState,
  reducers: {
    setCurrentPage: (state, action) => {
      return { ...state, currentPage: action.payload };
    },

    setCommentItem: (state, action) => {
      const commentItem = [...state.comments].find(data => data.id === action.payload);

      if (!commentItem) {
        return state;
      }

      return { ...state, commentItem: commentItem };
    },
  },
  extraReducers: builder => {
    builder.addCase(loadCommentDone.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
        totalLegnth: action.payload.length,
      };
    });

    builder.addCase(postComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
        currentPage: 1,
        totalLegnth: action.payload.length,
      };
    });

    builder.addCase(putComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
      };
    });

    builder.addCase(deleteComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
        currentPage: 1,
        totalLegnth: action.payload.length,
      };
    });

    builder.addCase(postComment.rejected, state => {
      alert('등록 실패!');
      return state;
    });

    builder.addCase(putComment.rejected, state => {
      alert('수정 실패!');
      return state;
    });

    builder.addCase(deleteComment.rejected, state => {
      alert('삭제 실패!');
      return state;
    });
  },
});

export default commentsSlice.reducer;
export const { setCurrentPage, setCommentItem } = commentsSlice.actions;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

type todoType = {
  _id: string,
  name: string,
  userId: number
}

type Todos = {
  todos: todoType[]
}

const initialState:Todos = {
  todos: []
}

export const fetchTodo = createAsyncThunk('todo/fetchTodo', async (data, thunkAPI) => {
  try {
    console.log(thunkAPI.getState());
    const res = await fetch('http://localhost:3000/todo', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${thunkAPI.getState().application.token}`
      }
    })
    if (!res.ok) {
      return thunkAPI
    }
    const todos = await res.json()
    return todos
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateTodo = createAsyncThunk('todos/updateTodo' , async (data, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:3000/todo/${data}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().application.token}`
      },
      body: JSON.stringify({data})
    })

    if (!res.ok) {
      return thunkAPI
    }
    const todos = await res.json()
    return todos
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const addTodo = createAsyncThunk('todos/addTodo' , async (name, thunkAPI) => {
  try {
    
    const res = await fetch('http://localhost:3000/todo', {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${thunkAPI.getState().application.token}`
      },
      body: JSON.stringify({name})
    })

    if (!res.ok) {
      return thunkAPI.rejectWithValue('error')
    }
    return await res.json()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (data, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:3000/todo/${data}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().application.token}`
      },
    })

    const todo = await res.json()
    
    if (res.ok) {
      return todo
    } else {
      return thunkAPI.fulfillWithValue(todo)
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const todoSlice = createSlice({
  name: 'Todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.todos = action.payload
      })
      .addCase(deleteTodo.fulfilled, (state, action:PayloadAction<string>) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload._id) 
        console.log(action.payload);
        
      })
      .addCase(addTodo.fulfilled, (state, action:PayloadAction<todoType>) => {
        state.todos.push(action.payload)
        console.log(action.payload);
      })
  }
})

export default todoSlice.reducer

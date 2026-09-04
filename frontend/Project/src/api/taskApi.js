import api, { TODO_PREFIX } from './axios';

// Create. Note: Start_Date is never sent — the backend schema always
// sets it to Date.now on creation.
export async function addTodo(userId, { Topic, Description, End_Date, Priority, Done }) {
  const { data } = await api.post(`${TODO_PREFIX}/add/${userId}`, {
    Topic,
    Description,
    End_Date,
    Priority,
    ...(Done !== undefined ? { Done } : {}),
  });
  return data.newTodo;
}

// Update. Body is a raw $set — pass only the fields you want changed.
export async function updateTodo(id, updates) {
  const { data } = await api.put(`${TODO_PREFIX}/update/${id}`, updates);
  return data.updatedTodo;
}

export async function deleteTodo(id) {
  const { data } = await api.delete(`${TODO_PREFIX}/delete/${id}`);
  return data.deletedTodo;
}

// Returns a plain array (not wrapped).
export async function getAllTodos(userId) {
  const { data } = await api.get(`${TODO_PREFIX}/all/${userId}`);
  return data;
}

export async function getTodosByPriority(userId, level) {
  const path = { High: 'high', Medium: 'medium', Low: 'low' }[level];
  const { data } = await api.get(`${TODO_PREFIX}/${path}/${userId}`);
  return data;
}

import arc from '@architect/functions'

export async function handler (todo) {
  let data = await arc.tables()
  return data.todos.put(todo)
}


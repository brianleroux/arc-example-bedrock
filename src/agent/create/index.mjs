import arc from '@architect/functions'

export async function handler (event) {
  let data = await arc.tables()
  let todo = { 
    text: event.text, 
    id: new Date(Date.now()).toISOString()
  }
  if (event.due) todo.due = event.due
  todo.done = event.due || false
  return data.todos.put(todo)
}

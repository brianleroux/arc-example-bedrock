import arc from '@architect/functions'

export async function handler ({id}) {
  let data = await arc.tables()
  return data.todos.delete({id})
}

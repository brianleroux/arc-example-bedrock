import arc from '@architect/functions'

export async function handler () {
  let data = await arc.tables()
  let res = await data.todos.scan()
  return res.Items
}


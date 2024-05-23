import sandbox from '@architect/sandbox'
import arc from '@architect/functions'
import assert from 'node:assert'
import test from 'node:test'
import { handler as create } from '../src/agent/create/index.mjs'
import { handler as list } from '../src/agent/list/index.mjs'
import { handler as update } from '../src/agent/update/index.mjs'
import { handler as destroy } from '../src/agent/destroy/index.mjs'

test('start', async t => {
  await sandbox.start({ quiet: true })
})

test('create', async t => {
  await create({ text: 'finish him!' })
})

test('list', async t => {
  let items = await list()
})

test('update', async t => {
  let items = await list()
  items[0].text += '...updated'
  let res = await update(items[0])
})

test('destroy', async t => {
  let items = await list()
  await destroy(items[0])
  let items2 = await list()
  assert.ok(items2.length === 0, 'none!')
})

test('end', async t => {
  await sandbox.end()
})

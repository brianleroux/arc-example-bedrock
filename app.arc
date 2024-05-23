@app
bedrock

@plugins
agent
  src src/plugins/bedrock.mjs

@agent
model anthropic.claude-v2:1
instruction "a bot for task management that helps you remember todo stuff"

@actions
create
  text string
  due number?
  done boolean?
list
update
  id string
  text string?
  due number?
  done boolean?
destroy
  id string

@tables
todos
  id *

@aws
region us-west-2

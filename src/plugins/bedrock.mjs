import { join } from 'node:path'
import { toLogicalID } from '@architect/utils'

export let set = {
  customLambdas ({ arc, inventory }) {
    let lambdas = []
    for (let a of arc.actions) {
      let hasParams = typeof a === 'object' 
      let name = hasParams? Object.keys(a)[0] : a
      let src = hasParams && !!(a[name].src) ? a[name].src : join(process.cwd(), 'src', 'agent', name) 
      lambdas.push({
        name, 
        src
      })
    }
    return lambdas
  }
}

export let deploy = {
  async start ({ cloudformation, arc }) {

    let model = arc.agent.find(a => a[0] === 'model')[1]
    let instruction = arc.agent.find(a => a[0] === 'instruction')[1]
    let actions = arc.actions.map(a => {
      let hasParams = typeof a === 'object' 
      let name = hasParams? Object.keys(a)[0] : a
      let res = {
        ActionGroupName: name,
        ActionGroupExecutor: { 
          Lambda: { Ref: toLogicalID(name) + 'CustomLambda' },
          //CustomControl: 'RETURN_CONTROL'
        }
      }
      if (hasParams) {
        let obj = a[name]
        let params = Object.keys(obj).map(p => {
          let description = p 
          let type = obj[p].replace('?', '')
          let required = obj[p].includes('?')
          return {description, type, required} 
        })
          /*res.FunctionSchema = {
          Functions: [{Name: name, Parameters: params}]
        }*/
      }
      return res
    })

    cloudformation.Resources.Agent = {
      Type: "AWS::Bedrock::Agent",
      Properties: {
        AgentName: toLogicalID(arc.app[0] + '-agent'),
        FoundationModel: model,
        Instruction: instruction,
        ActionGroups: actions
      }
    }
    return cloudformation
  }
}

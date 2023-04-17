const Maker = require('./commons/commands/make')
const args = process.argv.slice(2);
const {log} = require('./commons/helpers')

const runner = async()=>{
    try{
        let flag = false
        if(args[0].includes('make:')){
            const makeCommand = args[0].split(':')
            if(makeCommand[1] === 'module') {
                flag = true
                await Maker.makeModule(args[1])
            }
            if(makeCommand[1] === 'controller' && args.length === 3) {
                flag = true
                await Maker.makeController(args[1], args[2])
            }
            if(makeCommand[1] === 'model' && args.length === 3) {
                flag = true
                await Maker.makeModel(args[1], args[2])
            }

            if(makeCommand[1] === 'request' && args.length === 3) {
                flag = true
                await Maker.makeRequest(args[1], args[2])
            }

            if(makeCommand[1] === 'service' && args.length === 3) {
                flag = true
                await Maker.makeService(args[1], args[2])
            }
        }
        if(!flag) log.error('Command not found!')

    } catch (e) {
        // console.log(e)
    }
}

runner()

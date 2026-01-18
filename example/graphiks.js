import { Graphiks, logger } from '../src/graphiks.js'

logger.setLevel('debug')
let graphiks
if (!graphiks) graphiks = new Graphiks()

export { graphiks }

import aclConcreteDominatedSimple from './simple/acl_concrete_dominated';
import aclConcreteDominatedASCII from './ascii/acl_concrete_dominated';
import seeder from './seeder'
import { getSumCombinations } from './utils';

const EFFECTIVE_ACL = 'G/Time:GDP/Users'

const randomAcls = seeder(100);

randomAcls.forEach((concreteAlc) => {
  const simpleResult = aclConcreteDominatedSimple(concreteAlc, EFFECTIVE_ACL);
  console.log(`${concreteAlc} is${simpleResult ? '':' not'} dominated above ${EFFECTIVE_ACL}\n`);

  const asciiResult = aclConcreteDominatedASCII(concreteAlc, EFFECTIVE_ACL);
  console.log(`${concreteAlc} is${asciiResult ? '':' not'} dominated above ${EFFECTIVE_ACL}\n`);
})
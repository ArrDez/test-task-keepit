import { parseAccessControllEntry } from '../utils/index';
import { isValidAccessEntry } from "../utils";

/**
 * Just a simple solution. The first one that comes into mind
 */
export default (concrete: string, effective: string): boolean => {

  if( ! isValidAccessEntry(concrete) ) {
    throw new Error('Invalid argument: concrete');
  }

  const [ concreteOperations, concreteController ] = parseAccessControllEntry(concrete);

  /**
   * Splitting access control string into separate entries. Validate, parse, then fill the Map
   * In the end Map will look like { controller: operations, ... }
   */
  const accessControlMap = effective.split(':').reduce((acc, val) => {
      if( ! isValidAccessEntry(val) ) {
        throw new Error('Invalid argument: effective');
      }
      const [ operations, controller ] = parseAccessControllEntry(val);
      acc.set(controller, operations);
      return acc;
  }, new Map());
  
  // Check if user has an access to controller
  if( ! accessControlMap.has(concreteController) ) {
    return false;
  }

  const effectiveAccessOperations = accessControlMap.get(concreteController);

  // Check if all operations are allowed. 
  let matches = 0;
  for (let char of concreteOperations) {
    matches += (effectiveAccessOperations.indexOf(char) !== -1) ? 1 : 0;
  }

  return matches === concreteOperations.length;
}


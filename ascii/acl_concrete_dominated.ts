import { getArraySum, getAsciiArray, getSumCombinations, parseAccessControllEntry } from '../utils/index';
import { isValidAccessEntry } from "../utils";

/**
 * After some time spent thinking ( but not so much :) )...
 */
export default (concrete: string, effective: string): boolean => {

  const weightSet = new Set();

  if( ! isValidAccessEntry(concrete) ) {
    throw new Error('Invalid argument: concrete');
  }

  /**
   * Calculate concrete access weight represented by a string. Consist of the controller name and weight of the operations. 
   * Initially, it was just a number (ascii sum of controller and operations), but i accrued collision on a big set of data.
   */
  const [ concreteOperations, concreteController ] = parseAccessControllEntry(concrete);
  const concreteWeight = getConcreteWeight(concreteOperations, concreteController);

  /**
   * Splitting access control string into separate entries. Validate, parse, then create it's weights and fill the Set
   * As an example if we have entry like GP/Users, we will create three weights for G/Users, P/Users and GP/Users.
   */
  effective.split(':').forEach((val) => {
      if( ! isValidAccessEntry(val) ) {
        throw new Error('Invalid argument: effective');
      }
      const [ operations, controller ] = parseAccessControllEntry(val);
      const effectiveWeight = getEffectiveWeight(operations, controller);
      effectiveWeight.forEach(weightSet.add, weightSet);
  });

  // The only thins is left is to check if concrete weight is exist in the Set
  return weightSet.has(concreteWeight);
}


export const getEffectiveWeight = (operation: string, controller: string): string[] => {
  // Calc all operations weight with controller
  const operationAscii = getAsciiArray(operation);
  return getSumCombinations(operationAscii).map(n => `${controller}${n}`);
}

export const getConcreteWeight = (operation: string, controller: string): string => {
  // Calc operation weight with controller
  const operationAscii = getAsciiArray(operation);
  const operationWeight = getArraySum(operationAscii);
  return `${controller}${operationWeight}`;
}
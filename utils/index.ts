
export const isValidAccessEntry = (entry: string): boolean => (new RegExp(`^[GUPDHO]+\/\\w+`)).test(entry);

export const parseAccessControllEntry = (entry: string): string[] => {
  const [ operations, controller ] = entry.split('/');
  return [ operations, controller.toLocaleLowerCase() ]
};

export const getArraySum = (array: number[]) => array.reduce((acc, val) => acc + val, 0);

export const getAsciiArray = (str: string): number[] => [...str].map(c => c.charCodeAt(0));

export const getSumCombinations = (array: number[]): number[] => {
  return array.reduce((result, number, key) => {
    result.push(number);
    array.slice(key + 1).reduce((acc, next) => {
      result.push(number + next);
      let acc_number = acc + next;
      result.push(acc_number);
      return acc_number;
    }, 0);
    return result;
  }, [])
}


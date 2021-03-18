const OPERATIONS_ACL = ['G','U','P','D','H','O'];
const CONTROLLERS_ACL = ['Time', 'Users'];

// Shamelessly copy-pasted lodash implementation
function baseRandom(lower: number, upper: number): number {
  return lower + Math.floor(Math.random() * (upper - lower + 1));
}
function shuffleSelf(array: Array<any>, size: number): Array<any> {
  var index = -1,
      length = array.length,
      lastIndex = length - 1;

  size = size === undefined ? length : size;
  while (++index < size) {
    var rand = baseRandom(index, lastIndex),
        value = array[rand];

    array[rand] = array[index];
    array[index] = value;
  }
  array.length = size;
  return array;
}

function generateRandomAcl() {
  const randomOperations = shuffleSelf([...OPERATIONS_ACL], baseRandom(1,2)).join('');
  const randomController = shuffleSelf([...CONTROLLERS_ACL], 1).join('');
  return `${randomOperations}/${randomController}`;
}

export default (count: number = 10): string[] => {
  return Array.apply(null, {length: count}).map( () => generateRandomAcl() )
}
//An array of numbers to show on one page.
export const PAGE_SIZE_OPTIONS: number[] = [10, 20, 50, 100];

//Removes empty properties of an object 
export function removeEmptyFields(obj) {
  let filteredObj = {...obj}
  for (const propName in filteredObj) {
    if (
      filteredObj[propName] === null ||
      filteredObj[propName] === undefined ||
      filteredObj[propName] === ''
    ) {
      delete filteredObj[propName];
    }
  }
  return filteredObj;
}

//Update collection
export function updateCollection(
  collection: any,
  newItem: any,
  isDeleteItem: boolean = false,
  unique = 'id'
) {
  if (isDeleteItem) {
    return collection.filter((item) => item[unique] !== newItem[unique]);
  }

  const updateItem = collection.find(
    (item) => item[unique] === newItem[unique]
  );
  if (updateItem) {
    const index = collection.indexOf(updateItem);
    collection[index] = newItem;
    return collection;
  }
  return [...collection, newItem];
}

export function putInLocalStorage(input) {
  const keyName = `city${localStorage.length}`;
  localStorage.setItem(keyName, input);
}

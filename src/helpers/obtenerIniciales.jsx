export const obtenerIniciales = (string) =>
  string.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')
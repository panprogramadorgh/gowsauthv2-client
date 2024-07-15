export class EnvVarNotDefinedError extends Error {
  constructor(varName: string) {
    super(`${varName} environment variable is not defined (check next.config.mjs)`)
  }
}

// Por algun motivo next no permite la obtencion de variables de entorno con interpretando el valor de una variable.
// export function getEnvVariable(name: string): string | never {
//   const variable = process.env[name]
//   console.log(variable)
//   if (!variable) throw new EnvVarNotDefinedError(name)
//   return variable
// }
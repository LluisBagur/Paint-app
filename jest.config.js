module.exports = {
    setupTestFrameworkScriptFile: "<rootDir>/setup.js",
    moduleNameMapper: {
      '\\.(css|scss)$': '<rootDir>/node_modules/jest-css-modules' //https://github.com/justinsisley/Jest-CSS-Modules
      //Lo que conseguimos con esto es mapear el css, babel no entiende según que sintaxis de los css, en este caso
      //nos daba error al leer una propiedad encabezada por un punto.
    }
  };
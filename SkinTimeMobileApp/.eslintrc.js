module.exports = {
     root: true,
     extends: ["eslint:recommended", "plugin:react/recommended"],
     parserOptions: {
       ecmaVersion: "latest",
       sourceType: "module"
     },
     env: {
       browser: true,
       es2021: true,
       node: true
     },
     rules: {
       "no-unused-vars": "warn",
       "react/prop-types": "error",
       "no-undef": "error",
       "import/no-unresolved": "error" // Bật kiểm tra import
     },
     plugins: ["import"]
   };
   
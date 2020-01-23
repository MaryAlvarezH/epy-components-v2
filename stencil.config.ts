import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
// import "./node_modules/epy-scss/dist/assets/symbol-defs.svg";
// import "./src/assets/symbol-defs.svg";

export const config: Config = {
  namespace: "epy-components",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "docs-readme"
    },
    {
      type: "www",
      serviceWorker: null // disable service workers
    }
  ],
  copy: [
    {
      src: "./assets/symbol-defs.svg",
      dest: "assets/symbol-defs.svg"
    }
  ],
  plugins: [sass()]
};

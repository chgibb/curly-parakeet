/*import {loadICDEditor} from "./req/loadICDEditor";

(async function(){

    await loadICDEditor(
        document.getElementById("container"),
        document.getElementById("documentStatus")
    );

})().catch((err) => {
    throw err;
});
*/

import * as React from "react";
import {render} from "react-dom";

import {Main} from "./client/main";

render(
    <Main />,
    document.getElementById("app")
  );
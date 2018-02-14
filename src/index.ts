import {loadICDEditor} from "./req/loadICDEditor";

(async function(){

    await loadICDEditor(
        document.getElementById("container"),
        document.getElementById("documentStatus")
    );

})().catch((err) => {
    throw err;
});

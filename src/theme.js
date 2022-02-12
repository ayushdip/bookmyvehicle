import { createTheme } from "@material-ui/core";
import { deepPurple, orange, purple, yellow } from "@material-ui/core/colors";

const theme = createTheme({
    palette : {
        primary : {
            main : purple["500"]
        },
        secondary : {
            main : deepPurple["500"]
        }
    }
})
export default theme;
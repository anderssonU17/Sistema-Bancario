import { useAccordionButton } from "react-bootstrap";
import { checkRol } from "../../Start/api/startCheckRol";
import { isUserAuthenticated } from "../../auth/helpers/LoginHelper";

export const checkRolAdmin = async() => {
    try {
        
        const logged = isUserAuthenticated();
        !logged ? window.location.href = '/' : null;

        const token = localStorage.getItem('token');

        const isAdmin = await checkRol(token);
        return isAdmin;

    } catch (error) {
        console.error(error)
    }
}
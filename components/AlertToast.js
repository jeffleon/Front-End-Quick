
import React, {useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import './styles/Alert.css';

/* This component render a alert Toast that will have a diferent contents and visualizations 
    its a validation, that the route between the points specificated by the user, was resolve successfully*/

const AlertToast = ({content, type}) => {
    const [alert, setShowAlert] = useState(true);
    /* This alert will be show in a determinate time about 4seg */
    setTimeout(() => {
       setShowAlert(false);
      }, 4000);
    return(
        <>
            {alert&&<Alert className="Alert" variant="filled" severity={type}>
            {content}
            </Alert>}
        </>
    )
}

export default AlertToast;
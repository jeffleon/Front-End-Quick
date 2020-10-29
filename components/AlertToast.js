
import React, {useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import Radium, {StyleRoot} from 'radium';
import Bounce from 'react-reveal/Bounce';
import './styles/Alert.css';


const AlertToast = ({content, type}) => {
    const [alert, setShowAlert] = useState(true);
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
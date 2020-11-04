import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Card, CardBody, CardText, Collapse, Button} from 'reactstrap';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Description';
import { withStyles} from '@material-ui/core/styles';
import { faGasPump, faStopwatch , faRoad , faStore, faMoneyBillAlt, faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import './styles/renderCard.css';
import Tooltip from '@material-ui/core/Tooltip';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
      zIndex:1
    },
  }))(Tooltip);
/* this component render all about the results of the post request */
const RenderCard = ({data}) => {
    const [isOpen, setOpen] = useState(true);
    const toggle = () => setOpen(!isOpen);
    const defaultProps = {
        color: 'secondary',
        children: <MailIcon />,
      };      
    return(
        <div className="wrapperCard">
            {/* this render all results that return the json object from post request */}
            <Button className="buttonResults" color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Trip Description <FontAwesomeIcon className="iconAngledown" icon={isOpen === true?faAngleUp:faAngleDown}/></Button>
            <Collapse isOpen={isOpen}>
                <Card className="cardResults"> 
                    <CardBody className="cardFont">
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography className="accorSubtitle" component={'span'}>Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography component={'span'}>
                                    <CardText>
                                        <LightTooltip className="tooltipCard" title="Distance" placement="left" arrow>
                                            <span className="cardDisCom"><FontAwesomeIcon icon={faRoad} /><span className="ml-2">{data.total_kms}Km</span></span>
                                        </LightTooltip>
                                    </CardText>
                                    <CardText> 
                                        <LightTooltip className="tooltipCard" title="Duration" placement="left" arrow>
                                            <span className="cardDisCom"><FontAwesomeIcon icon={faStopwatch} /><span className="ml-2">{data.duration.replace('hours','H').replace('mins',"Min")}</span></span>
                                        </LightTooltip>
                                    </CardText>
                                    <CardText>
                                        <LightTooltip className="tooltipCard" title="Toll Expenses" placement="left" arrow>
                                            <span className="cardDisCom"><FontAwesomeIcon icon={faStore} /><span className="ml-2"> ${data.toll_expenses.total}</span></span>
                                        </LightTooltip>
                                    </CardText>
                                    
                                    <CardText>
                                        <LightTooltip className="tooltipCard" title="Fuel Cost" placement="left" arrow>
                                            <span className="cardDisCom"><FontAwesomeIcon icon={faGasPump} /><span className="ml-2">${data.total_fuel_cost}</span></span>      
                                        </LightTooltip>
                                    </CardText>
                                    <CardText>
                                        <LightTooltip className="tooltipCard" title="Vehicle Expenses" placement="left" arrow>
                                            <span className="cardDisCom"><FontAwesomeIcon icon={faMoneyBillAlt} /><span className="ml-2">${data.total_vehicle_expenses}</span></span>
                                        </LightTooltip>
                                    </CardText>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                                <Typography className="accorSubtitle" component={'span'} >List of tolls {isOpen === true ?<Badge className="badgeList" style={{ fontSize: 25 }} badgeContent={data.tolls.length} {...defaultProps} />:null}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography component={'span'}>
                                    {/* go througth each toll to show his respective name */}
                                    {data.tolls.map((element, index)=><CardText key={index}>{`${element.name.length < 25?element.name:element.name.slice(0,20) + '...'}:`} <span className="ml-auto">{`$ ${data.toll_expenses.byTolls[index]}`}</span></CardText>)}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                            <CardText className="m-2"><strong>Total cost:</strong> {data.total_expenses}</CardText>   
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}

export default RenderCard
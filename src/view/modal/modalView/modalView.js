import View from '../../../core/view';
import { Col, Container, Row} from 'reactstrap';

import { CloseSharp } from "react-ionicons";
import Session from '../../../helper/session';

import "./modalView.scss"

export default class ModalView extends View 
{
    constructor(props)
	{
		super(props)
	
		this.state =
		{

		}
		
	}

    closeModal()
    {
        this._isMounted && this.props.closeModal();
    }
    
    render() {

        const prefs = Session.getPreferences();
        return (
            <div className="custom-modal-wrapper">
                <div className="custom-modal-container">
                    <Container className="themed-container m-0 p-0 h-100" fluid={true}>
                        <Row className="m-0 p-4 h-100 justify-content-center">
                            <Col className={`m-0 p-0 ${this.props?.isFixedToTop ? `align-self-top` : `align-self-center` } custom-modal-col`}>
                                    <div className={`p-0 t-${prefs?.theme}-bg-secondary t-${prefs?.theme}-text-alternative-highlight rounded-lg`}>
                                       <Container className={`themed-container m-0 p-0 rounded-xs-top`} fluid={true}>
                                                <Row className={`p-3 p-4 m-0 ${prefs?.dir} ${prefs?.dir}-secondaryFont font-md`}>
                                                
                                                        <>
                                                            <Col xs={10} sm={10} md={10} lg={10} xl={10} className={`m-0 p-0 py-2 align-self-center ${prefs?.dir} ${prefs?.dir}-primaryFont font-lg`}>
                                                                {this.props.title}
                                                                {this.props?.shouldShowSecondTitle
                                                                ?
                                                                    <div className={`pt-1 opacity-50 font-md t-${prefs?.theme}-text-alternative`}>
                                                                        {this.props?.secondTitle}
                                                                    </div>
                                                                :
                                                                    null
                                                                }
                                                            </Col>
                                                        </>

                                                    <Col xs={1} className={`m-0 p-0`}>
                                                        <div className={`custom-modal-closeButton ${prefs?.dir} close-btn-style t-${prefs?.theme}-hover-secondary-highlight font-lg pointer opacity-hover`} onClick={this.closeModal.bind(this)}>
                                                            <CloseSharp 
                                                                color={'#fff'}
                                                                height="25px"
                                                                width="25px"
                                                             />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        {this.props.children}
                                    </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}
import View from "../../../core/view";
import { Container, Row, Col } from "reactstrap";

import Session from "../../../helper/session";

import {Image} from "react-bootstrap";

import icon_chevronBackward from "../../../assets/images/icon_chevronBack.png";

export default class SmallModal extends View 
{
    handleBackEvent()
    {
        this._isMounted && this.props.handleBackEvent();
    }

    render()
    {
        const prefs = Session.getPreferences();
        return(
            <Container className={`themed-container m-0 p-0 rounded-xs-top`} fluid={true}>
                <Row className={`p-4 m-0 align-items-center ${prefs?.dir}-secondaryFont font-md`}>
                    {
                        this.props.shouldShowBackButton 
                        ?
                            <Col xs={1} className={`p-0 m-0 align-items-center t-${prefs?.theme}-bg-primary t-${prefs?.theme}-focus-primary-highlight opacity-hover rounded-xs ${prefs?.dir === "ltr" ? 'me-1' : 'ms-1'}`}>
                                <div className={`d-inline-block pointer p-2`} onClick={this.handleBackEvent.bind(this)} >
                                    <Image
                                        src={icon_chevronBackward}
                                        alt={ "icon_chevronBackward"}
                                        width={"5px"}
                                        className={`${prefs?.dir === "rtl" ? "rotate180" : ""}`}
                                    />
                                </div>
                            </Col>
                        :
                            null
                    }
                    <Col  className={`m-0 p-0 ${prefs?.dir}-pull-to-leading ${this.props?.shouldShowBackButton ? prefs?.dir === "rtl" ? 'pe-2' : 'ps-2' : ''}`}>

                    </Col>
                    <Col  className={`p-0 m-0 ${prefs?.dir}-pull-to-trailing`}>
                        <div onClick={this.changeLanguage.bind(this)} className={`d-inline-block mx-0 p-2 t-${prefs?.theme}-bg-primary t-${prefs?.theme}-text-alternative-highlight t-${prefs?.theme}-focus-primary-highlight pointer opacity-hover rounded-xs `}>
                            <p className={`m-0 ${prefs?.dir}-primaryFont font-md`}>
                                {prefs?.lang === "ar" ? this.i18n('common_english') : this.i18n('common_arabic')}
                            </p>
                        </div>
                    </Col>   
                </Row>
            </Container>
        )
    }
}
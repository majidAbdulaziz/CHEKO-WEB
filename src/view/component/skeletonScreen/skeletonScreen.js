import View from '../../../core/view.js';

import { Col, Row} from 'reactstrap';

import Session from '../../../helper/session.js';

import './skeletonScreen.scss';

export default class SkeletonScreen extends View 
{
    render() 
    {
        const prefs = Session.getPreferences();
        return (
            <>
                {this.props.skeletonType === "product"
                ?
                        <Col xs={1} className={`${prefs?.dir} menu-item m-0 mt-2 mb-2 mx-4 p-3 pt-4 px-4 rounded-md`}>
                            <Row className={``}>
                                <Col className={`px-4 position-relative`}>
                                    <div className={`${prefs?.dir} mt-3 ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative`}>
                                        <div className={`p-0 p-2 d-block skeletonSceen-blink t-${prefs?.theme}-bg-primary rounded-md`}></div>
                                    </div>

                                    <div className={`${prefs?.dir} mt-3 ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative-highlight opacity-50 font-sm`}>
                                        <div className={`p-0 p-2 d-block skeletonSceen-blink t-${prefs?.theme}-bg-primary rounded-md`}></div>
                                    </div>


                                    <Row className={`price-container`}>
                                        <Col xs={5} className={`p-0 px-2 price-text ${prefs?.dir} ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-accent font-lg font-weight-bold`}>
                                            <div className={`p-0 p-2 d-block skeletonSceen-blink t-${prefs?.theme}-bg-primary rounded-md`}></div>
                                        </Col>

                                        <Col xs={2}>
                                        </Col>

                                        <Col xs={1} />

                                        <Col xs={1} className={`p-0 price-text ${prefs?.dir} ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative text-center`}>
                                            <div className={`p-0 p-2 d-block skeletonSceen-blink t-${prefs?.theme}-bg-primary rounded-md`}></div>
                                        </Col>

                                        <Col xs={1}>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                :
                    null
        }
        </>
        )
    }
}

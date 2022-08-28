import View from '../../../core/view';

import { Col, Row} from 'reactstrap';

import Session from '../../../helper/session';

import './homeView.scss';

export default class HomeView extends View
{
    render()
    {  
        const prefs = Session.getPreferences();

        return (
            <Col style={{direction:prefs?.dir}} className={`m-0 p-0 h-100 w-100 t-${prefs?.theme}-bg-body not-scrollable justify-content-center align-content-center text-center`}>
                <Row className={`mt-15`}>
                    <Col xs={1}/>
                    <Col xs={10}>
                        <Row className={`wrap w-70`}>
                            {
                                this.props?.categories?.map(category => (
                                    <Col id={category?.id} xs={1} className={`category-container ${category?.isSelected ? 'category-selected' : ''} mx-5 my-3 text-center rounded-sm`}>
                                        <Row className={``}>
                                            <Col xs={3} style={{backgroundColor: category?.color}} className={`py-2 m-2 rounded-md`}>
                                                <img
                                                    src={category?.icon} 
                                                    className={`category-image`}
                                                    alt={category?.title + ' ' + this.i18n('common_image')}
                                                />
                                            </Col>
                                            <Col xs={4} className={`mt-4 ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative`}>
                                                {category?.title}
                                            </Col>
                                            <Col xs={4} className={`mt-4 ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative`}>
                                                {category?.qunatity}
                                            </Col>
                                        </Row>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Col>


                </Row>
            </Col>
        );
    }
}
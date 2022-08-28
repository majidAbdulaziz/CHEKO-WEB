import View from '../../../core/view';

import { Col, Row} from 'reactstrap';

import Session from '../../../helper/session';

import './homeView.scss';

export default class HomeView extends View
{
    chooseCategory(id)
    {
        this._isMounted && this.props?.chooseCategory(id);
    }

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
                                <Col id={category?.id} xs={2} className={`mx-4`}>
                                    <button
                                        onClick={this.chooseCategory.bind(this, category?.id)}
                                        disabled={category?.id === this.props?.selectedCategory}
                                        className={`category-container p-2 ${category?.id === this.props?.selectedCategory ? 'category-selected' : ''} text-center rounded-sm`}
                                    >                                            
                                                <Row className={``}>
                                                    <Col xs={3} style={{backgroundColor: category?.color}} className={`category-image-container py-2 px-2 rounded-md justify-content-center align-content-center`}>
                                                        <img
                                                            src={category?.icon} 
                                                            className={`category-image`}
                                                            alt={category?.title + ' ' + this.i18n('common_image')}
                                                        />
                                                    </Col>
                                                    <Col xs={5} className={`category-text ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative`}>
                                                        {category?.title}
                                                    </Col>
                                                    <Col xs={3} className={`category-text ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative`}>
                                                        {category?.qunatity}
                                                    </Col>
                                                </Row>
                                        </button>
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
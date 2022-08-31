import View from '../../../core/view.js';

import { Col, Row} from 'reactstrap';

import Session from '../../../helper/session.js';

import './categoryCard.scss';

export default class CategoryCard extends View 
{
    render() 
    {
        const prefs = Session.getPreferences();
        
        return (
            <Col xs={5} sm={4} md={4} lg={2} className={`mt-2 category-container-spacer`}>
            <button
                onClick={() => this.props?.chooseCategory(this.props?.category?.id)}
                disabled={this.props?.category?.id === this.props?.selectedCategory}
                style={prefs?.theme === 'dark' ? {backgroundColor: this.props?.category?.color} : {}}
                className={`category-container p-2 ${this.props?.category?.id === this.props?.selectedCategory ? `category-selected-${prefs?.theme}` : ''} text-center rounded-sm`}
            >                                            
                        <Row>
                            <Col xs={3} style={{backgroundColor: this.props?.category?.color}} className={`category-image-container py-2 px-2 rounded-md justify-content-center align-content-center`}>
                                <img
                                    src={this.props?.category?.icon} 
                                    className={`category-image`}
                                    alt={this.props?.category?.title + ' ' + this.i18n('common_image')}
                                />
                            </Col>
                            <Col xs={5} className={`category-text ${prefs?.dir}-primaryFont ${prefs?.theme === 'light' ? `t-${prefs?.theme}-text-alternative` : `t-${prefs?.theme}-text-primary` } font-weight-bold`}>
                                {this.props?.category?.title}
                            </Col>
                            <Col xs={3} className={`category-text ${prefs?.dir}-primaryFont ${prefs?.theme === 'light' ? `t-${prefs?.theme}-text-alternative` : `t-${prefs?.theme}-text-primary` }`}>
                                {this.props?.category?.qunatity}
                            </Col>
                        </Row>
                </button>
        </Col>
        )
    }
}

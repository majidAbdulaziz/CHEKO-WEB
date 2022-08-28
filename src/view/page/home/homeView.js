import View from '../../../core/view';

import { Col, Row} from 'reactstrap';

import Session from '../../../helper/session';
import Formatter from '../../../helper/formatter';

import './homeView.scss';

export default class HomeView extends View
{
    chooseCategory(id)
    {
        this._isMounted && this.props?.chooseCategory(id);
    }

    changeQuantity(id, action)
    {
        this._isMounted && this.props?.changeQuantity(id, action);
    }

    render()
    {  
        const prefs = Session.getPreferences();

        return (
            <Col style={{direction:prefs?.dir}} className={`home-scrollable m-0 p-0 h-100 w-100 t-${prefs?.theme}-bg-body text-center`}>
                <Row className={`home-main-container pt-15`}>
                    <Col xs={10}>
                        <Row className={`wrap ${prefs?.dir}`}>
                            {
                                this.props?.categories?.map(category => (
                                    <Col id={category?.id} xs={5} sm={4} md={4} lg={2} className={`mt-2 category-container-spacer`}>
                                        <button
                                            onClick={this.chooseCategory.bind(this, category?.id)}
                                            disabled={category?.id === this.props?.selectedCategory}
                                            className={`category-container p-2 ${category?.id === this.props?.selectedCategory ? 'category-selected' : ''} text-center rounded-sm`}
                                        >                                            
                                                    <Row>
                                                        <Col xs={3} style={{backgroundColor: category?.color}} className={`category-image-container py-2 px-2 rounded-md justify-content-center align-content-center`}>
                                                            <img
                                                                src={category?.icon} 
                                                                className={`category-image`}
                                                                alt={category?.title + ' ' + this.i18n('common_image')}
                                                            />
                                                        </Col>
                                                        <Col xs={5} className={`category-text ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative font-weight-bold`}>
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

                        <Row className={`wrap mt-5`}>
                            <Col xs={2} className={`${prefs?.dir} category-text ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative font-xl font-weight-bold`}>
                                {this.props?.categories?.filter(category => category?.id === this.props?.selectedCategory)[0]?.title}
                            </Col>
                            <Col xs={10} className={`category-border`} />
                        </Row>

                        <Row className={`wrap mt-5`}>
                            {
                                this.props?.list?.map((item, index) => (
                                    <Col id={item?._id} xs={1} className={`${prefs?.dir} menu-item m-0 mt-2 mb-2 mx-4 p-3 pt-4 px-4 rounded-md`}>
                                        <Row className={``}>
                                            <img
                                                src={item?.images[0]} 
                                                className={`item-image m-0 p-0 rounded-md`}
                                                alt={item?.menuname + ' ' + this.i18n('common_image')}
                                            />
                                            <Col className={`px-4 position-relative`}>
                                                <div className={`${prefs?.dir} mt-3 ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative`}>
                                                    {item?.menuname}
                                                </div>

                                                <div className={`${prefs?.dir} mt-3 ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative-highlight opacity-50 font-sm`}>
                                                    {"200 " + this.i18n('common_calories')}
                                                </div>

                                                {
                                                    (index === 0 || index === 1)
                                                    ?
                                                        <div className={`best-sale-container px-3 py-1 ${prefs?.dir} mt-3 ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative-highlight font-md rounded-xs`}>
                                                            {this.i18n('common_bestSale')}
                                                        </div>
                                                    :
                                                        null
                                                }


                                                <Row className={`price-container`}>
                                                    <Col xs={5} className={`p-0 px-2 price-text ${prefs?.dir} ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-accent font-lg font-weight-bold`}>
                                                        {Formatter?.numberToStringWithCurrency(item?.qunatity ? item?.qunatity * 20 : 20, false, prefs?.currency, 'rtl', prefs?.lang)}
                                                    </Col>

                                                    <Col xs={2}>
                                                        <button
                                                            onClick={this.changeQuantity.bind(this, item?._id, 'decrease')}
                                                            className={`m-0 mx-0 px-3 t-${prefs?.theme}-text-alternative t-${prefs?.theme}-bg-accent text-center rounded-sm font-lg`}
                                                        >  
                                                            {'-'}
                                                        </button> 
                                                    </Col>

                                                    <Col xs={1} />

                                                    <Col xs={1} className={`p-0 price-text ${prefs?.dir} ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative text-center`}>
                                                        {item?.qunatity ? item?.qunatity : 0}
                                                    </Col>

                                                    <Col xs={1}>
                                                        <button
                                                            onClick={this.changeQuantity.bind(this, item?._id, 'increase')}
                                                            className={`m-0 px-3 t-${prefs?.theme}-text-alternative t-${prefs?.theme}-bg-accent text-center rounded-sm font-lg`}
                                                        >  
                                                            {'+'}
                                                        </button> 
                                                    </Col>
                                                </Row>
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
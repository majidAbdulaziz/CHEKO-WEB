import View from '../../../core/view.js';

import { Col, Row} from 'reactstrap';

import Session from '../../../helper/session.js';
import Formatter from '../../../helper/formatter';

import './productCard.scss';

export default class ProductCard extends View 
{
    render() 
    {
        const prefs = Session.getPreferences();
        
        return (
            <Col xs={1} className={`${prefs?.dir} menu-item m-0 mt-2 mb-2 mx-4 p-3 pt-4 px-4 rounded-md`}>
                <Row className={``}>
                    <img
                        src={this.props?.item?.images[0]} 
                        className={`item-image m-0 p-0 rounded-md`}
                        alt={this.props?.item?.menuname + ' ' + this.i18n('common_image')}
                    />
                    <Col className={`px-4 position-relative`}>
                        <div className={`${prefs?.dir} mt-3 ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative`}>
                            {this.props?.item?.menuname}
                        </div>

                        <div className={`${prefs?.dir} mt-3 ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative-highlight opacity-50 font-sm`}>
                            {"200 " + this.i18n('common_calories')}
                        </div>

                        {
                            (this.props?.index === 0 || this.props?.index === 1)
                            ?
                                <div className={`best-sale-container px-3 py-1 ${prefs?.dir} mt-3 ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative-highlight font-md rounded-xs`}>
                                    {this.i18n('common_bestSale')}
                                </div>
                            :
                                null
                        }


                        <Row className={`price-container`}>
                            <Col xs={5} className={`p-0 px-2 price-text ${prefs?.dir} ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-accent font-lg font-weight-bold`}>
                                {Formatter?.numberToStringWithCurrency(this.props?.item?.qunatity ? this.props?.item?.qunatity * 20 : 20, false, prefs?.currency, 'rtl', prefs?.lang)}
                            </Col>

                            <Col xs={2}>
                                <button
                                    onClick={() => this.props?.changeQuantity(this.props?.item?._id, 'decrease')}
                                    className={`m-0 mx-0 px-3 t-${prefs?.theme}-text-alternative t-${prefs?.theme}-bg-accent text-center rounded-sm font-lg`}
                                >  
                                    {'-'}
                                </button> 
                            </Col>

                            <Col xs={1} />

                            <Col xs={1} className={`p-0 price-text ${prefs?.dir} ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative text-center`}>
                                {this.props?.item?.qunatity ? this.props?.item?.qunatity : 0}
                            </Col>

                            <Col xs={1}>
                                <button
                                    onClick={() => this.props?.changeQuantity(this.props?.item?._id, 'increase')}
                                    className={`m-0 px-3 t-${prefs?.theme}-text-alternative t-${prefs?.theme}-bg-accent text-center rounded-sm font-lg`}
                                >  
                                    {'+'}
                                </button> 
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        )
    }
}

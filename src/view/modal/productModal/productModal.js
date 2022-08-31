import ModalController from '../../../core/modalController';

import { Col, Row} from 'reactstrap';

import ModalView from '../modalView/modalView';

import Session from '../../../helper/session';
import Formatter from '../../../helper/formatter';

import "./productModal.scss"

export default class ProductModal extends ModalController
{

    constructor(props)
    {
        super(props)
    
        this.state =
        {
            item: props?.optionalModalData
        }
    }

    toggleModal(action, activeModal)
    {
        this._isMounted && this.props?.toggleModal(action, activeModal);
    }

    updateToSameState()
    {
        this._isMounted && this.setState({item: this.state?.item});

        setTimeout(() => 
        {
            this._isMounted && this.setState({item: this.state?.item});
        }, 250);
    }

    render()
    {
        const prefs = Session.getPreferences();	

        return (
            <>
                <ModalView
                   title={this.state?.item?.menuname}
                   secondTitle={"200 " + this.i18n('common_calories')}
                   shouldShowSecondTitle
                   isFixedToTop={false}
                   closeModal={this.toggleModal.bind(this, "close", "productModal")}
                >

                    <Col xx={1} className='px-4'>
                        <div className={`p-0 pt-2 line-height opacity-50 font-md t-${prefs?.theme}-text-alternative-highlight ${prefs?.dir} ${prefs?.dir}-primaryFont`}>{this.state?.item?.description}</div>
                    </Col>

                    <Col xx={1} className='px-4 mt-3'>
                        <img
                            src={this.state?.item?.images[0]} 
                            className={`item-image-modal m-0 p-0 rounded-md`}
                            alt={this.state?.item?.menuname + ' ' + this.i18n('common_image')}
                        />                    
                    </Col>

                    <Row xx={1} className='px-4 mt-3 pb-5'>
                        <Col xs={4} md={5} lg={6} xl={7} />
                        <Col xx={2} >
                            <Row xs={2} className={`price-container`}>
                                <Col xs={5} className={`p-0 px-2 price-text ${prefs?.dir} ${prefs?.dir}-primaryFont ${prefs?.theme === 'light' ? `t-${prefs?.theme}-text-accent` : `t-${prefs?.theme}-text-alternative opacity-50`} font-lg font-weight-bold`}>
                                    {Formatter?.numberToStringWithCurrency(this.state?.item?.qunatity ? this.state?.item?.qunatity * 20 : 20, false, prefs?.currency, 'rtl', prefs?.lang)}
                                </Col>

                                <Col xs={2}>
                                    <button
                                        onClick={(e) =>{e.stopPropagation(); this.props?.changeQuantity(this.state?.item?._id, 'decrease'); this.updateToSameState(); }}
                                        className={`m-0 mx-0 px-3 py-1 t-${prefs?.theme}-text-alternative ${prefs?.theme === 'light' ? `t-${prefs?.theme}-bg-accent` : `square border border-1 t-${prefs?.theme}-border-accent t-${prefs?.theme}-text-accent`}  text-center rounded-sm font-lg`}
                                    >  
                                        {'-'}
                                    </button> 
                                </Col>

                                <Col xs={1} />

                                <Col xs={1} className={`p-0 qunantity-text ${prefs?.dir} ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative text-center font-md`}>
                                    {this.state?.item?.qunatity ? this.state?.item?.qunatity : 0}
                                </Col>

                                <Col xs={1}>
                                    <button
                                        onClick={(e) =>{e.stopPropagation(); this.props?.changeQuantity(this.state?.item?._id, 'increase'); this.updateToSameState();}}
                                        className={`m-0 px-3 py-1 t-${prefs?.theme}-text-alternative ${prefs?.theme === 'light' ? `t-${prefs?.theme}-bg-accent` : `square border border-1 t-${prefs?.theme}-border-accent t-${prefs?.theme}-text-accent`}  text-center rounded-sm font-lg`}
                                    >  
                                        {'+'}
                                    </button> 
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    
                </ModalView>
            </>
        )
    }
}
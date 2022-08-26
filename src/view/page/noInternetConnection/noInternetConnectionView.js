import View from '../../../core/view';

import { Col } from 'reactstrap';
import { CloseOutline } from 'react-ionicons';

import CustomButton from '../../component/button/customButton';

import Session from '../../../helper/session';

import './noInternetConnectionView.scss';

export default class NoInternetConnectionView extends View
{

    buttonAction()
    {
        this._isMounted && this.props?.buttonAction();
    }


    render()
    {  
        const prefs = Session.getPreferences();

        return (
            <>
                <div className={`t-${prefs?.theme}-text-alternative ${prefs?.dir}-primaryFont`}>
                    <CloseOutline color={`t-${prefs?.theme}-text-alternative`} height="130px" width="130px" />             
                </div>
                <div className={`pageNotFoundView-wrapper t-${prefs?.theme}-text-alternative ${prefs?.dir}-primaryFont font-lg`}>{this.i18n('common_noInternet')}</div>
                <Col xs={6} md={2} className={`p-0 pt-4`}>
                    <CustomButton
                        iconAndText={false}
                        viewIsLoading={false}
                        disabled={false}
                        style={`p-3 w-100 borderless customModal-button t-${prefs?.theme}-text-primary-highlight ${prefs?.dir}-secondaryFont t-${prefs?.theme}-bg-accent font-md rounded-sm`}
                        text={this.i18n('action_try_again')}
                        action={this.buttonAction.bind(this)}
                    />
                </Col>
            </>
        );
    }
}
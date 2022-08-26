import View from '../../../core/view';

import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import { CloseOutline } from 'react-ionicons';

import CustomButton from '../../component/button/customButton';

import Session from '../../../helper/session';

import './internalErrorView.scss';

export default class InternalErrorView extends View
{
    render()
    {  
        const prefs = Session.getPreferences();

        return (
            <>
                <div className={`t-${prefs?.theme}-text-alternative ${prefs?.dir}-primaryFont`}>
                    <CloseOutline color={`t-${prefs?.theme}-text-alternative`} height="130px" width="130px" />             
                </div>
                <div className={`internalErrorView-wrapper t-${prefs?.theme}-text-alternative ${prefs?.dir}-primaryFont`}>500</div>
                <div className={`internalErrorView-wrapper t-${prefs?.theme}-text-alternative ${prefs?.dir}-primaryFont font-lg`}>{this.i18n('title_internalError')}</div>
                <Col xs={6} md={2} className={`p-0 pt-4`}>
                    <Link className="naked" to="/">
                        <CustomButton
                            iconAndText={false}
                            viewIsLoading={false}
                            disabled={false}
                            style={`p-3 w-100 borderless customModal-button t-${prefs?.theme}-text-primary-highlight t-${prefs?.theme}-bg-accent font-md rounded-sm`}
                            text={this.i18n('title_home')}
                            action={() => {}}
                        />
                    </Link>
                </Col>
            </>
        );
    }
}
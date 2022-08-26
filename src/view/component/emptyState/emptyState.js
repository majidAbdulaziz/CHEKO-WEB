import View from '../../../core/view';

import { Row } from 'reactstrap';
import * as Icons from "react-ionicons";

import Session from '../../../helper/session';

import './emptyState.scss';

export default class EmptyState extends View
{
    render()
    {
        const prefs = Session.getPreferences();
        let Icon = this.props?.icon ? Icons[this.props.icon] : "";

        return (
            <Row className="m-0 p-0 py-5 px-2 px-xl-4">

                {this.props?.shouldShowIcon
                ?
                    <div className={`p-0 t-${prefs.theme}-text-alternative text-center ${prefs?.dir}-secondaryFont`}>
                        <Icon
                            className={`t-${prefs.theme}-text-alternative`}
                            cssClasses={`t-${prefs.theme}-text-alternative`}
                            height="100px"
                            width="100px"
                        />
                    </div>
                :
                    null
                }

                <div className={`p-0 pt-2 line-height font-md t-${prefs.theme}-alternative text-center ${prefs?.dir}-secondaryFont`}>
                    {this.props?.text}
                </div>
            </Row>
        )
    }
}

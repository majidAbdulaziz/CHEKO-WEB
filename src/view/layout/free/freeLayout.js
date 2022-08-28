import View from '../../../core/view';

import {Row} from "reactstrap";

import Session from "../../../helper/session";

import "./freeLayout.scss";

export default class FreeLayoutView extends View
{


    render()
    {
		const prefs = Session.getPreferences();

        return (
			<Row style={{direction:prefs?.dir}} className={`m-0 p-0 h-100 w-100 t-${prefs?.theme}-bg-body justify-content-center align-content-center text-center`}>
				{this.props.children}
			</Row>
        );
    }
}
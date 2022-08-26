import View from '../../../core/view';

import {ChevronBackOutline, ChevronForwardOutline} from "react-ionicons";

import Session from '../../../helper/session';
import Formatter from '../../../helper/formatter';


import './ItemOfListView.scss';

export default class ItemOfListView extends View {

    handleClickEvent(id) 
    {
        this._isMounted && this.props?.handleClickEvent(id);
    }

    render() {
        const prefs = Session.getPreferences();
        return (
            <tr className={`pointer text-center t-${prefs?.theme}-bg-secondary-highlight border-bottom-table t-${prefs?.theme}-bb-primary-highlight font-sm`} onClick={this.handleClickEvent.bind(this, this.props?.identifier === "section_id" ? this.props?.item : this.props?.identifier ==="gift_card_info" ? this.props?.item?.gift_card_id: this.props?.identifier === "order" ? this.props?.item?.entity_name : this.props?.isSearch ? this.props?.item.entity_id: this.props?.item[this.props?.identifier])}>
                {this.props?.listOfKeys?.map((keysObject, index) => {
                    return (
                        <td key={index} className={`t-${prefs?.theme}-text-alternative-highlight text-center ${prefs?.dir}-secondaryFont p-3 ${keysObject?.isHidden ? `d-none d-md-table-cell` : ``}`}>
                            {keysObject?.isBoolean
                            ?
                                parseInt(this.props?.item?.[keysObject?.key])
                            ?
                                keysObject?.boolTrue
                            :
                                keysObject?.boolFalse
                            :
                                keysObject?.needTranslation
                            ?
                                this.i18n(keysObject?.translation + this.props?.item?.[keysObject?.key])
                            :
                                keysObject?.needDateFormatter
                            ?
                                Formatter.timestampToDateString(this.props?.item?.[keysObject?.key], prefs?.timezone)
                            :
                                this.props?.item?.[keysObject?.key]
                            }
                        </td>
                    )
                })}
                <td className={`p-2`}>
                    {prefs?.dir === "ltr"
                    ?
                        <ChevronForwardOutline className={`${this.props?.pageNumber === 1?`t-${prefs?.theme}-text-primary`:`t-${prefs?.theme}-text-alternative-highlight`}`} cssClasses={`${this.props?.pageNumber === 1?`t-${prefs?.theme}-text-primary`:`t-${prefs?.theme}-text-alternative-highlight`}`} height="22px" width="22px"/>
                    :
                        <ChevronBackOutline className={`${this.props?.pageNumber === 1?`t-${prefs?.theme}-text-primary`:`t-${prefs?.theme}-text-alternative-highlight`}`} cssClasses={`${this.props?.pageNumber === 1?`t-${prefs?.theme}-text-primary`:`t-${prefs?.theme}-text-alternative-highlight`}`} height="22px" width="22px"/>
                    }
                </td>
            </tr>
        );
    }
}
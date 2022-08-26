import View from '../../../core/view';

import {ChevronBackOutline, ChevronForwardOutline} from "react-ionicons";

import Session from '../../../helper/session';

import './loadContent.scss';

export default class LoadContent extends View
{
	constructor(props)
	{
		super(props)
	
		this.state = 
		{
			
		}

	}

    loadContent(type)
    {
        this._isMounted && this.props?.loadContent(type);
    }

    render()
    {
        
		const prefs = Session.getPreferences();
        return (
            <div className={`p-0 m-0 d-flex text-center justify-content-center ${prefs?.dir}-secondaryFont`}>
                
                <div className={`${this.props?.pageNumber === 1?`t-${prefs?.theme}-bg-alternative-gray loadContent-disabled`:`pointer opacity-hover t-${prefs?.theme}-bg-primary`} align-self-center p-2 rounded-sm text-center `} onClick={this.loadContent.bind(this,"less")}>
                    {prefs?.dir === "rtl"
                    ?
                        <ChevronForwardOutline className={`${this.props?.pageNumber === 1?`t-${prefs?.theme}-text-primary`:`t-${prefs?.theme}-text-alternative-highlight`}`} cssClasses={`${this.props?.pageNumber === 1?`t-${prefs?.theme}-text-primary`:`t-${prefs?.theme}-text-alternative-highlight`}`} height="22px" width="22px"/>
                    :
                        <ChevronBackOutline className={`${this.props?.pageNumber === 1?`t-${prefs?.theme}-text-primary`:`t-${prefs?.theme}-text-alternative-highlight`}`} cssClasses={`${this.props?.pageNumber === 1?`t-${prefs?.theme}-text-primary`:`t-${prefs?.theme}-text-alternative-highlight`}`} height="22px" width="22px"/>
                    }
                </div>
                
                
                <div className={`p-1 px-3 rounded-md text-center align-self-center t-${prefs?.theme}-text-alternative font-md ${prefs?.dir}-secondaryFont`}>
                    {`${this.props?.itemFrom} ${this.i18n('common_to')} ${this.props?.itemTo > this.props?.numberOfItem ? this.props?.numberOfItem : this.props?.itemTo} ${this.i18n('common_outof')} ${this.props?.numberOfItem}`}
                </div>
                    
                    <div className={`${(this.props?.itemTo === this.props?.numberOfItem || this.props?.itemTo > this.props?.numberOfItem) ?` t-${prefs?.theme}-bg-alternative-gray loadContent-disabled `: ` pointer opacity-hover t-${prefs?.theme}-bg-primary`} p-2 rounded-sm text-center`} onClick={this.loadContent.bind(this,"more")}>
                        {prefs?.dir === "rtl"
                        ?
                            <ChevronBackOutline className={`${(this.props?.itemTo === this.props?.numberOfItem || this.props?.itemTo > this.props?.numberOfItem)?`t-${prefs?.theme}-text-primary`:`t-${prefs?.theme}-text-alternative-highlight`}`} cssClasses={`${(this.props?.itemTo === this.props?.numberOfItem || this.props?.itemTo > this.props?.numberOfItem)?`t-${prefs?.theme}-text-primary`:`t-${prefs?.theme}-text-alternative-highlight`}`} height="22px" width="22px"/>
                        :
                            <ChevronForwardOutline className={`${(this.props?.itemTo === this.props?.numberOfItem || this.props?.itemTo > this.props?.numberOfItem)?`t-${prefs?.theme}-text-primary`:`t-${prefs?.theme}-text-alternative-highlight`}`} cssClasses={`${(this.props?.itemTo === this.props?.numberOfItem || this.props?.itemTo > this.props?.numberOfItem)?`t-${prefs?.theme}-text-primary`:`t-${prefs?.theme}-text-alternative-highlight`}`} height="22px" width="22px"/>
                        }
                    </div>
                    
            </div>
            
        );
    }
}
import View from '../../../core/view';

import { withRouter } from 'react-router';
import {createRef} from "react";
import { Link } from "react-router-dom";
import { Row, Col} from "reactstrap";
import {Image} from "react-bootstrap";

import NoInternetConnectionViewController from '../../../viewController/static/noInternetConnectionViewController';


import Session from "../../../helper/session";

import "./masterLayout.scss";

class MasterLayoutView extends View
{
	constructor(props)
	{
		super(props)
	
		this.state =
		{
			isOnline:true,
			isOptionsSheetOpen:false,
			searchKey: '',
			searchValue:"user",
			searchLabel:this.i18n('title_users'),


		}
		this._optionsDropdown = createRef(null);
		this._listOfOptions = 
        [
            { "value": "user", "label": this.i18n('title_users') },
            { "value": "tournaments", "label": this.i18n('title_tournaments')},
			{ "value": "playgrounds", "label": this.i18n('title_playgrounds')},
			{ "value": "flags", "label": this.i18n('title_flags')},
        ];
	}

	toggleCollapse()
	{
		this._isMounted && this.setState({...this.state, isCollapsed: !this.state.isCollapsed});
	}

	handleSearchChanges(e)
	{
		this._isMounted && this.setState({...this.state, searchKey:e.target.value});
	}
	

	clearSearchResults()
	{
		document.getElementById("search").value = "";
		this._isMounted && this.setState({...this.state, searchKey:''});
	}
	
	searchForUsers()
	{
		alert(this.props?.searchKey)
	}

	toggleProfileModal()
	{
		this._isMounted && this.props?.toggleModal("open",'userProfileModal')
	}

	toggleOptions()
    {
        this._isMounted && this.setState({...this.state, isOptionsSheetOpen : !this.state?.isOptionsSheetOpen});
	}
	
	handleOptionDropdownClickEvent(value,label)
    {
		this._isMounted && this.setState({...this.state,  searchValue:value ,searchLabel:value});
	}

	updateInternetConnection(flag)
    {
		this._isMounted && this.setState({...this.state, isOnline:flag});
			
		if(flag === false)
		{
			this._isMounted && this.showErrMsg(this.i18n('common_noInternet'), 'warning');
		}
	}

	recheckInternetConnection()
    {
        if(window.navigator.onLine === false)
        {
            this._isMounted && this.updateInternetConnection(false);
        } 
    }

	viewDidMount()
	{
		this._isMounted && window.addEventListener('online', () => this.updateInternetConnection(true));
        this._isMounted && window.addEventListener('offline', () => this.updateInternetConnection(false));
        
        if(window.navigator.onLine === false)
        {
            this._isMounted && this.updateInternetConnection(false);
        } 
	}

	viewDidUnmount()
    {
        this._isMounted && window.removeEventListener('online', () => this.updateInternetConnection(true));
        this._isMounted && window.removeEventListener('offline', () => this.updateInternetConnection(false));
    }


    render()
    {
		const prefs = Session.getPreferences();		
		

        return (
			<>
				{this.state?.isOnline
				?
					<div style={{direction:prefs?.dir}} className={`masterLayout-mainContainer h-100 p-4 t-${prefs?.theme}-bg-secondary`}>
						<div className={`masterLayout-bodyContainer`}>
							<div className={`masterLayout-headerContainer t-${prefs?.theme}-bg-secondary`}>
								<Row className={`m-0 p-0 align-items-center ${prefs?.dir}-primaryFont pb-4`}>
									
									<Col className={`p-0 m-0`}>
										<div className={`p-0 m-0 d-flex justify-content-end align-items-center`}>
											<div className={`p-0 m-0 px-2 d-none d-lg-flex`}>
												<div className={` p-0 m-0 text-justify d-none d-lg-block t-${prefs?.theme}-text-alternative-highlight font-md `}>
													{`${this.i18n('common_welcome')} 👋`}
												</div>
												<div className={`p-0 m-0 d-none d-lg-block text-justify t-${prefs?.theme}-text-alternative-highlight font-md`}>
													{`${this.i18n('common_admin')}`}
												</div>
											</div>
										</div>
									</Col>
								</Row>
							</div>
						</div>
						
					</div>
				:
					<NoInternetConnectionViewController buttonAction={this.recheckInternetConnection.bind(this)} />
				}
			</>
        );
    }
}

export default withRouter(MasterLayoutView)
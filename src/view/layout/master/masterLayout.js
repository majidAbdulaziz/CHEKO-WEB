import View from '../../../core/view';

import { withRouter } from 'react-router';
import {createRef} from "react";
import { Link } from "react-router-dom";
import {Container, Row, Col} from "reactstrap";

import NoInternetConnectionViewController from '../../../viewController/static/noInternetConnectionViewController';

import CustomButton from '../../component/button/customButton';
import headerBackground from '../../../assets/images/headerBackground.png'
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
			tabs: 
			[
				{
					title: this.i18n('title_home'),
					route: '/'
				},
				{
					title: this.i18n('title_map'),
					route: '/map'
				}
			]

		}
		this._optionsDropdown = createRef(null);
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
					<div style={{direction:prefs?.dir}} className={`masterLayout-mainContainer h-100 t-${prefs?.theme}-bg-secondary`}>
						<div className={`masterLayout-bodyContainer`}>

							<div style={{backgroundImage: `url(${headerBackground})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}} className={`t-${prefs?.theme}-masterLayout-headerBackgorund-filter masterLayout-headerBackgorund`} />

							<div className={` t-${prefs?.theme}-bg-header ${prefs?.dir}-header-rounded-bottom-trailing masterLayout-headerContainer`}>
								<Row>
									<Col xs={1}/>
									<Col xs={10}>
										<Row className={`m-0 p-0 align-items-center`}>
											{
												this.state?.tabs?.map(tab => (
													<Link style={{zIndex: 100}} className="naked" to={tab?.route}>
														<CustomButton
															iconAndText={false}
															viewIsLoading={false}
															disabled={false}
															style={`
																pt-4 pb-3 px-3 
																${prefs?.dir}-rounded-bottom 
																${tab?.route === this.props.location.pathname ? `t-${prefs?.theme}-bg-accent ` : ''} 
																${tab?.route === this.props.location.pathname ? `t-${prefs?.theme}-text-alternative` : `t-${prefs?.theme}-text-secondary`} 
																${prefs?.dir}-primaryFont text-center
															`}
															text={tab?.title}
														/>
													</Link>
												))
											}
										</Row>

										<Row className={`mt-25 p-0 align-items-center ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-secondary`}>
											eke
										</Row>
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
import View from '../../../core/view';

import { withRouter } from 'react-router';
import {createRef} from "react";
import { Link } from "react-router-dom";
import {Row, Col} from "reactstrap";

import NoInternetConnectionViewController from '../../../viewController/static/noInternetConnectionViewController';

import CustomButton from '../../component/button/customButton';
import SearchableDropdownMenu from '../../component/searchableDropdownMenu/searchableDropdownMenu';

import headerBackground from '../../../assets/images/headerBackground.png';
import searchIcon from '../../../assets/images/search.png'
import filterIcon from '../../../assets/images/filter.png'

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
			filterKey: '',
			tabs: 
			[
				{
					title: this.i18n('title_home'),
					route: '/home'
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

	handleThemeChange(currentTheme)
	{
		this._isMounted && Session?.setPreferences('theme', currentTheme === 'light' ? 'dark' : 'light');

		setTimeout(() => 
		{
			this._isMounted && this.props?.forceUpdate();
		}, 250);
	}

	search()
	{
		this._isMounted && this.props?.search(this.state?.searchKey);
	}

	handleFilterSelectChanges(key, values)
	{
		const filters = this.props?.filterOptions;
		let keyWords = '';

		values?.forEach(filterID => 
		{
			filters?.forEach(filter => 
			{
				if (filterID === filter?.id)
				{
					keyWords += filter?.title + ' ';
				}
			});
		});

		this._isMounted && this.props?.search(keyWords);
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
					<div style={{direction:prefs?.dir}} className={`masterLayout-mainContainer t-${prefs?.theme}-bg-body`}>
						<div className={`masterLayout-bodyContainer`}>

							<div style={{backgroundImage: `url(${headerBackground})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}  className={` t-${prefs?.theme}-bg-header ${prefs?.dir}-header-rounded-bottom-trailing masterLayout-headerContainer`}>
								<Row>
									<Col xs={1}/>
									<Col xs={10}>
										<Row className={`m-0 p-0 align-items-center`}>
											{
												this.state?.tabs?.map((tab, index) => (
													<Link key={index} style={{zIndex: 100}} className="naked" to={tab?.route}>
														<CustomButton
															iconAndText={false}
															viewIsLoading={false}
															disabled={false}
															style={`
																pt-4 pb-3 px-3 
																${prefs?.dir}-rounded-bottom 
																${tab?.route === this.props.location.pathname ? `t-${prefs?.theme}-bg-accent ` : ''} 
																${tab?.route === this.props.location.pathname ? `${prefs?.theme === 'light' ? `t-${prefs?.theme}-text-alternative` : `t-${prefs?.theme}-text-primary` }` : prefs?.theme === 'light' ? `t-${prefs?.theme}-text-secondary` : `t-${prefs?.theme}-text-alternative`} 
																${prefs?.dir}-primaryFont text-center
															`}
															text={tab?.title}
														/>
													</Link>
												))
											}
										</Row>

										<Row className={`search-container t-${prefs?.theme}-bg-primary-highlight wrap mt-10 p-0 rounded-md`}>
											<Col xs={6} className={`search-column`}>
												<Row className={`pt-3 pb-3`}>
													<Col xs={1}>
														<img src={searchIcon} alt={this.i18n('common_search') + ' ' + this.i18n('common_image')} /> 
													</Col>

													<Col xs={1} className={``}>
														<input 
															className={`header-input borderless font-weight-bold ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative t-${prefs?.theme}-caret-color-accent font-md rounded-sm`} 
															type="text" 
															autoComplete="off" 
															placeholder={this.i18n('common_search')} 
															value={this.state.searchKey} 
															onChange={this.handleSearchChanges.bind(this)}
														/>                                    
													</Col>
												</Row>
											</Col>

											<Col xs={2} md={4} lg={4} xl={5} className={`filter-container search-column d-none d-md-block`}>
												<Row className={`pt-3 pb-3`}>
													<Col xs={1}>
														<img src={filterIcon} alt={this.i18n('common_filter') + ' ' + this.i18n('common_image')} /> 
													</Col>

													<Col xs={1} className={`dropdown-container`}>
														<SearchableDropdownMenu
															key={'id'}
															dir={prefs?.dir}
															theme={prefs?.theme}
															isSearchable={true}
															isMultiSelection={true}
															list={this.props?.filterOptions ?? []}
															menuPlaceholder={[this.i18n("common_filter")]}
															defaultMenuValue={[]}
															menuLabelKeys={["title"]}
															menuValueKey={"id"}
															filterKeys={["title"]}
															sortKey={"title"}
															onMenuMultiChange={this.handleFilterSelectChanges.bind(this, "id")}
														/>                               
													</Col>
												</Row>
											</Col>

											<Col xs={1} style={{zIndex:13}} className={`search-column`}>
												<CustomButton
													iconAndText={false}
													viewIsLoading={false}
													disabled={false}
													style={`
														p-3 mt-1
														rounded-sm
														t-${prefs?.theme}-bg-accent 
														${prefs?.dir}-primaryFont text-center
													`}
													text={this.i18n('action_search')}
													action={() => this.search()}
												/>
											</Col>
										</Row>
									</Col>
									<Col xs={1} className={`switch-wrapper-postion`}> 
										<span style={{transform: "rotate(90deg)"}} onClick={e => {this.handleThemeChange(prefs?.theme)}} className={`switch-wrapper switch-wrapper-${prefs?.dir}`}>
											<input
												type="checkbox"
												checked={prefs?.theme === 'light' ? false : true}
												disabled={false}
											/>
											<span className={`switch ${prefs?.theme === 'light' ? `t-${prefs?.theme}-bg-alternative` : `t-${prefs?.theme}-bg-primary-highlight` } `}>
												<span className="switch-handle" />
											</span>

										</span>
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
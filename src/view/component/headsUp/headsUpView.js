import View from '../../../core/view';

import { Row,Col} from 'reactstrap';
import {createRef} from "react";

import CustomButton from '../../component/button/customButton';
import SearchableDropdownMenu from "../searchableDropdownMenu/searchableDropdownMenu";

import Session from "../../../helper/session";

import "./headsUpView.scss";
export default class HeadsUpView extends View
{
	constructor(props)
	{
		super(props);
		this.state =
		{
            searchKey: '',
           
		}
		this._optionsDropdown = createRef(null);
    }

	handleChangeFristButton()
	{
		this._isMounted && this.props?.handleChangeFristButton();
	}

	fristFilterEvent(value)
    {
        this._isMounted && this.props?.fristFilterEvent(value);
    }

    secondFilterEvent(value)
    {
        this._isMounted && this.props?.secondFilterEvent(value);
    }

    thirdFilterEvent(value)
    {
        this._isMounted && this.props?.thirdFilterEvent(value);
    }

	setActiveTab(value,label)
    {
        this._isMounted && this.props?.setActiveTab(value,label);
    }

	firstButtonEvent()
	{
		this._isMounted && this.props?.firstButtonEvent()
	}

	handleSearchChanges(e)
	{
		this._isMounted && this.setState({...this.state, searchKey:e.target.value});
	}

	clearSearchResults()
	{
		document.getElementById("search").value = "";
		this._isMounted && this.setState({...this.state, searchKey:''});
		this._isMounted && this.props?.clearSearchResults();
	}
	
	searchForUsers()
	{
		this._isMounted && this.props?.searchForUsers(this.state?.searchKey);
	}

	toggleOptionsMainDropdownMenuSheet()
    {
        this._isMounted && this.props?.toggleOptionsMainDropdownMenuSheet();
	}

	handleChangeFristFilter(value)
    {
        this._isMounted && this.props?.handleChangeFristFilter(value);
    }
	
	
    render()
    {
		const prefs = Session.getPreferences();
        return (
			<div className={`pt-5 px-3 t-${prefs.theme}-bg-alternative-gray rounded-lg-right`}>
				<div className={`modalView-border-bottom t-${prefs.theme}-bb-alternative-with-alpha py-2`}>
					
					<div className={`p-0 m-0 d-flex justify-content-between align-items-center`}>
						<div className={`t-${prefs.theme}-text-alternative ${prefs?.dir}-primaryFont font-bold font-lg`}>
							{this.props?.title}
						</div>
						<div className={`p-0 m-0 align-items-center`}>
							<Row className={`p-0 m-0`}>
							<Col className={`p-0 m-0 d-none d-lg-block`}>
								<div className={`d-flex justify-content-end`}>
									{this.props?.shouldShowFristButton
									?
										<div className={`p-0 m-0 px-1 pt-2`}>
											<CustomButton
												iconAndText={true}
												viewIsLoading={false}
												disabled={false}
												icon={"Add"}
												style={`buttons-padding w-100 borderless nowrap t-${prefs?.theme}-text-primary-highlight ${prefs?.dir}-secondaryFont t-${prefs?.theme}-bg-accent font-md rounded-xs`}
												action={this.handleChangeFristButton.bind(this)}
											/>
										</div>
									:
										null
									}
									{this.props?.shouldShowFristFilter
									?
										<div className={`p-0 m-0 px-1 pt-2`}>
											<SearchableDropdownMenu 
												dir={prefs?.dir}
												theme={prefs?.theme} 
												shouldShowInput={false}
												isSearchable={false}
												list={this.props?.fristFilterList}
												menuPlaceholder={this.props?.placeholderFristFilter}
												defaultMenuValue={this.props?.fristFilterList?.[0].value}
												y_padding={3}
												menuLabelKeys={["label"]}
												menuValueKey={"value"}
												onMenuChange={this.handleChangeFristFilter.bind(this)}
											/>
										</div>
									:
										null
									}
								</div>
							</Col>	
							</Row>
						</div>
					</div>
					
					
				</div>
				
				
				
			</div>
        );
    }
}
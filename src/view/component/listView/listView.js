import View from '../../../core/view';

import { Table } from 'reactstrap';

import HeaderView from '../headsUp/headsUpView';
import ItemOfListView from "../ItemOfListView/ItemOfListView";
import LoadContent from '../loadContent/loadContent';
import SkeletonScreen from "../skeletonScreen/skeletonScreen";

import Session from "../../../helper/session";

import './listView.scss';

export default class ListView extends View
{
	constructor(props)
	{
		super(props)
	
		this.state = 
		{
			
		}

    }

    toggleOpanMainOpenDropdown()
    {
        this._isMounted && this.props?.toggleOpanMainOpenDropdown()
    }

    handleChangeMainDropdown(value,label)
    {
        this._isMounted && this.props?.handleChangeMainDropdown(value,label)
    }

    handleChangeFristFilter(value)
    {
        this._isMounted && this.props?.handleChangeFristFilter(value);
    }

    handleChangeSecondFilter(value)
    {
        this._isMounted && this.props?.handleChangeSecondFilter(value);
    }

    handleChangeThirdFilter(value)
    {
        this._isMounted && this.props?.handleChangeThirdFilter(value);
    }

    handleClickEvent(id)
    {
        this._isMounted && this.props?.handleClickEvent(id);
    }

    loadContent(type)
    {
        this._isMounted && this.props?.loadContent(type);
    }

    handleChangeFristButton()
	{
		this._isMounted && this.props?.handleChangeFristButton();
	}
    
    render()
    {
        const prefs = Session.getPreferences();		

        return (
			<div className={`h-100 position-relative`}>
                <div className={`w-100 listView-headerContainer t-bg-primary-highlight`}>
                    <HeaderView
                        shouldShowMainDropdown={this.props?.shouldShowMainDropdown}
                        isMainOpenDropdown={this.props?.isMainOpenDropdown}
                        mainLabel={this.props?.mainLabel}
                        listOfMainDropdown={this.props?.listOfMainDropdown}
                        title={this.props?.title}
                        shouldShowFristFilter={this.props?.shouldShowFristFilter}
                        shouldShowSecondFilter={this.props?.shouldShowSecondFilter}
                        shouldShowThirdFilter={this.props?.shouldShowThirdFilter}
                        shouldShowFristButton={this.props?.shouldShowFristButton}
                        placeholderFristFilter={this.props?.placeholderFristFilter}
					    placeholderSecondFilter={this.props?.placeholderSecondFilter}
                        placeholderThirdFilter={this.props?.placeholderThirdFilter}
                        placeholderFristButton={this.props?.placeholderFristButton}
                        fristFilterList={this.props?.fristFilterList}
                        secondFilterList={this.props?.secondFilterList}
                        thirdFilterList={this.props?.thirdFilterList}

                        handleChangeFristFilter={this.handleChangeFristFilter.bind(this)}
                        handleChangeSecondFilter={this.handleChangeSecondFilter.bind(this)}
                        handleChangeThirdFilter={this.handleChangeThirdFilter.bind(this)}
                        handleChangeFristButton={this.handleChangeFristButton.bind(this)}
                        toggleOpanMainOpenDropdown={this.toggleOpanMainOpenDropdown.bind(this)}
                        handleChangeMainDropdown={this.handleChangeMainDropdown.bind(this)}
                    />
                </div>
                
                    
                <div className={` h-100 listView-scrollingArea scrollable-y`}>
                    {this.props?.viewIsLoading 
                    ?
                        <>
                            <SkeletonScreen skeletonType={"table"}/>
                        </>
                    : 
                    
                        <Table responsive={true}>
                            <thead className={`t-text-alternative-highlight t-bg-alternative-with-alpha ${prefs?.dir}-primaryFont font-md`}>
                                <tr className={`border-bottom-table t-bb-primary-highlight`}>
                                    {this.props?.mainCol?.map((item, index) =>
                                    {
                                        return (
                                            <th key={index} className={`p-3 text-center ${item.isHidden? `d-none d-md-table-cell` : ``}`}>{item.title}</th>
                                        )
                                    })
                                    }
                                </tr>
                            </thead>
                            <tbody className={`${prefs?.dir}-secondaryFont`}>
                                {this.props?.items?.map((item, index) =>
                                {
                                    return (
                                        <ItemOfListView
                                            item={item}
                                            key={index}
                                            identifier={this.props?.identifier}
                                            listOfKeys={this.props?.listOfKeys}
                                            handleClickEvent={this.handleClickEvent.bind(this)}
                                        />
                                    )
                                })}
                            </tbody>
                        </Table>
                    }
                    
                </div>
                <div className={`listView-footerContainer t-bg-primary-highlight py-3 ${prefs?.dir}-secondaryFont font-sm t-text-alternative-highlight`}>
                    <LoadContent
                        pageNumber={this.props?.pageNumber}
                        itemFrom={this.props?.itemFrom}
                        itemTo={this.props?.itemTo}
                        numberOfItem={this.props?.numberOfItem}
                        loadContent={this.loadContent.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
import View from '../../../core/view';

import {ButtonDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import {Image} from "react-bootstrap";

import icon_chevronDown from "../../../assets/images/icon_chevronDown.png";

import './searchableDropdownMenu.scss';

export default class SearchableDropdownMenu extends View
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            searchKey: '',
            isMenuOpen: false
        }

        this._menuValues = props?.isMultiSelection ? (props?.defaultMenuValue !== null || props?.defaultMenuValue !== undefined) ? props.defaultMenuValue : [] : [];
        this._menuLabels = props?.isMultiSelection ? (props?.defaultMenuValue !== null || props?.defaultMenuValue !== undefined) ? this.findLabels(props?.defaultMenuValue, props?.list, props?.menuLabelKeys[0], props?.menuValueKey) : props?.menuPlaceholder ? props.menuPlaceholder : [] : [];
        this._menuValue = (props?.defaultMenuValue !== null || props?.defaultMenuValue !== undefined) ? props.defaultMenuValue : "";
        this._menuLabel = (props?.defaultMenuValue !== null || props?.defaultMenuValue !== undefined) ? this.findLabel(props?.defaultMenuValue, props?.list, props?.menuLabelKeys[0], props?.menuValueKey) : props?.menuPlaceholder ? props.menuPlaceholder : "";
        this._textValue = (props?.defaultTextValue !== null || props?.defaultTextValue !== undefined) ? props.defaultTextValue : "";
    }

    findLabel(key, list, labelKey, valueKey)
    {
        var val = "";
        for(var i of list)
        {
            if(i[valueKey] !== undefined && i[valueKey] !== null)
            {

                if((i[valueKey]?.toString()?.toUpperCase() === key?.toString()?.toUpperCase()))
                {
                    val = i[labelKey];
                }
            }
        }
        return val;
    }

    findLabels(key, list, labelKey, valueKey)
    {
        var val = [];
        for(var i of list)
        {
            if(i[valueKey] !== undefined && i[valueKey] !== null)
            {
                if(key?.includes(i[valueKey]?.toString()))
                {
                    val.push(i[labelKey]);
                }
            }
        }
        return val;
    }

    filterList(e)
    {
        this._isMounted && this.setState({...this.state, searchKey: e.target.value});
    }

    onTextChange(e)
    {
        this._textValue = e.target.value;
        this._isMounted && this.props?.onTextChange(e.target.value);
    }

    onMenuChange(value)
    {
        this._menuLabel = value?.[this.props?.menuLabelKeys[0]]
        this._menuValue = value?.[this.props?.menuValueKey];
        this._isMounted && this.setState({...this.state, isMenuOpen: !this.state.isMenuOpen});
        this._isMounted && this.props?.onMenuChange(this._menuValue);
    }

    onMenuMultiChange(value)
    {
        if(this._menuValues?.length > 0)
        {
            if(this._menuValues?.indexOf(value?.[this.props?.menuValueKey]) === -1)
            {
                this._menuLabels?.push(value?.[this.props?.menuLabelKeys[0]])
                this._menuValues?.push(value?.[this.props?.menuValueKey])
            }
            else
            {
                this._menuLabels?.splice(this._menuLabels?.indexOf(value?.[this.props?.menuLabelKeys[0]]), 1);
                this._menuValues?.splice(this._menuValues?.indexOf(value?.[this.props?.menuValueKey]), 1);
            }
        }
        else
        {
            this._menuLabels?.push(value?.[this.props?.menuLabelKeys[0]]);
            this._menuValues?.push(value?.[this.props?.menuValueKey]);
        }

        this._isMounted && this.setState({searchKey: ''});

        this._isMounted && this.props?.onMenuMultiChange(this._menuValues);
    }

    toggleDropDown()
    {
        this._isMounted && this.setState({...this.state, isMenuOpen: !this.state.isMenuOpen});
    }


    render()
    { 
        return (
            <div className={`m-0 p-0 ${this.props?.dir}`}>
                <ButtonDropdown className={``} direction="down" isOpen={this.state?.isMenuOpen} toggle={this.toggleDropDown.bind(this)}>
                    <DropdownToggle className={`p-0 m-0 rounded-xs font-md borderless pointer t-${this.props?.theme}-text-primary-highlight ${this.props?.colorOfDropdownMenu === "primary"? `t-${this.props?.theme}-bg-primary`:`t-${this.props?.theme}-bg-accent`}`} disabled={this.props?.viewIsLoading}>
                        <div className={`m-0 px-3 searchableDropdownMenu-Dropdownpadding d-flex justify-content-between align-items-center`}>
                            <div className={`nowrap`}>
                                {
                                    this._menuLabels?.length > 0 ? `${this._menuLabels?.map(item => `${item} `)}` : this._menuLabel ? `${this._menuLabel}` : this.props?.menuPlaceholder ? `${this.props?.menuPlaceholder}` : ""
                                }
                            </div>
                            <div className={`${this.props?.distanceBetweenArrowAndPlaceholder?this.props?.distanceBetweenArrowAndPlaceholder:`px-5`}`}/>
                            <div className={`d-flex align-items-center `}>
                                <Image
                                    src={icon_chevronDown}
                                    alt={"icon_chevronDown"}
                                    width={"9px"}
                                />
                            </div>
                        </div>
                    </DropdownToggle>    
                    <DropdownMenu className={`t-${this.props?.theme}-bg-alternative searchableDropdownMenu-dropdown custom-searchable-list-body ${this.props?.dir}-pull-to-leading font-sm`}>
                        <div>
                            {this.props?.list?.sort((a, b) => this.props?.sortType === "DESC" ? b?.[this.props?.sortKey]?.localeCompare((a?.name || a?.key)) : a?.[this.props?.sortKey]?.localeCompare(b?.name || b?.key)).map((item, index) => 
                            {
                                return (
                                    <div key={index} onClick={this.props?.isMultiSelection ? this.onMenuMultiChange.bind(this, item) : this.onMenuChange.bind(this, item)} className={`p-2 t-${this.props?.theme}-text-alternative ${this._menuValues?.includes(item[this.props?.menuValueKey]) ? 't-' + this.props?.theme + '-bg-accent' : 'null' } rounded-xs pointer t-${this.props?.theme}-hover-accent`}>{item?.[this.props?.menuLabelKeys[0]]} {item?.[this.props?.menuLabelKeys[1]] ? `(+${item?.[this.props?.menuLabelKeys[1]]})` : null}</div>
                                )
                            })} 
                        </div>
                    </DropdownMenu>   
                </ButtonDropdown> 
            </div>
        );
    }
}
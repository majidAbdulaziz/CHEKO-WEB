import View from '../../../core/view';

import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, Row, Container } from 'reactstrap';
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
                {this.props?.shouldShowInput
                ?
                    <Container className={`themed-container m-0 p-0`} fluid={true}>
                        <Row className={`m-0 p-0`}>
                            <Col className={`p-0 position-relative t-bg-secondary-highlight w-100`} xs={3} lg={2}>
                                <ButtonDropdown className={`h-100 w-100 p-0 m-0 t-bg-secondary-highlight ${this.props?.y_padding ? `${this.props?.y_padding}` : `py-3` } ${this.props?.x_padding ?`px-${this.props?.x_padding}`:``} p-0  ${this.props?.dir}-rounded-leading  ${this.props?.dir}-custom-modal-border ${this.state?.isMenuOpen  ? `${this.props?.dir}-custom-modal-active` : this.state.isMenuOpen ? `${this.props?.dir}-custom-modal-active` : null} `} direction="down" isOpen={this.state.isMenuOpen} toggle={this.toggleDropDown.bind(this)}>
                                    <DropdownToggle className={`m-0 p-0 naked searchableDropdownMenu-naked borderless ${this.props?.dir}-custom-searchable-list-toggler t-bg-primary font-sm not-scrollable`} disabled={this.props?.viewIsLoading}>
                                        <div className={`d-flex justify-content-center`}>
                                            <div className={`m-0 p-0 nowrap d-flex align-items-center t-${this.props?.theme}-text-primary-highlight px-2`}>
                                                {
                                                    this.props?.menuValueKey === "phone_code_iso"? `+${this._menuValue}` : this._menuLabels?.length > 0 ? `${this._menuLabels?.map(item => `${item} `)}` : this._menuLabel ? `${this._menuLabel}` : this.props?.menuPlaceholder ? `${this.props?.menuPlaceholder}` : ""
                                                }
                                            </div>
                                            <div className={`d-flex align-items-center ${this.props?.pe_paddingDropdown ? this.props?.pe_paddingDropdown : 'pe:0'}`}>
                                                <Image
                                                    src={icon_chevronDown}
                                                    alt={"icon_chevronDown"}
                                                    width={"9px"}
                                                />
                                            </div>
                                        </div>
                                    </DropdownToggle>    
                                    <DropdownMenu className={`${this.props?.dir} w-100 h-100 px-0 pt-0 outter-shadow custom-searchable-list-body -with-input ${this.props?.dir}-custom-searchable-list not-scrollable font-md rounded-sm`}>
                                        {this.props?.isSearchable 
                                        ?
                                            <div className={`${this.props?.theme === "light" ? 't-light-bg-exception t-light-bb-secondary' : `t-${this.props?.theme}-bg-primary t-${this.props?.theme}-bb-primary`} custom-searchable-list-search-input not-scrollable`}>
                                                <input className={`p-3 w-100 t-${this.props?.theme}-input borderless ${this.props?.theme === "light" ? 't-light-element' : `t-bg-primary`} t-${this.props.theme}-text-alternative t-caret-color-accent font-sm rounded-sm`} type="text" autoComplete="off" placeholder={this.i18n('formPlaceholder_typeToFilter')} value={this.state.searchKey} onChange={this.filterList.bind(this)}/>                                    
                                            </div>
                                        :
                                            null
                                        }
                                        <div className={`m-0 px-0 pt-1 ${this.props?.theme === "light" ? 't-light-bg-secondary' : `t-${this.props?.theme}-bg-primary`} t-${this.props?.theme}-text-primary-highlight custom-searchable-list-body font-sm scrollable-y`}>
                                            {this.props?.list?.filter((a) => this.state?.searchKey?.length === 0 || a?.[this.props?.filterKeys[0]]?.toLowerCase()?.includes(this.state?.searchKey.toLowerCase()) || a?.[this.props?.filterKeys[1]]?.toLowerCase()?.includes(this.state?.searchKey?.toLowerCase()))
                                                            .sort((a, b) => this.props?.sortType === "DESC" ? b?.[this.props?.sortKey]?.localeCompare((a?.name || a?.key)) : a?.[this.props?.sortKey]?.localeCompare(b?.name || b?.key))
                                                            .map((item, index) => 
                                            {
                                                return (
                                                    <DropdownItem key={index} onClick={this.props?.isMultiSelection ? this.onMenuMultiChange.bind(this, item) : this.onMenuChange.bind(this, item)} className={`p-2 t-${this.props?.theme}-text-primary-highlight py-2 ${this.props?.theme === "light" ? 't-light-bg-secondary t-light-hover-exception' : `t-${this.props?.theme}-bg-primary t-${this.props?.theme}-text-hover-accent`} ${this._menuValues?.indexOf(item?.[this.props?.menuValueKey]) === -1 ? `t-${this.props?.theme}-text-alternative`: `t-${this.props?.theme}-text-accent`}`}>{item?.[this.props?.menuLabelKeys[0]]} {item?.[this.props?.menuLabelKeys[1]] ? `(+${item?.[this.props?.menuLabelKeys[1]]})` : null}</DropdownItem>
                                                )
                                            })} 
                                        </div>
                                    </DropdownMenu>    
                                </ButtonDropdown>
                            </Col>
                        
                            <Col className={`p-0`}>
                                <input
                                    className={`t-${this.props?.theme}-input borderless w-100 ${this.props?.y_padding ? this.props?.y_padding : 'py-3'} px-lg-2 ${this.props?.theme === "light" ? 't-light-element' : `t-${this.props?.theme}-bg-primary`} t-${this.props?.theme}-text-primary-highlight t-${this.props?.theme}-caret-color-accent font-sm ${this.props?.dir}-rounded-trailing`}
                                    type="text"
                                    autoComplete="off"
                                    defaultValue={this.props?.defaultTextValue}
                                    placeholder={this.props?.placeholder}
                                    onChange={this.onTextChange.bind(this)}
                                />
                            </Col>
                       
                        </Row>
                    </Container>
                :
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
                        <DropdownMenu className={`searchableDropdownMenu-dropdown custom-searchable-list-body t-${this.props?.theme}-bg-primary ${this.props?.dir}-pull-to-leading font-sm`}>
                            <div className={``}>
                                {this.props?.list?.sort((a, b) => this.props?.sortType === "DESC" ? b?.[this.props?.sortKey]?.localeCompare((a?.name || a?.key)) : a?.[this.props?.sortKey]?.localeCompare(b?.name || b?.key)).map((item, index) => 
                                {
                                    return (
                                        <div key={index} onClick={this.props?.isMultiSelection ? this.onMenuMultiChange.bind(this, item) : this.onMenuChange.bind(this, item)} className={`p-2 t-${this.props?.theme}-text-primary-highlight rounded-xs pointer t-${this.props?.theme}-hover-secondary`}>{item?.[this.props?.menuLabelKeys[0]]} {item?.[this.props?.menuLabelKeys[1]] ? `(+${item?.[this.props?.menuLabelKeys[1]]})` : null}</div>
                                    )
                                })} 
                            </div>
                        </DropdownMenu>   
                    </ButtonDropdown> 
                            
                }
            </div>
        );
    }
}
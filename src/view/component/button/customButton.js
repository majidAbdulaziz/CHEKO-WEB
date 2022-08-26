import View from "../../../core/view";

import * as Icons from "react-ionicons";

import Session from "../../../helper/session";

export default class CustomButton extends View 
{

    action()
    {
        this._isMounted && this.props.action();
    }

    render() {
        let Icon = this.props?.icon ? Icons[this.props.icon] : "";
        const prefs = Session.getPreferences();
        return (
            <>
                <button
                    onClick={this.action.bind(this)}
                    className={this.props?.style}
                    disabled={this.props?.disabled}
                    id={this.props?.id}    
                >
                    {this.props?.viewIsLoading
                    ?
                        <div className="custom-spinner">
                            <div className={`custom-bounce1 t-${prefs?.theme}-bg-primary-highlight`}></div>
                            <div className={`custom-bounce2 t-${prefs?.theme}-bg-primary-highlight`}></div>
                            <div className={`custom-bounce3 t-${prefs?.theme}-bg-primary-highlight`}></div>
                        </div>                    
                    :
                        <>
                            {this.props?.iconAndText
                            ?
                                <>
                                    <p className={`m-0 px-0 px-lg-1 px-xl-0  ${Icon === "" ? 'd-inline-block' : ` d-sm-inline-block d-none`} `}>
                                        {this.props.text}
                                    </p>
                                    {Icon === ""
                                    ?
                                        null
                                    :
                                        <i className="m-0 p-0 px-1 d-inline-block">
                                            <Icon
                                                className={`t-${prefs?.theme}-text-alternative-higlight p-0 m-0`}
                                                height={this.props?.iconSize}
                                                width={this.props?.iconSize}
                                            />
                                        </i>
                                    }
                                </>
                            :
                            this.props?.text
                            ?
                            <p className={`p-0 nowrap`}>
                                {this.props?.text}
                            </p>
                            :
                                <i style={this.props?.iStyle} className={this.props?.iClasses}>
                                    <Icon
                                        className={this.props?.iconColor}
                                        height={this.props?.iconSize}
                                        width={this.props?.iconSize}
                                    />
                                </i>
                            }
                        </>
                    }
                </button>
            </>
        )
    }
}

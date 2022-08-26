import View from '../../../core/view';

import LoadingBar from "react-top-loading-bar";

import "./loadingBar.scss";

export default class LoadingTopBar extends View
{
       
    render()
    {
        return (
            <LoadingBar 
                height={3}
                color={`#e66948`}
                progress={this.props.val}
            />
        )
    }
}

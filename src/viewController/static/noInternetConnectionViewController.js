import ViewController from '../../core/viewController';
import FreeLayoutView from "../../view/layout/free/freeLayout";
import NoInternetConnectionView from "../../view/page/noInternetConnection/noInternetConnectionView.js"

export default class NoInternetConnectionViewController extends ViewController
{

    buttonAction()
    {
        this._isMounted && this.props?.buttonAction();
    }

	viewControllerDidMount()
    {
		this.setTitle("title_internalError");
	}

	render()
	{
		return(
			<FreeLayoutView>
				<NoInternetConnectionView buttonAction={this.buttonAction.bind(this)} />
			</FreeLayoutView>
		);
	}
}

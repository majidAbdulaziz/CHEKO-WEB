import ViewController from '../../core/viewController';

import FreeLayoutView from '../../view/layout/free/freeLayout';
import InternalErrorView from '../../view/page/internalError/internalErrorView';

export default class InternalErrorViewController extends ViewController
{


	viewControllerDidMount()
    {
		this.setTitle("title_internalError");
	}

	render()
	{
		return(
			<FreeLayoutView>
				<InternalErrorView/>
			</FreeLayoutView>
		);
	}
}

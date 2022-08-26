import ViewController from '../../core/viewController';

import FreeLayoutView from '../../view/layout/free/freeLayout';
import PageNotFoundView from '../../view/page/pageNotFound/pageNotFoundView';

export default class PageNotFoundViewController extends ViewController
{
	viewControllerDidMount()
    {
		this.setTitle("title_pageNotFound");
	}

	render()
	{
		return(
			<FreeLayoutView>
				<PageNotFoundView/>
			</FreeLayoutView>
		);
	}
}

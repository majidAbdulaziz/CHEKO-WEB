import ViewController from '../core/viewController';

import FreeLayoutView from '../view/layout/free/freeLayout';
import HomeView from '../view/page/home/homeView';

export default class HomeViewController extends ViewController
{

    constructor(props)
	{
		super(props);
		this.state =
		{
            categories:
            [
                {
                    id:1,
                    title: this.i18n('categories.breakfast'),
                    color: '#F4CBDF',
                    icon: 'icon_breakfast.png',
                    qunatity: 0
                },
                {
                    id:2,
                    title: this.i18n('categories.drinks'),
                    color: '#CDDFEC',
                    icon: 'icon_coffee.png',
                    qunatity: 0
                },
                {
                    id:3,
                    title: this.i18n('categories.soups'),
                    color: '#E7DEE3',
                    icon: 'icon_soup.png',
                    qunatity: 0
                },
                {
                    id:4,
                    title: this.i18n('categories.sushi'),
                    color: '#D1D1EF',
                    icon: 'icon_sushi.png',
                    qunatity: 0
                },
                {
                    id:5,
                    title: this.i18n('categories.orders'),
                    color: '#D0EAE3',
                    icon: 'icon_documents.png',
                    qunatity: 0
                },
            ],

            selectedCategory: 1
		}
	}

    chooseCategory(id)
    {
        this._isMounted && this.setState({selectedCategory: id});
    }

	viewControllerDidMount()
    {
		this._isMounted && this.setTitle("title_home");
	}

	render()
	{
		return(
                <HomeView 
                    categories={this.state?.categories}
                    chooseCategory={this.chooseCategory.bind(this)}
                    selectedCategory={this.state?.selectedCategory}
                />
		);
	}
}

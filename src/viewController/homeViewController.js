import ViewController from '../core/viewController';

import FreeLayoutView from '../view/layout/free/freeLayout';
import HomeView from '../view/page/home/homeView';

import MenuModel from '../model/menu';

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
            list: [],
            originalList: [],

            selectedCategory: 1
		}
	}

    getMenu()
    {
        this._isMounted && this.startLoading();
        this._isMounted && MenuModel?.getMenu()
        .then(response => 
        {
            this._isMounted && this.startLoading();

            if (response?.is_successful)
            {
                this._isMounted && this.setState({originalList: response?.Result}, () => 
                {
                    this._isMounted && this.setCountOfItemsInCategory(response?.Result);

                    this._isMounted && this.filterList(this.state?.categories?.filter(category => category?.id === this.state?.selectedCategory)[0]?.title);
                });
            }
            else
            {
                this._isMounted && this.showErrMsg(response?.error_msg, "error");
            }
        })
        .catch(e =>
        {
            this._isMounted && this.startLoading();
            this._isMounted && this.showErrMsg(this.i18n('error_generic'), "error");
        })
    }

    filterList(keyword)
    {
        const list = this.state?.originalList;
        let filteredList = [];

        list?.forEach(item =>
        {
            if (typeof item?.menuname === 'string' && (item?.menuname?.toLowerCase()?.includes(keyword?.toLowerCase()) || item?.description?.toLowerCase()?.includes(keyword?.toLowerCase())))
            {
                this._isMounted && filteredList.push(item);
            }
        });
        
        this._isMounted && this.setState({list: filteredList});
    }

    setCountOfItemsInCategory(list)
    {
        const categories = this.state?.categories;

        categories?.forEach(category =>
        {
            list?.forEach(item =>
            {
                if (typeof item?.menuname === 'string' && (item?.menuname?.toLowerCase()?.includes(category?.title?.toLowerCase()) || item?.description?.toLowerCase()?.includes(category?.title?.toLowerCase())))
                {
                    category.qunatity +=1;
                }
            })
        });

        this.setState({categories: categories});
    }

    chooseCategory(id)
    {
        this._isMounted && this.setState({selectedCategory: id});
        this._isMounted && this.filterList(this.state?.categories?.filter(category => category?.id === id)[0]?.title);
    }

    changeQuantity(id, action)
    {
        const menu = this.state?.list;
        let menuItem;

        menu?.forEach(item =>
        {
            if (item?._id === id)
            {
                menuItem = item;
            }
        });

        if (menuItem)
        {
            if (action === 'increase')
            {
                menuItem.qunatity = menuItem?.qunatity ? menuItem?.qunatity + 1 : 1;
            }
            else
            {
                menuItem.qunatity = menuItem?.qunatity ? menuItem?.qunatity - 1 : 0;
            }
        }
        
        if (menuItem?.qunatity < 0)
        {
            menuItem.qunatity = 0;
        }

        this._isMounted && this.setState({list: menu});
    }

	viewControllerDidMount()
    {
		this._isMounted && this.setTitle("title_home");
        this._isMounted && this.getMenu();
	}

	render()
	{
		return(
                <HomeView 
                    categories={this.state?.categories}
                    chooseCategory={this.chooseCategory.bind(this)}
                    selectedCategory={this.state?.selectedCategory}
                    changeQuantity={this.changeQuantity.bind(this)}
                    list={this.state?.list}
                />
		);
	}
}

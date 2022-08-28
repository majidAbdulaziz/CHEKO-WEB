import HTTP from '../helper/http';
import AppConfigs from '../config/appConfigs';

const MenuModel =
{
    getMenu: async function()
    {
        var url = AppConfigs?.apiBaseURL + 'v1/menu';

        return await HTTP.get(url, {}).then(response =>{return response;})
    }
}

export default MenuModel;
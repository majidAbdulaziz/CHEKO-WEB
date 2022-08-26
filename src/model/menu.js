import HTTP from '../helper/http';

const BalanceModel =
{
    
    recharge: async function(formData)
    {
        var url = 'https://admin.pup.a2hosted.com/balance/recharge';

        var postData = new FormData();
        Object.keys(formData)?.map(key => 
        {
            return formData[key] !== '' ? postData.append(key, formData[key]) : null ;
        });

        return await HTTP.post(url, postData).then(response =>{return response;})
    }
}

export default BalanceModel;
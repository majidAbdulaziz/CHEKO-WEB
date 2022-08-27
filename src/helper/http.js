import axios from "axios";

const HTTP = {
	post: function (url, postData)
	{
		return axios({
			method: "post",
			url: url,
			data: postData
		})
			.then(function(response){
				if (response.data !== undefined && response.data !== null)
				{
					if (response.data.is_successful === undefined)
					{
						response.data.is_successful = true;
					}
					
					return response.data;
				}
				else
				{
					return {
						is_successful: false,
						error_code: 1000,
						error_msg: "",
					};
				}
			})
			.catch(function (response){
				return {
					is_successful: false,
					error_code: 1000,
					error_msg: response,
				};
			});
	}
};

export default HTTP;

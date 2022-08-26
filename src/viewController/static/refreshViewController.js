import ViewController from "../../core/viewController";


export default class RefreshViewController extends ViewController
{   
    viewControllerDidMount()
    {
        this.props?.history?.go(-1);
    }
    
    render()
    {
       
        return (
            <>
            </>
        )
    }
}

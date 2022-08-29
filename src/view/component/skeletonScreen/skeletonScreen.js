import View from '../../../core/view.js';

import { Table} from 'reactstrap';


import Session from '../../../helper/session.js';


import './skeletonScreen.scss';

export default class SkeletonScreen extends View 
{
    render() 
    {
        const prefs = Session.getPreferences();
        return (
            <>
                {this.props.skeletonType === "table"
                ?
                    <Table responsive={true}>
                        
                    </Table>
                :
                    null
        }
        </>
        )
    }
}

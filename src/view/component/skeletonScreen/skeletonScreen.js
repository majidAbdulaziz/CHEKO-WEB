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
                        <thead className={` font-md`}>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <th className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                        </thead>
                        <tbody className={``}>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            <tr className={`border-bottom-table t-${prefs?.theme}-bb-alternative-highlight`}>
                                <td className={`p-4 skeletonSceen-blink t-${prefs?.theme}-bg-secondary`}/>
                            </tr>
                            
                        </tbody>
                    </Table>
                
                
                :
                    null
        }
        </>
        )
    }
}

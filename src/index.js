import "core-js/features/symbol";
import "core-js/features/object";
import "core-js/features/function";
import "core-js/features/parse-int";
import "core-js/features/parse-float";
import "core-js/features/number";
import "core-js/features/math";
import "core-js/features/string";
import "core-js/features/date";
import "core-js/features/array";
import "core-js/features/regexp";
import "core-js/features/map";
import "core-js/features/weak-map";
import "core-js/features/array/from";
import "core-js/features/array/flat";
import "core-js/features/set";
import "core-js/features/promise";
import "regenerator-runtime/runtime";
import "./helper/i18n";

import { Component, createRef } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import ReactNotification from 'react-notifications-component';


import MasterLayout from "./view/layout/master/masterLayout";
import PageNotFoundViewController from "./viewController/static/pageNotFoundViewController";
import InternalErrorViewController from "./viewController/static/internalErrorViewController";
import RefreshViewController from "./viewController/static/refreshViewController";

require('bootstrap/dist/css/bootstrap.min.css');
require("./assets/css/dir-ltr.scss");
require("./assets/css/dir-rtl.scss");
require("./assets/css/theme-light.scss");
require("./assets/css/theme-dark.scss");
require("./assets/css/global.scss");
require('react-notifications-component/dist/theme.css');

class App extends Component 
{
	
	constructor(props) 
	{
		super(props);

		this.state =
		{
			optionalModalData: {},
			activeModal: undefined
		}

		this._child = createRef();
		this._isMounted = false;
	}

	refreshSideMenu() 
	{
		this._isMounted && this.setState({ ...this.state, sideMenuKey: Math.random() });
	}

	toggleModal(action, activeModal, optionalData = {}) 
	{
		if (action.toLowerCase() === "open") {
			this._isMounted && this.setState({ ...this.state, activeModal: activeModal, optionalModalData: optionalData });
		}
		else if (action.toLowerCase() === "close") {
			this._isMounted && this.setState({ ...this.state, activeModal: undefined });
		}
		else { }
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return (
			<>
				<Switch>
					<Route exact path="/500" render={(props) => <InternalErrorViewController toggleModal={this.toggleModal.bind(this)} {...props} />} />
					<Route exact path="/404" render={(props) => <PageNotFoundViewController toggleModal={this.toggleModal.bind(this)} {...props} />} />
					<>		
						<MasterLayout
							sideMenuKey={this.state?.sideMenuKey}
							toggleModal={this.toggleModal.bind(this)}
						>
							
							<Switch>
								<Route exact path="/" render={() => { return ( <Redirect to="/overview" />) }}/>
								

								<Route path="/refresh/:page" render={(props) => <RefreshViewController {...props}/>}/>	
								<Route exact path="*" render={(props) => <PageNotFoundViewController toggleModal={this.toggleModal.bind(this)} {...props}/>}/> 
							</Switch>
						</MasterLayout>	
					</>
				</Switch>
			</>
		);
	}
}

export default render(
	<BrowserRouter>
		<ReactNotification />
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);

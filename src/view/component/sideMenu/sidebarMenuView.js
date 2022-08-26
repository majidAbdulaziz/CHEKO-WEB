import View from '../../../core/view';
import { withRouter } from 'react-router';

import { NavLink } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";
import { HomeOutline, CarOutline, PersonOutline, BagCheckOutline, NotificationsOutline,ReceiptOutline,SwapVerticalOutline,WalletOutline,ConstructOutline,LogOutOutline,LanguageOutline} from 'react-ionicons';

import Session from "../../../helper/session";

import "./sidebarMenuView.scss";

class SidebarMenuView extends View
{

	constructor(props) 
    {
        super(props)
    
        this.state = 
        {
            isNavMenuOpen: false,
            isBackDropVisible: false,
            isSwalOpen: false,
        }
    }

    render()
    {
		const prefs = Session.getPreferences();
		let menuItems =
		[
			{
				title: "overview" || "/",
				text: this.i18n('title_overview'),
				iconSidebar: this.props.location.pathname.match("/(.*)")[1].split("/")[0] === "overview" ? <HomeOutline className={`t-text-secondary-highlight`} cssClasses={`t-text-secondary-highlight`} height="23px" width="23px"/> : <HomeOutline className={`t-text-primary-highlight`} cssClasses={`t-text-primary-highlight`} height="23px" width="23px"/> ,
				is_active: 1
			},
			{
				title: "driver",
				text: this.i18n('title_driver'),
				iconSidebar: this.props.location.pathname.match("/(.*)")[1].split("/")[0] === "driver" ? <CarOutline className={`t-text-secondary-highlight`} cssClasses={`t-text-secondary-highlight`} height="23px" width="23px"/> : <CarOutline className={`t-text-primary-highlight`} cssClasses={`t-text-primary-highlight`} height="23px" width="23px"/>,
				is_active: Session.getUserInfo()?.roles?.includes("view_drivers") ? 1 :0
			},
			{
				title: "user",
				text: this.i18n('title_user'),
				iconSidebar: this.props.location.pathname.match("/(.*)")[1].split("/")[0] === "user" ? <PersonOutline className={`t-text-secondary-highlight`} cssClasses={`t-text-secondary-highlight`} height="23px" width="23px"/> : <PersonOutline className={`t-text-primary-highlight`} cssClasses={`t-text-primary-highlight`} height="23px" width="23px"/>,
				is_active: Session.getUserInfo()?.roles?.includes("view_users") ? 1 :0
			},
			{
				title: "order",
				text: this.i18n('title_order'),
				iconSidebar: this.props.location.pathname.match("/(.*)")[1].split("/")[0] === "order" ? <BagCheckOutline className={`t-text-secondary-highlight`} cssClasses={`t-text-secondary-highlight`} height="23px" width="23px"/>  : <BagCheckOutline className={`t-text-primary-highlight`} cssClasses={`t-text-primary-highlight`} height="23px" width="23px"/>,
				is_active: Session.getUserInfo()?.roles?.includes("view_orders") ? 1 :0
			},
			{
				title: "admin",
				text: this.i18n('title_admin'),
				iconSidebar: this.props.location.pathname.match("/(.*)")[1].split("/")[0] === "admin" ?<ConstructOutline className={`t-text-secondary-highlight`} cssClasses={`t-text-secondary-highlight`} height="23px" width="23px"/> : <ConstructOutline className={`t-text-primary-highlight`} cssClasses={`t-text-primary-highlight`} height="23px" width="23px"/>,
				is_active: Session.getUserInfo()?.roles?.includes("create_admins") ? 1 :0
			},
			{
				title: "settlement",
				text: this.i18n('title_coupon'),
				iconSidebar: this.props.location.pathname.match("/(.*)")[1].split("/")[0] === "settlement" ? <SwapVerticalOutline className={`t-text-secondary-highlight`} cssClasses={`t-text-secondary-highlight`} height="23px" width="23px"/> :<SwapVerticalOutline className={`t-text-primary-highlight`} cssClasses={`t-text-primary-highlight`} height="23px" width="23px"/>,
				is_active: Session.getUserInfo()?.roles?.includes("transfer_money_to_drivers") ? 1 :0
			},
			{
				title: "notifications",
				text: this.i18n('title_notifications'),
				iconSidebar: this.props.location.pathname.match("/(.*)")[1].split("/")[0] === "notifications" ? <NotificationsOutline className={`t-text-secondary-highlight`} cssClasses={`t-text-secondary-highlight`} height="23px" width="23px"/> : <NotificationsOutline className={`t-text-primary-highlight`} cssClasses={`t-text-primary-highlight`} height="23px" width="23px"/>,
				is_active: Session.getUserInfo()?.roles?.includes("create_push_notification") ? 1 :0
			},
			{
				title: "coupon",
				text: this.i18n('title_coupon'),
				iconSidebar: this.props.location.pathname.match("/(.*)")[1].split("/")[0] === "coupon" ? <ReceiptOutline className={`t-text-secondary-highlight`} cssClasses={`t-text-secondary-highlight`} height="23px" width="23px"/> : <ReceiptOutline className={`t-text-primary-highlight`} cssClasses={`t-text-primary-highlight`} height="23px" width="23px"/>,
				is_active: Session.getUserInfo()?.roles?.includes("create_coupon") ? 1 :0
			},
			{
				title: "reparation",
				text: this.i18n('title_coupon'),
				iconSidebar: this.props.location.pathname.match("/(.*)")[1].split("/")[0] === "reparation" ? <WalletOutline className={`t-text-secondary-highlight`} cssClasses={`t-text-secondary-highlight`} height="23px" width="23px"/> :<WalletOutline className={`t-text-primary-highlight`} cssClasses={`t-text-primary-highlight`} height="23px" width="23px"/>,
				is_active: Session.getUserInfo()?.roles?.includes("dd_user_balance") ? 1 :0
			},
		];

        return (
			<>
				<Row className={`p-0 m-0 h-100 t-text-alternative justify-content-center scrollable-y`} style={{overflowY:"hidden"}}>
					<Row className="align-content-start p-0 m-0">
						<Container className="themed-container p-0 py-0 m-0 w-100" fluid={true}>
							{
								menuItems?.filter(item => item.is_active === 1)
								?.map((path, index) =>
								{
									return (
										<NavLink className="naked" key={`${path.title}-${index}`} to={`/${path.title}`}>
											<div
												className=
												{
													(this.props.location.pathname.match("/(.*)")[1].split("/")[0] === path.title)
													? 
														`p-0 m-0 ${prefs?.dir}-sidebarMenu-item-active-collapse t-bg-primary-highlight t-text-secondary font-md pointer`
													:									
														`p-0 m-0 font-md pointer t-sidebarMenu-item-hover t-text-primary-highlight `
												}
											>
												<Row className="m-0 p-0 align-items-center">
													<Col
														xs={12}
														sm={12}
														md={12}
														lg={12}
														xl={12}
														className={
															(this.props.location.pathname.match("/(.*)")[1].split("/")[0] === path.title)
														?
															`p-0 text-center py-4 m-0  t-border-secondary`
														:
															`p-0 text-center py-4 m-0`
														}
													>
														<i className={`p-0 py-4 t-bb-secondary`}>
															{path.iconSidebar}
														</i>
													</Col>
												</Row>
											</div>
										</NavLink>
									)
								})
							}
							<div
								className=
								{
																		
										`p-0 m-0 font-md pointer t-sidebarMenu-item-hover t-text-primary-highlight `
								}
							>
								<Row className="m-0 p-0 align-items-center">
									<Col xs={12} className={`p-0 text-center py-3`} onClick={this.changeLanguage.bind(this)}
									>
										<i className={`p-0 py-4 t-bb-secondary`}>
											<LanguageOutline className={`t-text-primary-highlight`} cssClasses={`t-text-primary-highlight`} height="25px" width="25px"/> 
										</i>
									</Col>
								</Row>
							</div>
							<div
								className=
								{
																		
										`p-0 m-0 font-md pointer t-sidebarMenu-item-hover t-text-primary-highlight `
								}
							>
							<Row className="m-0 p-0 align-items-center">
								<Col xs={12} className={`p-0 text-center py-3`} onClick={this.logout.bind(this)}
								>
									<i className={`p-0 py-4 t-bb-secondary`}>
										<LogOutOutline className={`sidebarMenu-logout-button`} cssClasses={`sidebarMenu-logout-button`} height="25px" width="25px"/> 
									</i>
								</Col>
							</Row>
							</div>
							
								
						</Container>
						
					</Row>
				</Row>
			</>
		);
    }
}

export default withRouter(SidebarMenuView)
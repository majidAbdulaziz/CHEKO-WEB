import { Component } from 'react';

import i18next from "i18next";
import { store } from 'react-notifications-component';

import Session from '../helper/session';

export default class ModalController extends Component
{
    constructor(props)
	{
		super(props);

		this.state =
		{
            viewIsLoading:false,
		}

		this._isMounted = false;
	}

    i18n(key)
	{
        return i18next.t(key)
	}

    changeLanguage()
    {
        const lang = Session.getPreferences().lang === "ar" ? "en" : "ar" ;

        Session.setPreferences("lang", lang);

        window.location.reload();
    }

    openModal(activeModal)
    {
        if(this.props.toggleModal)
        {
            this.props.toggleModal('open', activeModal);
        }
    }

    closeModal(activeModal)
    {
        if(this.props.toggleModal)
        {
            this.props.toggleModal('close', activeModal);
        }
    }

    showErrMsg(message, type)
    {
        if(type === "success")
        {
            store.addNotification({
                title: this.i18n("msg_successful"),
                message: message? message : this.i18n('msg_changesSaved'),
                type: "success",
                insert: "top",
                container: Session?.getPreferences()?.dir === "rtl" ? "top-left" : "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  pauseOnHover:true
                }
              });
        }
        else if(type === "error")
        {
            if(message)
            {
                store.addNotification({
                    title: this.i18n("error_title"),
                    message: message,
                    type: "danger",
                    insert: "top",
                    container: Session?.getPreferences()?.dir === "rtl" ? "top-left" : "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 3000,
                      pauseOnHover:true
                    }
                  });
            }
        }
        else{}
    }

    startLoading()
    {
        this._isMounted && this.setState({...this.state, viewIsLoading : true});
    }

    stopLoading()
    {
        this._isMounted && this.setState({...this.state, viewIsLoading : false});
    }

	componentDidMount()
	{
		this._isMounted = true;

        if(this.modalControllerDidMount)
        {
            this._isMounted && this.modalControllerDidMount();
        }
    }    

    componentWillUnmount()
	{
		this._isMounted = false;

        if(this.modalControllerDidUnmount)
        {
            this._isMounted && this.modalControllerDidUnmount();
        }        
	}
}
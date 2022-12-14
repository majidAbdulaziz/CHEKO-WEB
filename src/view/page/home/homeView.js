import View from '../../../core/view';

import { Col, Row} from 'reactstrap';

import Session from '../../../helper/session';

import CategoryCard from '../../component/categoryCard/categoryCard';
import ProductCard from '../../component/productCard/productCard';
import EmptySate from '../../component/emptyState/emptyState';
import SkeletonScreen from '../../component/skeletonScreen/skeletonScreen';

import './homeView.scss';

export default class HomeView extends View
{
    chooseCategory(id)
    {
        this._isMounted && this.props?.chooseCategory(id);
    }

    changeQuantity(id, action)
    {
        this._isMounted && this.props?.changeQuantity(id, action);
    }

    toggleModal(action, activeModal, optionalData)
    {
        this._isMounted && this.props?.toggleModal(action, activeModal, optionalData);
    }

    render()
    {  
        const prefs = Session.getPreferences();

        return (
            <Col style={{direction:prefs?.dir}} className={`home-scrollable m-0 p-0 h-100 w-100 t-${prefs?.theme}-bg-body text-center`}>
                <Row className={`home-main-container-${prefs?.dir} pt-15`}>
                    <Col xs={10}>
                        <Row className={`wrap ${prefs?.dir}`}>
                            {
                                this.props?.categories?.map(category => (
                                    <CategoryCard 
                                        key={category?.id} 
                                        category={category} 
                                        selectedCategory={this.props?.selectedCategory} 
                                        chooseCategory={this.chooseCategory.bind(this)} 
                                    />
                                ))
                            }
                        </Row>

                        <Row className={`wrap mt-5`}>
                            <Col xs={2} className={`${prefs?.dir} category-text ${prefs?.dir}-primaryFont t-${prefs?.theme}-text-alternative font-xl font-weight-bold`}>
                                {this.props?.categories?.filter(category => category?.id === this.props?.selectedCategory)[0]?.title ?? this.props?.searchKeyWord}
                            </Col>
                            <Col xs={10} className={`category-border`} />
                        </Row>

                        {
                            (!this.props?.viewIsLoading && this.props?.list?.length === 0)
                            ?
                                <EmptySate 
                                    shouldShowIcon
                                    icon={'Document'}
                                    text={this.i18n('common_noResults')}
                                />
                            :
                                (this.props?.viewIsLoading)
                                ?
                                    <Row className={`wrap mt-5`}>
                                        <SkeletonScreen skeletonType={'product'} />
                                        <SkeletonScreen skeletonType={'product'} />
                                        <SkeletonScreen skeletonType={'product'} />
                                        <SkeletonScreen skeletonType={'product'} />
                                    </Row>
                                :
                                    <Row className={`wrap mt-5`}>
                                        {
                                            this.props?.list?.map((item, index) => (
                                                <ProductCard 
                                                    key={item?._id} 
                                                    item={item} 
                                                    index={index} 
                                                    changeQuantity={this.changeQuantity.bind(this)} 
                                                    toggleModal={this.toggleModal.bind(this, "open", 'productModal')}
                                                />
                                            ))
                                        }
                                    </Row>
                        }

                    </Col>
                </Row>
            </Col>
        );
    }
}
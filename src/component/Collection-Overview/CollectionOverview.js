import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PreviewCollection from '../Preview-Collection/PreviewCollection'
import './CollectionOverview.scss'
import { selectionCollectionsForPreview } from '../../redux/shop/shop.selector'


const CollectionOverview = ({ collections }) => {
    return (
        <div className="collections-overview">
        {
        collections.map(({id, ...otherCollectionProps}) => (
            <PreviewCollection key= {id} {...otherCollectionProps} />
        ))
        } 
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    collections: selectionCollectionsForPreview
})


export default connect(mapStateToProps)(CollectionOverview)

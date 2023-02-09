const mongoose = require('mongoose');






const Products = mongoose.model('product',{
    pipUrl: String,
        imageUrl: String,
        imageAlt: String,
        name: String,
        typeName: String,
        itemMeasureReferenceText: String,
        mainImageUrl: String,
        mainImageAlt: String,
        contextualImageUrl: String,
        itemType: String,
        salesPrice: {
          currencyCode: String,
          numeral: Number,
          },
        about: String,
})




module.exports = Products
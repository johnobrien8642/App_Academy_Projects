const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema

const AbodeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  coordinates: {
    type: String,
    required: false,
    unique: true
  },
  gods: [
    {
      type: Schema.Types.ObjectId,
      ref: 'god'
    }
  ]
})

AbodeSchema.statics.updateAbode = function(id, name, coordinates) {
  const Abode = mongoose.model('abode')
  Abode.findById({ _id: id })
}

module.exports = mongoose.model('abode', AbodeSchema)
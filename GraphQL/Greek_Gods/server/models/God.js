const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema

const GodSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  domains: [
    {
      type: String,
    }
  ],
  abode: {
    type: Schema.Types.ObjectId,
    ref: 'abode'
  },
  emblems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'emblem'
    }
  ],
  parents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'god'
    }
  ],
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: 'god'
    }
  ],
  siblings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'god'
    }
  ]
})

GodSchema.statics.findRelatives = function(godId, type) {
  return this.findById(godId)
    .populate(`${type}`)
    .then(god => god[type])
}

GodSchema.statics.addRelative = function(godId, relativeId, relationship) {
  const God = mongoose.model('god');
  God.find({
    _id: { $in: [godId, relativeId] }
  })
  .then(gods => {
    const god = godId === gods[0].id ? gods[0] : gods[1];
    const relative = relativeId === gods[0].id ? gods[0] : gods[1];

    switch (relationship) {
      case 'parent':
        god.parents.push(relative)
        relative.children.push(gods)
        break
      case 'child':
        god.children.push(relative);
        relative.parents.push(god);
        break;
      case 'sibling':
        god.siblings.push(relative);
        relative.siblings.push(god);
        break;
    }

    return Promise.all([god.save(), relative.save()]).then(
      ([god, relative]) => god
    )
  })
}

GodSchema.statics.removeRelative = function(godId, relativeId, relationship) {
  const God = mongoose.model('god');
  God.find({
    _id: { $in: [godId, relativeId] }
  })
  .then(gods => {
    const god = godId === gods[0].id ? gods[0] : gods[1];
    const relative = relativeId === gods[0].id ? gods[0] : gods[1];
    switch (relationship) {
      case 'parent':
        god.parents.forEach((parentId, i) => {
          if (parentId == relative.id) {
            god.parents.splice(i, 1);
          }
        });
        relative.children.forEach((childId, i) => {
          if (childId == god.id) {
            relative.children.splice(i, 1);
          }
        });
        break
      case 'child':
        god.children.forEach((childId, i) => {
          if (childId == relative.id) {
            god.children.splice(i, 1);
          }
        })
        relative.parents.forEach((parentId, i) => {
          if (parentId == god.id) {
            relative.parents.splice(i, 1);
          }
        })
        break;
      case 'sibling':
        god.siblings.forEach((siblingId, i) => {
          if (siblingId == relative.id) {
            god.siblings.splice(i, 1); 
          }
        })
        relative.siblings.forEach((godId, i) => {
          if (godId == god.id) {
            relative.siblings.splice(i, 1);
          }
        });
        break;
    }

    return Promise.all([god.save(), relative.save()]).then(
      ([god, relative]) => god
    )
  })
}

GodSchema.statics.addEmblem = function(godId, emblemId) {
  const God = mongoose.model('god');
  const Emblem = mongoose.model('emblem');
  
  God.find({ _id: godId }).then(gods => {
    const god = gods[0]
    return god
  }).then(god => {
    Emblem.find({ _id: emblemId }).then(emblems => {
      const emblem = emblems[0]
      god.emblems.push(emblem)
      emblem.gods.push(god)
      
      return Promise.all([god.save(), emblem.save()]).then(
        ([god, relative]) => god
      )
    })
  })
}

GodSchema.statics.removeEmblem = function(godId, emblemId) {
  const God = mongoose.model('god');
  const Emblem = mongoose.model('emblem');
  
  God.find({ _id: godId }).then(gods => {
    const god = gods[0]
    return god
  }).then(god => {
    Emblem.find({ _id: emblemId }).then(emblems => {
      const emblem = emblems[0]
      god.emblems.forEach((emblemId, i) => {
        if (emblemId == emblem.id) {
          god.emblems.splice(i, 1)
        }
      })
      emblem.gods.forEach((godId, i) => {
        if (godId == god.id) {
          emblem.gods.splice(i, 1)
        }
      })
      
      return Promise.all([god.save(), emblem.save()]).then(
        ([god, relative]) => god
      )
    })
  })
}

GodSchema.statics.updateAbode = function(godId, newAbodeId) {
  const God = mongoose.model('god');
  const Abode = mongoose.model('abode');

  God.findById({ _id: godId }).then(god => {
    Abode.find({ _id: { $in: [newAbodeId, god.abode]} 
    })
    .then(abodes => {
      const newAbode = newAbodeId === abodes[0].id ? abodes[0] : abodes[1];
      const oldAbode = god.abode == abodes[0].id ? abodes[0] : abodes[1];
      
      if (typeof oldAbode !== 'undefined') {
        oldAbode.gods.forEach((oldGod, i) => {
          if (oldGod == godId) {
            oldAbode.gods.splice(i, 1);
            oldAbode.save();
          }
        })
      }

      newAbode.gods.push(god)

      god.abode = { _id: newAbode.id };
            
      return Promise.all([god.save(),newAbode.save()]).then(
        ([god, newAbode]) => console.log('Abode update successful')
      )
    })
  })
}
module.exports = mongoose.model('god', GodSchema)
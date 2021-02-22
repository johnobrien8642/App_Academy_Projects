const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, 
        GraphQLInt, GraphQLID, GraphQLNonNull, 
        GraphQL, GraphQLList } = graphql;
const mongoose = require('mongoose');
const God = mongoose.model('god');
const Abode = mongoose.model('abode');
const Emblem = mongoose.model('emblem');
const GodType = require('./god_type');
const AbodeType = require('./abode_type');
const EmblemType = require('./emblem_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    newGod: {
      type: GodType,
      args: {
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parentValue, { name, type, description }) {
        return new God({ name, type, description }).save();
      }
    },
    updateGod: {
      type: GodType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve(parentValue, { id, name, type, description }) {
        const updateObj = {};

        updateObj.id = id;
        if (name) updateObj.name = name;
        if (type) updateObj.type = type;
        if (description) updateObj.description = description;
        return God.findOneAndUpdate(
          { _id: id }, 
          { $set: updateObj }, 
          { new: true }, 
          (err, god) => {
            return god
          }
        )
      }
    },
    deleteGod: {
      type: GodType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) }},
      resolve(parentValue, { id }) {
        return God.findById(id).deleteOne();
      }
    },
    addGodRelative: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        relativeId: { type: GraphQLID },
        relationship: { type: GraphQLString }
      },
      resolve(parentValue, { godId, relativeId, relationship }) {
        return God.addRelative(godId, relativeId, relationship);
      }
    },
    removeGodRelative: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        relativeId: { type: GraphQLID },
        relationship: { type: GraphQLString }
      },
      resolve(parentValue, { godId, relativeId, relationship }) {
        return God.removeRelative(godId, relativeId, relationship);
      }
    },
    addGodEmblem: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        emblemId: { type: GraphQLID }
      },
      resolve(parentValue, { godId, emblemId }) {
        return God.addEmblem(godId, emblemId)
      }
    },
    removeGodEmblem: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        emblemId: { type: GraphQLID }
      },
      resolve(parentValue, { godId, emblemId }) {
        return God.removeEmblem(godId, emblemId)
      }
    },
    updateGodAbode: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        newAbodeId: { type: GraphQLID }
      },
      resolve(parentValue, { godId, newAbodeId }) {
        return God.updateAbode(godId, newAbodeId)
      }
    },
    addGodDomain: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        newDomain: { type: GraphQLString }
      },
      resolve(parentValue, { godId, newDomain }) {
        God.findById(godId).then(god => {
          god.domains.push(newDomain)
          god.save()
        })
      }
    },
    removeGodDomain: {
      type: GodType,
      args: {
        godId: { type: GraphQLID },
        removeDomain: { type: GraphQLString }
      },
      resolve(parentValue, { godId, removeDomain }) {
        God.findById(godId).then(god => {
          god.domains.forEach((domain, i) => {
            if (domain == removeDomain) {
              god.domains.splice(i, 1);
            }
          })
          god.save()
        })
      }
    },
    newAbode: {
      type: AbodeType,
      args: {
        name: { type: GraphQLString },
        coordinates: { type: GraphQLString },
        gods: { type: new GraphQLList(GraphQLID) }
      },
      resolve(parentValue, { name, coordinates, gods }) {
        God.find({ _id: { $in: gods }}).then(gods => {
          const abode = new Abode({name: name, coordinates: coordinates, gods: gods})
            gods.forEach((god, i) => {
              god.abode = { _id: abode.id };
              god.save();
            })
            abode.save();
        })
      }
    },
    deleteAbode: {
      type: AbodeType,
      args: {
        abodeId: { type: GraphQLID }
      },
      resolve(parentValue, { abodeId }) {
        Abode.findOneAndDelete({ _id: abodeId }).then(abode => abode)
      }
    },
    updateAbode: {
      type: AbodeType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        coordinates: { type: GraphQLString },
      },
      resolve(parentValue, { id, name, coordinates }) {
        const updateObj = {};

        updateObj.id = id;
        if (name) updateObj.name = name;
        if (coordinates) updateObj.coordinates = coordinates;
        return Abode.findOneAndUpdate(
          { _id: id }, 
          { $set: updateObj }, 
          { new: true },
          (err, abode) => {
            return abode
          }
        )
      }
    },
    newEmblem: {
      type: EmblemType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parentValue, { name, gods }) {
        const emblem = new Emblem({ name: name })
        emblem.save();
      }
    }, 
    updateEmblem: {
      type: EmblemType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
      },
      resolve(parentValue, { id, name }) {
        const updateObj = {};

        updateObj.id = id;
        if (name) updateObj.name = name;
        return Emblem.findOneAndUpdate(
          { _id: id },
          { $set: updateObj },
          { new: true },
          (err, emblem) => {
            return emblem
          }
        )
      }
    },
    deleteEmblem: {
      type: EmblemType,
      args: {
        emblemId: { type: GraphQLID }
      },
      resolve(parentValue, { emblemId }) {
        Emblem.findOneAndDelete({ _id: emblemId }).then(emblem => emblem)
      }
    }
  }
});

module.exports = mutation;
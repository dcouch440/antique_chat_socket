const { Model } = require('objection');

class Antique extends Model {
  static get tableName () {
    return 'antique';
  }
  static get relationMappings () {
    const User = require('../user/user.model');

    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'antique.user_id',
          to: 'user.id',
        },
      }
    };
  }
}

module.exports = Antique;
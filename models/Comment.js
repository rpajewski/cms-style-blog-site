const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

// comment Model
class Comment extends Model {

}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'user',
                key: 'id'
            }
        },
        blog_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'blog',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
)

module.exports = Comment
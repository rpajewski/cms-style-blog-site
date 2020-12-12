import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/connection'

// blog Model
class Blog extends Model {

}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'username'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog'
    }
)

module.exports = Blog
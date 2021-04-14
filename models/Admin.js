

module.exports = (sequelize, DataTypes) =>{
    const Admin = sequelize.define("Admin",{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        reset_id: {
            type: DataTypes.STRING,
            unique: true,
        },
    });
    return Admin
}
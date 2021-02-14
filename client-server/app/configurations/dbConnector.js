import { Sequelize } from 'sequelize';

export class DbConnector {
    sequelize = null;

    static getSequelize() {
        this.sequelize = this.sequelize || new Sequelize('task_manager', 'root', 'root', {
            host: 'localhost',
            dialect: 'mysql'
        });
        
        return this.sequelize;
    }
    
    static async connect() {
        try {
            await this.getSequelize().authenticate();
            console.log('Connection to database has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    static async disconnect() {
        await this.sequelize.close();   // getSequelize()?
        console.log("Connection to database had been closed");
    }
}
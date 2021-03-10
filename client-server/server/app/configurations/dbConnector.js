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
            console.log('Server: connection has been established successfully.');
            return true;
        }
        catch (error) {
            console.error('Server: unable to connect to the database:', error);
            return false;
        }
    }

    static async disconnect() {
        await this.sequelize.close();
        console.log("Server: connection had been closed");
    }
}
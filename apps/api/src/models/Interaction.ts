import { sequelize } from '../service/sequelize';
import { DataTypes } from 'sequelize';
import { Agent } from './Agent';

export const Interaction = sequelize.define(
  'Interaction',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    agent_id: {
      type: DataTypes.INTEGER,
    },
    customer_id: {
      type: DataTypes.INTEGER,
    },
    length_seconds: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  }
);

Interaction.belongsTo(Agent, { foreignKey: 'agent_id' });

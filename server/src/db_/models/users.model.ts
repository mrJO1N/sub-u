import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  emailIsVerified: boolean;

  @Column()
  password: string;

  @Column({ default: "USER" })
  role: string;
}

/*

id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  unique: true,
},
name: { type: DataTypes.STRING, unique: true },
email: { type: DataTypes.STRING, unique: true },
emailIsVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
password: { type: DataTypes.STRING },
role: { type: DataTypes.STRING, defaultValue: "USER" },

*/

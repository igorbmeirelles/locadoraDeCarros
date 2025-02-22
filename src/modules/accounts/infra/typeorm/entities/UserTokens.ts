import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from "uuid";

@Entity('users_token')
class UserTokens {

  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  expires_date: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { UserTokens };
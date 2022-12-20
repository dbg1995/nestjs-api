import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';

import { SHORT_LENGTH } from '../../../constant/common.constant';

export type UserRecord = Pick<UserEntity, 'id' | 'role' | 'name' | 'avatar'>;

@Entity('users')
export class UserEntity {
  static readonly ROLE_ADMIN = 'admin';
  static readonly ROLE_USER = 'user';
  static readonly STATUS_ACTIVE = 'active';
  static readonly STATUS_DISABLE = 'disable';

  @PrimaryGeneratedColumn('increment')
  id: number;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt: Date;

  @Column({ type: 'varchar', nullable: true, length: SHORT_LENGTH })
  role: string;

  @Column({ type: 'varchar', nullable: true, length: SHORT_LENGTH })
  name: string;

  @Column({ type: 'varchar', nullable: true, length: SHORT_LENGTH })
  avatar: string;

  @Column({ type: 'varchar', nullable: true, length: SHORT_LENGTH, default: UserEntity.STATUS_ACTIVE })
  status: string;
}

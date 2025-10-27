import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

export type UserRole = 'superadmin' | 'usuario';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text', 
        unique: true ,
        nullable: false
    })
    email: string;

    @Column({
        type: 'text',
        nullable: false
    })
    password: string;

    @Column({
        type: 'text',
    })
    fullname: string;
    
    @Column({
        type: 'enum', 
        enum: ['superadmin', 'usuario'],
        default: 'usuario'
    })
    role: UserRole;

    @Column ({
        type: 'boolean',
        default: true
    })
    isActive: boolean;

    @OneToMany(() => Project, (project) => project.user)
    projects: Project[];

    @DeleteDateColumn()
    deletedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

}

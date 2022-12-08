import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
  
@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;
  
    @Column({ unique: true })
    email: string;

    @Column()
    phone: string;

    @Column({ unique: true })
    cpf: string;

    @Column()
    role: 'Admin' | 'Editor' | 'Tutor' | 'Ong';

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    deleted_at: Date;

    @BeforeInsert()
    generatedId() {
        if (this.id) {
            return;
        }
  
        this.id = uuidv4();
    }
}

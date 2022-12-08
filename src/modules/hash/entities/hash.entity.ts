import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
  
@Entity('user_tokens')
export class Hash {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    hash: string;

    @Column({ nullable: true})
    hashed_rt: string;

    @Column()
    role: 'Admin' | 'Editor' | 'Tutor' | 'Ong';

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    generatedId() {
        if (this.id) {
            return;
        }
  
        this.id = uuidv4();
    }
}

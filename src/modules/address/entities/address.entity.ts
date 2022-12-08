import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
  
@Entity('address')
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    state: string;
  
    @Column()
    city: string;

    @Column()
    district: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    zipcode: string;

    @Column()
    complement: string;

    @Column()
    usersId: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    deleted_at: Date;

    @BeforeInsert()
    generatedId() {
        if (this.id) {
            return;
        }
  
        this.id = uuidv4();
    }
}

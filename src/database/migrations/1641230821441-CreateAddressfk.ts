import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateAddressfk1641230821441 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'address',
      new TableForeignKey({
        columnNames: ['usersId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('address', 'usersId');
  }
}

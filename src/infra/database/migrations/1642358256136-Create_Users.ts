import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1642358256136 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            isNullable: false,
            default: `uuid_generate_v4()`
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false
          },
          {
            name: 'avatar_url',
            type: 'varchar',
            length: '255',
            isNullable: true
          },
          {
            name: 'username',
            type: 'varchar',
            length: '25',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false
          },
          {
            name: 'email_verified',
            type: 'boolean',
            default: false,
            isNullable: false
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['USER', 'ADMIN'],
            enumName: 'rolesEnum',
            isNullable: false
          },
          {
            name: 'permissions',
            type: 'varchar[]',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
    await queryRunner.query('DROP EXTENSION "uuid-ossp"')
  }
}

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateGenerationStrategeyOnProviderIdField1609097945667
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.changeColumn(
      'appointments',
      'provider_id',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'appointments',
      'provider_id',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      }),
    );
  }
}

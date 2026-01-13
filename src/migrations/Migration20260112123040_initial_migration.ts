import { Migration } from '@mikro-orm/migrations';

export class Migration20260112123040_initial_migration extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`hero\` (\`uuid\` varchar(255) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`header_one\` varchar(35) not null, \`header_two\` varchar(30) not null, \`description\` varchar(150) not null, primary key (\`uuid\`)) default character set utf8mb4 engine = InnoDB;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`hero\`;`);
  }

}

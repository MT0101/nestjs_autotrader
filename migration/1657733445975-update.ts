import { MigrationInterface, QueryRunner } from "typeorm";

export class update1657733445975 implements MigrationInterface {
    name = 'update1657733445975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ad\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(50) NOT NULL, \`make\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`year\` varchar(255) NOT NULL, \`fuelType\` varchar(255) NOT NULL, \`mileage\` int NOT NULL, \`power\` int NOT NULL, \`defective\` tinyint NOT NULL, \`accidentFree\` tinyint NOT NULL, \`details\` varchar(1000) NOT NULL, \`price\` float(8,2) NOT NULL, \`photoFn\` varchar(255) NULL, \`voivodeship\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`views\` int NOT NULL, \`createdAt\` datetime NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(50) NOT NULL, \`email\` varchar(255) NOT NULL, \`pwdHash\` varchar(255) NOT NULL, \`currentTokenId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ad\` ADD CONSTRAINT \`FK_9ef75c41971255cd79702c9048a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ad\` DROP FOREIGN KEY \`FK_9ef75c41971255cd79702c9048a\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`ad\``);
    }

}

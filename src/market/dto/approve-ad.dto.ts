import { IsBoolean } from 'class-validator';

export class ApproveAdDto {
  @IsBoolean()
  approved: boolean;
}

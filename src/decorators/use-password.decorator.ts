import { SetMetadata } from "@nestjs/common";

export const UsePassword = (pass: string): any => {
    SetMetadata('passwordProtectGoodPassword', pass);
}
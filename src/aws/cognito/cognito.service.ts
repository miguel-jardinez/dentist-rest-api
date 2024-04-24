import { Injectable } from '@nestjs/common';

import { EnvConfigService } from '@core/env-config/env-config.service';
import { CognitoServiceInterface } from './cognito.service.interface';
import { AwsRegisterDto } from './dto/aws.register.dto';
import { ResponseApi } from '@utils/ResponseApi';
import { AwsLoginDto } from './dto/aws.login.dto';
import { SignUpResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { SecretHashService } from '../secret-hash/secret-hash.service';
import { UserRole } from '@utils/RoleEnum';

@Injectable()
export class CognitoService implements CognitoServiceInterface {
  private readonly cognitoAuthProvider: CognitoIdentityProviderClient;

  constructor(
    private readonly envConfigService: EnvConfigService,
    private readonly secretHashService: SecretHashService,
  ) {
    this.cognitoAuthProvider = new CognitoIdentityProviderClient({
      region: envConfigService.getString('AWS_REGION'),
    });
  }

  async registerUser(
    awsRegisterDto: AwsRegisterDto,
  ): Promise<ResponseApi<SignUpResponse>> {
    const { email, password } = awsRegisterDto;

    const request = new SignUpCommand({
      ClientId: this.envConfigService.getString('AWS_CLIENT_ID'),
      Username: email,
      Password: password,
      SecretHash: this.secretHashService.awsHashSecret(email),
      UserAttributes: [
        { Name: 'email', Value: email },
      ],
    });

    try {
      const response = await this.cognitoAuthProvider.send(request);
      return new ResponseApi(response, true, Date());
    } catch (e: any) {
      console.log(e);
    }
  }

  async authenticateUser(awsAuthLoginDto: AwsLoginDto): Promise<any> {
    const { email, password } = awsAuthLoginDto;

    const request = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        SECRET_HASH: this.secretHashService.awsHashSecret(email),
        USERNAME: email,
        PASSWORD: password,
      },
      ClientId: this.envConfigService.getString('AWS_CLIENT_ID'),
    });

    try {
      const data = await this.cognitoAuthProvider.send(request);
      const response = new ResponseApi(data, true, Date());

      console.log(response);
    } catch (e: any) {
      console.log(e);
    }
  }
}

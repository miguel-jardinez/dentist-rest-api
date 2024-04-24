import { AwsRegisterDto } from './dto/aws.register.dto';
import { ResponseApi } from '@utils/ResponseApi';
import { CognitoUserSession, ISignUpResult } from 'amazon-cognito-identity-js';
import { AwsLoginDto } from './dto/aws.login.dto';
import { SignUpResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';

export interface CognitoServiceInterface {
  registerUser: (
    awsRegisterDto: AwsRegisterDto,
  ) => Promise<ResponseApi<SignUpResponse>>;

  authenticateUser: (awsAuthLoginDto: AwsLoginDto) => Promise<any>;
}

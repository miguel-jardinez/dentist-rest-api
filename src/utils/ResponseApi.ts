import { ApiProperty } from '@nestjs/swagger';

export class ResponseApi<T> {
  public data: T;

  @ApiProperty({
    description: 'Indicates whether the API call was successful.',
    type: Boolean,
  })
  public success: boolean;

  @ApiProperty({
    description: 'The date and time the response was generated.',
    type: String,
    format: 'date-time',
  })
  public date: string;

  constructor(data: T, success: boolean, date: string) {
    this.data = data;
    this.success = success;
    this.date = date;
  }
}

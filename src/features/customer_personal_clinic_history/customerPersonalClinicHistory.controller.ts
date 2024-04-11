import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerPersonalClinicHistoryService } from './customerPersonalClinicHistory.service';
import { CreateCustomerPersonalClinicHistoryDto } from './dto/create-customer_personal_clinic_history.dto';
import { UpdateCustomerPersonalClinicHistoryDto } from './dto/update-customer_personal_clinic_history.dto';

@Controller('customer-personal-clinic-history')
export class CustomerPersonalClinicHistoryController {
  constructor(private readonly customerPersonalClinicHistoryService: CustomerPersonalClinicHistoryService) {}

  @Post()
  create(@Body() createCustomerPersonalClinicHistoryDto: CreateCustomerPersonalClinicHistoryDto) {
    return this.customerPersonalClinicHistoryService.create(createCustomerPersonalClinicHistoryDto);
  }

  @Get()
  findAll() {
    return this.customerPersonalClinicHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerPersonalClinicHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerPersonalClinicHistoryDto: UpdateCustomerPersonalClinicHistoryDto) {
    return this.customerPersonalClinicHistoryService.update(+id, updateCustomerPersonalClinicHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerPersonalClinicHistoryService.remove(+id);
  }
}

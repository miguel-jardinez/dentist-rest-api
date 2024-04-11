import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerFamiliarClinicHistoryService } from './customerFamiliarClinicHistory.service';
import { CreateCustomerFamiliarClinicHistoryDto } from './dto/create-customer_familiar_clinic_history.dto';
import { UpdateCustomerFamiliarClinicHistoryDto } from './dto/update-customer_familiar_clinic_history.dto';

@Controller('customer-familiar-clinic-history')
export class CustomerFamiliarClinicHistoryController {
  constructor(private readonly customerFamiliarClinicHistoryService: CustomerFamiliarClinicHistoryService) {}

  @Post()
  create(@Body() createCustomerFamiliarClinicHistoryDto: CreateCustomerFamiliarClinicHistoryDto) {
    return this.customerFamiliarClinicHistoryService.create(createCustomerFamiliarClinicHistoryDto);
  }

  @Get()
  findAll() {
    return this.customerFamiliarClinicHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerFamiliarClinicHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerFamiliarClinicHistoryDto: UpdateCustomerFamiliarClinicHistoryDto) {
    return this.customerFamiliarClinicHistoryService.update(+id, updateCustomerFamiliarClinicHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerFamiliarClinicHistoryService.remove(+id);
  }
}

import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";

import { PetsService } from "@/pets/pets.service";
import { CreatePetDto, UpdatePetDto } from "@/pets/pets.dtos";
import { ApiResponse } from "@/shared/api-response";

@Controller("api/students/:studentId/pets")
export class PetsController {
	constructor(private readonly petsService: PetsService) {}

	@Get()
	public findAll(@Param("studentId") studentId: string) {
		const pets = this.petsService.findAllForStudent(studentId);
		return new ApiResponse(true, 200, "Mascotas del estudiante obtenidas con éxito", pets, null);
	}

	@Post()
	public create(
		@Param("studentId") studentId: string,
		@Body() body: CreatePetDto,
	) {
		const newPet = this.petsService.create(studentId, body);
		return new ApiResponse(true, 201, "Mascota creada con éxito", newPet, null);
	}

	@Patch(":petId")
	public update(
		@Param("studentId") studentId: string,
		@Param("petId") petId: string,
		@Body() body: UpdatePetDto,
	) {
		const updatedPet = this.petsService.update(studentId, petId, body);
		return new ApiResponse(true, 200, "Mascota actualizada con éxito", updatedPet, null);
	}

	@Delete(":petId")
	public delete(
		@Param("studentId") studentId: string,
		@Param("petId") petId: string,
	) {
		const deletedPet = this.petsService.delete(studentId, petId);
		return new ApiResponse(true, 200, "Mascota eliminada con éxito", deletedPet, null);
	}
}

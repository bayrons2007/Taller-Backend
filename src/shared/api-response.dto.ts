export class ApiResponse<T> { //la T es como un comodin para devolver un dato generico / flexible
  success: boolean;
  code: number;
  message: string;
  data: T | null;
  error: any | null;

  //el constructor es como un init para el newapiresponse, recibe automaticamente los datos que ingresaste
  constructor(success: boolean, code: number, message: string, data: T | null = null, error: any | null = null) {
    this.success = success; //this.x : lo que entregara el json y el "= dato" es lo que entregamos (ej: true)
    this.code = code;  //ex: new ApiResponse(true, 200, "Éxito", pet, null);
    this.message = message;
    this.data = data;
    this.error = error;
  }
}
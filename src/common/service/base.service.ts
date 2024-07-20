import { DatabaseService } from 'src/database/database.service';

export class BaseService<CreateDto, UpdateDto> {
  constructor(
    protected databaseService: DatabaseService,
    protected readonly modelName: string,
  ) {}

  findMany() {
    return this.databaseService[this.modelName].findMany();
  }

  create(data: CreateDto) {
    return this.databaseService[this.modelName].create(data);
  }

  //TODO
  //findById => result , null
  //findOrFailById => result, 404
  //updateOrFailById =>  404
  //deleteOrFailById => result, 404
  //findWithPagination
}

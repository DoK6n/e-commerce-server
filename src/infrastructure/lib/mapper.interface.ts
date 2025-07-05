export interface IMapper<DatabaseEntity, Domain> {
  toDomain(entity: DatabaseEntity): Domain
  toPersistence(domain: Domain): DatabaseEntity
}

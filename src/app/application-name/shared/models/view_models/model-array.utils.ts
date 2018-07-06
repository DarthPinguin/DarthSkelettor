export class ModelArray {
  /**
   * Transform list of DTO json to list of view model.
   * @param {Array<D>} dtos the list of DTO model
   * @param {Function} fromJson function receiving a DTO from which a view model is created
   * @return {Array<M>} the list of view model
   */
  public static fromJson<D, M>(dtos: D[], fromJson: (dto: D) => M ): M[] {
      const models: M[] = [];
      dtos.forEach((dto: D) => {
          models.push(fromJson(dto));
      });
      return models;
  }
}

// exemple list of users :
// ModelArray.fromJson<UserDto, User>(usersDto, User.fromJson);

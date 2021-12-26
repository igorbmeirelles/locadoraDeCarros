interface IUserResponseDTO {
  id: string;
  name: string;
  avatar: string;
  driver_license: string;
  email: string;
  avatar_url(): string;
}

export { IUserResponseDTO };

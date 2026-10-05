export interface UpdateProfileDTO {
  name?: string;
  email?: string;
}

export interface ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateSkillsDTO {
  skills: string[];
}

export interface UpdateSettingsDTO {
  settings: any;
}
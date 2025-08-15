
export interface UserAtribbutes {
    id: string;
    name: string;
    secondname: string;
    email: string;
    birthdate: Date;
    password: string;
    cep: number;
};

export interface UserCreationAtributesDTO extends UserAtribbutes{}



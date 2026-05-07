import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Informe seu nome."),
  email: z.string().email("Email invalido."),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres."),
  type: z.enum(["CLIENT", "BROKER"])
});

export const loginSchema = z.object({
  email: z.string().email("Email invalido."),
  password: z.string().min(1, "Informe a senha.")
});

export const searchProfileSchema = z.object({
  city: z.string().min(2, "Informe a cidade."),
  district: z.string().min(2, "Informe o bairro."),
  minPrice: z.coerce.number().min(0),
  maxPrice: z.coerce.number().min(0),
  bedrooms: z.coerce.number().int().min(0),
  bathrooms: z.coerce.number().int().min(0),
  parkingSpots: z.coerce.number().int().min(0)
}).refine((data) => data.maxPrice >= data.minPrice, {
  message: "O preco maximo precisa ser maior ou igual ao minimo.",
  path: ["maxPrice"]
});

export const proposalSchema = z.object({
  profileId: z.coerce.number().int().positive(),
  propertyLink: z.string().url("Informe um link valido."),
  price: z.coerce.number().positive("Informe um preco valido."),
  note: z.string().min(5, "Adicione uma observacao breve."),
  availabilityConfirmed: z.literal(true, {
    errorMap: () => ({ message: "E preciso confirmar a disponibilidade." })
  })
});

export const reviewSchema = z.object({
  proposalId: z.coerce.number().int().positive(),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(3, "Escreva um comentario curto.")
});

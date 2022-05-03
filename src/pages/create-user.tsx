import { Button, Flex, Stack } from "@chakra-ui/react";
import { Logo } from "../components/Header/Logo";
import { Input } from "../components/form/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import  Router  from "next/router";

type SignInFormData = {
  email: string;
  password: string;
  name: string;
  confirm_password: string;
};

const signInSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("Email obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
  confirm_password: yup
    .string()
    .required("Confirmar senha obrigatório")
    .oneOf([yup.ref("password"), null], "As senhas devem ser iguais"),
});

export default function CreateUser() {

  useEffect(()=>{
    const isAuth = JSON.parse(localStorage.getItem('@comandasgo'))
    if(!isAuth){
      Router.back();
    }
  },[])

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const createUser: SubmitHandler<SignInFormData> = async (data) => {
    delete data.confirm_password;
    const { user, error, session } = await supabase.auth.signUp(
      {
        email: data.email,
        password: data.password,
      },
      { data: { first_name: data.name } }
    );
    if (error) {
      return console.log(error);
    }
    if (user) {
      alert("Usuário criado com sucesso");
      console.log(user)
      console.log(session)
    }
  };

  const { errors } = formState;

  return (
    <Flex
      w="100vw"
      h="100vh"
      flexDirection="column"
      alignItems="center"
      justify="center"
    >
      <Logo />
      <Flex
        mt="6"
        flexDirection="column"
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p={8}
        borderRadius={8}
        onSubmit={handleSubmit(createUser)}
      >
        <Stack spacing="4">
          <Input
            name="name"
            label="Nome"
            error={errors?.name}
            {...register("name", { required: "Campo nome obrigatório" })}
          />
          <Input
            name="email"
            label="Email"
            error={errors?.email}
            {...register("email", { required: "Campo email obrigatório" })}
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            error={errors?.password}
            {...register("password", { required: "Campo senha obrigatório" })}
          />
          <Input
            name="confirm_password"
            label="Confirmar senha"
            type="password"
            error={errors?.confirm_password}
            {...register("confirm_password", {
              required: "Campo confirmar senha obrigatório",
            })}
          />
        </Stack>
        <Button 
        type="submit" 
        mt="6" 
        colorScheme="pink"
        isLoading={formState.isSubmitting}
        >
          Cadastrar
        </Button>
      </Flex>
    </Flex>
  );
}

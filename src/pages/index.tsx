import { Button, Flex, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../components/form/Input";
import { supabase } from "../utils/supabaseClient";
import { Alert } from "../components/Alert";
import { useContext, useState } from "react";
import Router from "next/router";
import { Logo } from "../components/Header/Logo";
import {useAlert} from '../contexts/AlertContext';

type SignInFormData = {
  email: string;
  passowrd: string;
};

const signInSchema = yup.object().shape({
  email: yup.string().required("Email obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const { setMessage,setOpenAlert } = useAlert()

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    const { user, error } = await supabase.auth.signIn(data);
    if (error) {
      setOpenAlert(true);
      setMessage(error.message);
      return console.log(error);
    }
    localStorage.setItem("@comandasgo", JSON.stringify(user));
    Router.push("/comandas");
  };

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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
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
            {...register("password", {
              required: "Campo senha obrigatório",
              maxLength: 2,
            })}
          />
        </Stack>
        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

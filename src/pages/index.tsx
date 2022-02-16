import { Button, Flex, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from '../components/form/Input'

type SignInFormData = {
  email: string
  passowrd: string
}

const signInSchema = yup.object().shape({
  email: yup.string().required("Email obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInSchema)
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="center"
      justify="center"
    >
      <Flex
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
            { ...register("email", { required: 'Campo email obrigatório' }) }
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            error={errors?.password}
            { ...register("password", { required: 'Campo senha obrigatório', maxLength: 2 }) }
          />
        </Stack>
        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          isLoading={formState.isSubmitting}
        >Entrar</Button>
      </Flex>
    </Flex>
  )
}

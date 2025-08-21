"use client"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from 'next-auth/react'
import { z } from "zod"
import { useMutation } from "@tanstack/react-query";
import { loginDto, loginSchema } from "@/dtos/user.dto";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";



export default function Login(){
    const router = useRouter()

    const {mutateAsync,isPending} = useMutation({
        mutationKey:["login"],
        mutationFn: async (data:loginDto)=>{
            const response = await signIn("credentials",{...data,redirect:false})
            
            if (!response?.ok)
                throw new Error(response?.error??"");
        },
        onSuccess:()=>{
            toast.success("Logado com sucesso!");
            router.push("/dashboard");
        },
        onError:(error)=>{
            toast.error(
                <div className='relative flex flex-col w-full'>
                    <p>Não Autorizado!</p>
                    <p className='max-w-full overflow-x-auto text-xs break-all'>{error.message}</p>
                </div>
            )
        }

    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<loginDto>({
        resolver:zodResolver(loginSchema)
    })

    const onSubmit: SubmitHandler<loginDto> = async (data)=>{
        await mutateAsync(data)
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-42 h-64">
                <div>
                    <label htmlFor="user">
                        Usuário: {errors.user&&<span className="text-red">*</span>}
                    </label>
                    <input id="user" type="text" {...register("user",{required:true})} className="border"/>
                </div>

                <div>
                    <label htmlFor="password">
                        Senha: {errors.password&&<span className="text-red">*</span>}
                    </label>
                    <input id="password" type="text" {...register("password",{required:true})} className="border"/>
                </div>
                

                <button type="submit" disabled={isPending}>
                    {isPending?"Entrando...":"Entrar"}
                </button>
            </form>
        </div>
    )
}
import styles  from "./Auth.module.css";
import { RegisterService } from "../../services/authService";
import { useEffect, useState } from "react";

export function Register(){

    const [ok, setOk] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const HandleData = (e)=>{
        e.preventDefault();
        console.log("jijojojo se envio los datos");
        const siu = async ()=>{
            
            try{
                const jijo = await RegisterService(name, email, password);
                console.log(await jijo.status);
                if(jijo.status){
                    setOk(true);
                }
                console.log(jijo); 
            }catch(error){
                setOk(false)
                console.log(error.response)
            }
            
        } 

        siu()
        
    }
    console.log(name, email, password);
    
    return(
        
        <section className= {styles.section + " min-h-screen flex items-center justify-center p-4"}>
            {ok && <p>REGISTRADO CON EXITO</p>}
            <div className={styles.card + " w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden "}>
                {/* <!-- Header --> */}
                <div className="bg-gradient-to-r from-yellow-500 to-red-600 p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white">¡Bienvenido de nuevo!</h1>
                    <p className="text-white/80 text-sm mt-1">Registrate para iniciar sesion</p>
                </div>

                {/* <!-- Form --> */}
                <form id="loginForm" onSubmit={HandleData} className="p-8 space-y-5" noValidate>

                    {/* <!-- Nombre --> */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                            Nombre
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg> */}
                            </span>
                            <input
                                onChange={
                                    (e)=>{setName(e.target.value)}
                                }
                                type="text"
                                id="name"
                                name="name"
                                placeholder="nombre de usuario"
                                autoComplete="name"
                                className="input-field w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                            />
                        </div>
                        <p id="emailError" className="text-red-500 text-xs mt-1 hidden">Introduce un correo válido</p>
                    </div>





                    {/* <!-- Email --> */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Correo electrónico
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>
                            <input
                                type="email"
                                id="email"
                                onChange={
                                    (e)=>{setEmail(e.target.value)}
                                }
                                name="email"
                                placeholder="tu@correo.com"
                                autoComplete="email"
                                className="input-field w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                            />
                        </div>
                        <p id="emailError" className="text-red-500 text-xs mt-1 hidden">Introduce un correo válido</p>
                    </div>

                    {/* <!-- Password --> */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                            Contraseña
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.104.896-2 2-2s2 .896 2 2m-6 0a6 6 0 1112 0v3h-2v-3a4 4 0 00-8 0v3H6v-3zM5 11h14v9H5v-9z" />
                                </svg>
                            </span>
                            <input
                                type="password"
                                id="password"
                                onChange={
                                    (e)=>{setPassword(e.target.value)}
                                }
                                name="password"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                className="input-field w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                            />
                            <button type="button" id="togglePassword" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-indigo-500 transition">
                                <svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        </div>
                        <p id="passwordError" className="text-red-500 text-xs mt-1 hidden">La contraseña debe tener al menos 6 caracteres</p>
                    </div>

                    {/* <!-- Remember + Forgot --> */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" id="remember" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                            <span className="ml-2 text-gray-600">Recordarme</span>
                        </label>
                        <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">¿Olvidaste tu contraseña?</a>
                    </div>

                    {/* <!-- Alert --> */}
                    <div id="alert" className="hidden rounded-lg p-3 text-sm"></div>

                    {/* <!-- Submit --> */}
                    <button
                        onClick={()=>{console.log("jijo click")}}
                        id="submitBtn"
                        className={styles.btnPrimary + " w-full py-3 text-white font-semibold rounded-lg flex items-center justify-center"}
                    >
                        <span id="btnText">Registrarme</span>
                        <div id="btnLoader" className="loader ml-2 hidden"></div>
                    </button>

                    {/* <!-- Register link --> */}
                    <p className="text-center text-sm text-gray-600">
                        ¿No tienes cuenta?
                        <a href="#" className="text-indigo-600 hover:text-indigo-800 font-semibold">Regístrate aquí</a>
                    </p>
                </form>
            </div>
            
        </section>
    )
}
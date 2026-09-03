import { useState } from "react";
import styles  from "./Auth.module.css";
import { LoginService } from "../../services/authService";
import { useNavigate } from "react-router-dom";




export function Login(){
    const navigate = useNavigate();

    const [ok, setOk] = useState(false);
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const HandleSubmit = (e)=>{
        e.preventDefault();
        const login = async ()=>{
            try{
                const resp = await LoginService(email, password);
                if(resp.status){
                    setOk(true);
                    console.log(resp.data);
                    navigate("/dashboard");
                }
            }catch(error){
                alert("datos incorrectos");
                setOk(false);
            }

        }
        login();
        console.log(email, password);

    }


    return (
        <section className={styles.section + " min-h-screen flex items-center justify-center p-4"}>
            {ok && <h1>ESTAS LOGUEADO</h1>}
            <div className={styles.card + " w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden "}>
                {/* <!-- Header --> */}
                <div className="bg-gradient-to-r from-yellow-500 to-red-600 p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white">¡Bienvenido de nuevo!</h1>
                    <p className="text-white/80 text-sm mt-1">Inicia sesion para continuar</p>
                </div>

                {/* <!-- Form --> */}
                <form onSubmit={HandleSubmit} id="loginForm" className="p-8 space-y-5" noValidate>
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
                                onChange={
                                    (e)=>{
                                        setEmail(e.target.value)
                                    }
                                }
                                type="email"
                                id="email"
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
                                onChange={(e)=>{
                                    setPassword(e.target.value)
                                }}
                                type="password"
                                id="password"
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
                        type="submit"
                        id="submitBtn"
                        className={styles.btnPrimary + " w-full py-3 text-white font-semibold rounded-lg flex items-center justify-center"}
                    >
                        <span id="btnText">Iniciar sesión</span>
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
{/* <script>
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const togglePassword = document.getElementById('togglePassword');
  const eyeIcon = document.getElementById('eyeIcon');
  const alertBox = document.getElementById('alert');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnLoader = document.getElementById('btnLoader');

  // Toggle password visibility
  togglePassword.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    eyeIcon.innerHTML = isPassword
      ? '<path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />'
      : '<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />';
  });

  // Validate email format
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Show alert
  function showAlert(message, type) {
    alertBox.className = 'rounded-lg p-3 text-sm ' +
      (type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200');
    alertBox.textContent = message;
    alertBox.classList.remove('hidden');
  }

  // Real-time validation
  emailInput.addEventListener('input', () => {
    if (emailInput.value && !isValidEmail(emailInput.value)) {
      emailError.classList.remove('hidden');
    } else {
      emailError.classList.add('hidden');
    }
  });

  passwordInput.addEventListener('input', () => {
    if (passwordInput.value && passwordInput.value.length < 6) {
      passwordError.classList.remove('hidden');
    } else {
      passwordError.classList.add('hidden');
    }
  });

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    if (!isValidEmail(emailInput.value)) {
      emailError.classList.remove('hidden');
      emailInput.parentElement.classList.add('shake');
      setTimeout(() => emailInput.parentElement.classList.remove('shake'), 400);
      valid = false;
    }
    if (passwordInput.value.length < 6) {
      passwordError.classList.remove('hidden');
      passwordInput.parentElement.classList.add('shake');
      setTimeout(() => passwordInput.parentElement.classList.remove('shake'), 400);
      valid = false;
    }

    if (!valid) {
      showAlert('Por favor, corrige los errores del formulario.', 'error');
      return;
    }

    // Simulate loading
    btnText.textContent = 'Iniciando sesión...';
    btnLoader.classList.remove('hidden');
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
    alertBox.classList.add('hidden');

    setTimeout(() => {
      btnText.textContent = 'Iniciar sesión';
      btnLoader.classList.add('hidden');
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      showAlert(`¡Bienvenido! Sesión iniciada con ${emailInput.value}`, 'success');
    }, 1500);
  }); */}

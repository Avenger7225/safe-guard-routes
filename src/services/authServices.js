import { supabase } from '../supabase';

export const authService = {
    /**
     * Autenticar a un usuario
     * @param {string} username
     * @param {string} password
     * @returns {object}
     * @throws {Error} por si la autenticacion falla.
     */
    async authenticate(username, password) {
        // busca en la tabla users para obtener el email y el rol
        const { data: userProfile, error: profileError } = await supabase
            .from('users')
            .select('email,user_role,id')
            .eq('username', username)
            .single();

        if (profileError && profileError.code !== 'PGRST116') { // PGRST116 = sin resultados
            console.error('Error al buscar usuario por username:', profileError);
            throw new Error('Error de conexión o base de datos. Intenta de nuevo.');
        }

        if (!userProfile) {
            // Usuario no encontrado
            throw new Error('Usuario o contraseña incorrectos.');
        }

        const userEmail = userProfile.email;
        const role = userProfile.user_role;

        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: userEmail,
            password: password,
        });

        if (authError) {
            // errores en la validacion de datos del usuario
            console.error('Error de autenticación de Supabase:', authError.message);
            throw new Error('Usuario o contraseña incorrectos.');
        }

        const user = {
            id: authData.user.id,
            email: authData.user.email,
            name: username,
            role: role
        };

        return {
            user: user,
            token: authData.session.access_token
        };
    },

    /**
     * Valida el token para mantener la sesion abierta
     * @param {string} token - almacena el token de acceso
     * verifica si el token es valido y si hay una sesion activa en supabase
     * @returns {Promise<boolean>}
     */
    async validateToken(token) {
        try {
            // intentar establecer la sesion con el token guardado
            const { error: setSessionError } = await supabase.auth.setSession({ 
                access_token: token, 
                refresh_token: null 
            });

            if (setSessionError) {
                console.error('Token no válido o expirado:', setSessionError);
                return false;
            }

            // verificar que se pueda obtener el usuario
            const { data: { user } } = await supabase.auth.getUser();

            return !!user;
        } catch (error) {
            console.error('Error durante la validación del token:', error);
            return false;
        }
    },

    /** cierra la sesion en Supabase */
    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error al cerrar sesión en Supabase:', error);
            throw new Error('Fallo al cerrar sesión en Supabase.');
        }
    }
}
import { create } from 'zustand'

interface UserState {
    UsuarioStr: boolean;
    setUsuarioStr: (NewUser: boolean) => void;
}

const useUser = create<UserState>((set)=>({

    UsuarioStr:false,

    setUsuarioStr: (NewUser)=>set({ UsuarioStr:NewUser })
}))

export default useUser;
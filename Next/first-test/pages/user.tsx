import Layout from "@/components/Layout"
import useUserStore from "@/store/userstore";
import axios from "axios"
import { useRouter } from 'next/router'

const userPage = () => {
    const router = useRouter();
    const store = useUserStore();

    async function logout() {
        const res = await axios.post('/api/auth/logout');
        store.logOut()
        console.log(res);
        router.push("/signIn")
    }

    return (
        <Layout UseNav={true}>
            <div className="w-full min-h-[80rem] flex justify-center items-center flex-col gap-4">
                <button onClick={logout} className="p-4 bg-blue-500 rounded-md hover:bg-blue-400 active:bg-blue-600 transition-all duration-75 text-white">Log out</button>
            </div>
        </Layout>
    )
}

export default userPage
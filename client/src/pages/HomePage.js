import React from 'react'
import Layout from '../component/Layout/Layout'
import { useAuth } from '../context/authContext'

const HomePage = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            lorem500
            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </Layout>
    )
}

export default HomePage

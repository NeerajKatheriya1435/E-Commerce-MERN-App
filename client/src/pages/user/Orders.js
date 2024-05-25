import React from 'react'
import Layout from '../../component/Layout/Layout'
import UserMenu from '../../component/Layout/UserMenu'

const Orders = () => {
    return (
        <Layout>
            <div className="container fluid m-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card p-3">
                            <h1>Orders</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders

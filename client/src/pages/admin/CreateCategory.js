import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout/Layout'
import AdminMenu from '../../component/Layout/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import InputCategory from '../../component/Form/InputCategory';

const CreateCategory = () => {
    const [category, setCategory] = useState([]);
    const [name, setName] = useState("")
    //create new category
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/category//create-new-category`, { name })
            if (res?.data.success) {
                toast.success(`${name} category is created`)
                getAllCategory()
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/fetch-all-category`)
            if (data?.success) {
                setCategory(data.allCategory)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
        }
    }
    useEffect(() => {
        getAllCategory()
    }, [])

    return (
        <Layout>
            <div className="container fluid m-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card p-3">
                            <h2 className='m-2'>Manage Category</h2>
                            <InputCategory handleSubmit={handleSubmit} value={name} setValue={setName} />
                            <table className="table mt-2">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.map((cat => {
                                        return <>
                                            <tr>
                                                <td key={cat._id}>{cat.name}</td>
                                                <td><button className='btn btn-primary'>Edit</button></td>
                                            </tr>
                                        </>
                                    }))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory

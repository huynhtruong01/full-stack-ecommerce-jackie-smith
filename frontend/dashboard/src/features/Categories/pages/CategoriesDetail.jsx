import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import categoriesApi from '../../../api/categoriesApi'
import Detail from '../../../components/Detail'
import 'react-toastify/dist/ReactToastify.css'
import productsApi from '../../../api/productsApi'

CategoriesDetail.propTypes = {}

function CategoriesDetail() {
    const params = useParams()
    const navigate = useNavigate()
    const [category, setCategory] = useState(null)

    useEffect(() => {
        const getCategory = async () => {
            try {
                const category = await categoriesApi.getById(params?.id)
                const { products } = await productsApi.getAll({ category: category._id })
                console.log(products)
                console.log(category)
                setCategory({ ...category, id: category._id, products })
            } catch (error) {
                console.log('Error: ', error)
            }
        }

        getCategory()
    }, [params?.id])

    const handleDeleteClick = async (id) => {
        if (!id) return

        try {
            const { message } = await categoriesApi.remove(id)
            toast.success(message, {
                autoClose: 2000,
                theme: 'colored',
            })

            setTimeout(() => navigate('/categories'), 3000)
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 2000,
                theme: 'colored',
            })
        }
    }

    return (
        <Box>
            {category && <Detail title="Category" data={category} onClick={handleDeleteClick} />}{' '}
            <ToastContainer />
        </Box>
    )
}

export default CategoriesDetail
